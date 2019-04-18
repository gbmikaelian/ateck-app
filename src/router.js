import Vue from 'vue';
import Router from 'vue-router';
import SidebarMenu from '@/components/SidebarMenu';
import gMap from '@/components/gMap';
import Places from '../src/components/Places';
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: SidebarMenu,
            children: [
                { path: '/map', name: 'map', component: gMap },
                { path: '/Places', name: 'places', component: Places }
            ]
        }
    ]
});

export default router;
