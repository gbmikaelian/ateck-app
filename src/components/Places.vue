<template>
    <div class="places">
        <el-button @click="resetDateFilter">reset date filter</el-button>
        <el-button @click="clearFilter">reset all filters</el-button>
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
    data () {
        return {
            tableData: []
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
        resetDateFilter () {
            this
                .$refs
                .filterTable
                .clearFilter('date');
        },
        clearFilter () {
            this
                .$refs
                .filterTable
                .clearFilter();
        },
        formatter (row, column) {
            return row.address;
        },
        filterTag (value, row) {
            return row.tag === value;
        },
        filterHandler (value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        ...mapActions(['getPlaces', 'deletePlace', 'markToggleVisit'])

    }
};
</script>
