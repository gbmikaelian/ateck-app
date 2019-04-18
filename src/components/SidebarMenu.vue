<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-menu
                :default-active="this.$route.name"
                class="sidebar-menu-vertical"
                background-color="#545c64"
                text-color="#fff"
                :router="true"
                active-text-color="#ffd04b">
                    <el-menu-item :route="{ name: 'map' }" index="map">
                        <i class="el-icon-menu"></i>
                        <span>Map</span>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'places' }" index="places">
                        <i class="el-icon-document"></i>
                        <span>Places</span>
                    </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="12">
            <router-view/>
        </el-col>
    </el-row>
</template>

<script>
export default {

};
</script>
