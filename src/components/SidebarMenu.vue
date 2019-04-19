<template>
    <div class="tac">
        <el-menu
            :default-active="this.$route.name"
            class="sidebar-menu-vertical"
            background-color="#545c64"
            text-color="#fff"
            :router="true"
            active-text-color="#ffd04b">
                <el-menu-item :route="{ name: 'map' }" index="map">
                    <icon class="nav-icon" icon="globe-europe"/>
                    <span>Map</span>
                </el-menu-item>
                <el-menu-item :route="{ name: 'places' }" index="places">
                    <icon class="nav-icon" icon="map-marker-alt"/>
                    <span>Places</span>
                </el-menu-item>
        </el-menu>
        <router-view/>
    </div>
</template>

<script>
export default {

};
</script>
