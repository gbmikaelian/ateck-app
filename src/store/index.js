import Vuex from 'vuex';
import Vue from 'vue';
import http from '@/http';
import { Message } from 'element-ui';

Vue.use(Vuex);

const state = {
    markers: [],
    mapOptions: {
        draggableCursor: 'default',
        disableDefaultUI: false,
        gestureHandling: 'greedy',
        mapTypeControl: false,
        scaleControl: false,
        zoomControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true
    },
    zoom: 17,
    center: { lat: 40.177200, lng: 44.503490 },
    dialogMarkPlace: false
};

const actions = {
    async markPlace ({ state: { markers }, commit, dispatch }, { latLng, placeName }) {
        try {
            let { lat, lng } = latLng;
            [lat, lng] = [lat(), lng()];
            const place = await http.post('api/mark-place', { lat, lng, placeName });

            lat = place.data.place.lat;
            lng = place.data.place.lng;

            dispatch('getPlaces');
        } catch (e) {
            Message.error({ message: e.message });
        }
    },

    async getPlaces ({ commit }, placeVisited) {
        try {
            const markers = await http.get('api/places', { params: { placeVisited } });
            commit('SET', { key: 'markers', value: markers.data.places });
        } catch (e) {
            Message.error({ message: e.message });
        }
    },
    async getPlaceById ({ commit }, placeId) {
        try {
            const place = await http.get('api/place', { params: { id: placeId } });
            if (place.data.place) {
                const { lat, lng } = place.data.place;
                commit('SET', { key: 'markers', value: [place.data.place] });
                commit('SET', { key: 'center', value: { lat, lng } });
            }
        } catch (e) {
            Message.error({ message: e.message });
        }
    },
    async deletePlace ({ dispatch }, placeId) {
        try {
            await http.delete(`api/place/${placeId}`);
            dispatch('getPlaces');
        } catch (e) {
            Message.error({ message: e.message });
        }
    }
};

const mutations = {
    SET (state, { key, value }) {
        state[key] = value;
    }
};

const getters = {
    markers: ({ markers }) => {
        return markers;
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
