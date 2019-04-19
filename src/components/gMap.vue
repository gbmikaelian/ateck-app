<template>
    <div class="gmap-map-block">
        <GmapMap
        ref="gmap"
        class="gmap-map"
        :options="mapOptions"
        :center="center"
        @click="getCoordinate"
        :zoom="zoom">
        <GmapMarker
            v-for="m in markers"
            :key="m._id"
            :title="m.placeName"
            ref="marker"
            :position="m"
            :clickable="true"
        />
    </GmapMap>
    <MarkPlace :createVisit="createVisit"/>
    </div>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import MarkPlace from './Place';
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_KEY,
        libraries: 'places' // This is required if you use the Autocomplete plugin
    }
});
export default {
    created () {
        const { placeId } = this.$route.query;
        placeId ? this.getPlaceById(placeId) : this.getPlaces(true);
    },
    data () {
        return {
            latLng: {}
        };
    },
    components: {
        MarkPlace
    },
    methods: {
        getCoordinate ({ latLng }) {
            this.SET({ key: 'dialogMarkPlace', value: !this.dialogMarkPlace });
            this.latLng = latLng;
        },
        createVisit (placeName) {
            this.markPlace({ latLng: this.latLng, placeName });
            this.latLng = {};
        },
        ...mapMutations(['SET']),
        ...mapActions(['markPlace', 'getPlaces', 'getPlaceById'])
    },
    computed: {
        google: VueGoogleMaps.gmapApi,
        ...mapState({
            mapOptions: state => state.mapOptions,
            center: state => state.center,
            zoom: state => state.zoom,
            dialogMarkPlace: state => state.dialogMarkPlace
        }),
        ...mapGetters(['markers'])
    }
};
</script>
