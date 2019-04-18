import Vuex from 'vuex';
import Vue from 'vue';

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
    center: { lat: 40.177200, lng: 44.503490 }
};

const actions = {
    markPlace ({ state: { markers }, commit }, latLng) {
        let { lat, lng } = latLng;
        [lat, lng] = [lat(), lng()];
        commit('SET', { key: 'markers', value: [{ lat, lng }] });
        console.log(lat, lng);
    }
};

const mutations = {
    SET (state, { key, value }) {
        state[key] = value;
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations
});
