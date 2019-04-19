<template>
    <div class="places">
        <div class="filter-place-input">
            Filter
            <el-input v-model="filterPlaceName"/>
        </div>
        <el-table ref="filterTable" height="500" :data="markers">
            <el-table-column align="center" prop="placeName" label="Name">
                <template slot-scope="{row}">
                    <router-link :to="{name: 'map', query: { placeId: row._id }}">{{row.placeName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column align="left" label="Operations">
                 <template slot-scope="{row}">
                        <el-button @click="deletePlace(row._id)" type="danger" round>Delete</el-button>
                        <el-button class="operations-button" v-if="row.placeVisited" type="warning" round @click="markToggleVisit(row._id)">
                            Mark as not visited
                        </el-button>
                        <el-button class="operations-button" v-else type="success" round @click="markToggleVisit(row._id)">
                            Mark as visited
                        </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    watch: {
        filterPlaceName () {
            this.filterPlace(this.filterPlaceName);
        }
    },
    data () {
        return {
            filterPlaceName: ''
        };
    },
    computed: {
        ...mapState({
            markers: state => state.markers
        })
    },
    mounted () {
        this.getPlaces();
    },
    methods: {
        ...mapActions([
            'getPlaces',
            'deletePlace',
            'markToggleVisit',
            'filterPlace'
        ])
    }
};
</script>
