<template>
    <el-dialog
        title="Create Visit"
        :before-close="toggleDialog"
        :visible.sync="dialogMarkPlace">
    <el-input v-model="placeName"/>
    <div slot="footer" class="dialog-footer">

        <el-button @click="toggleDialog">Cancel</el-button>
        <el-button type="primary" @click="createName">Create</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: ['createVisit'],
    computed: {
        ...mapState({
            dialogMarkPlace: state => state.dialogMarkPlace
        })
    },
    data () {
        return {
            placeName: ''
        };
    },
    methods: {
        createName () {
            this.placeName = this.placeName.replace(/ +?/g, '');
            if (this.placeName) {
                this.createVisit(this.placeName);
                this.toggleDialog();
                this.placeName = '';
            }
        },
        toggleDialog () {
            this.SET({ key: 'dialogMarkPlace', value: !this.dialogMarkPlace });
        },
        ...mapMutations(['SET'])
    }
};
</script>
