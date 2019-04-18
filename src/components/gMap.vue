<template>
    <GmapMap
        ref="gmap"
        class="gmap-map"
        :options="mapOptions"
        :center="center"
        @click="getCoordinate"
        :zoom="zoom">
        <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            ref="marker"
            :position="m"
            :clickable="true"
            :draggable="true"
        />
    </GmapMap>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { mapState, mapActions } from 'vuex';

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_KEY,
        libraries: 'places' // This is required if you use the Autocomplete plugin
    }
});
export default {
    methods: {
        getCoordinate ({ latLng }) {
            this.markPlace(latLng);
        },
        ...mapActions(['markPlace'])
    },
    computed: {
        google: VueGoogleMaps.gmapApi,
        ...mapState({
            mapOptions: state => state.mapOptions,
            center: state => state.center,
            zoom: state => state.zoom,
            markers: state => state.markers
        })
    }
};
</script>
