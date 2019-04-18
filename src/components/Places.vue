<template>
    <div class="places">
        <el-button @click="resetDateFilter">reset date filter</el-button>
        <el-button @click="clearFilter">reset all filters</el-button>
        <el-table ref="filterTable" :data="markers" style="width: 100%">
            <el-table-column align="center" prop="placeName" label="Name">
                <template slot-scope="{row}">
                    <router-link :to="{name: 'map', query: { placeId: row._id }}">{{row.placeName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column align="center" label="delete">
                <template>
                    <el-button type="danger" round>Delete</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Visited">
                <template slot-scope="{row}">
                    <el-button v-if="row.placeVisiteddanger" type="success" round>
                        Mark as Visited
                    </el-button>
                    <el-button v-else type="warning" round>
                        Mark as Visited
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
        ...mapActions(['getPlaces'])

    }
};
</script>
