<template>
    <div id="app">
        <v-header :seller="this.seller"></v-header>
        <div class="tab-wrapper">
            <tab :tabs="tabs"></tab>
        </div>
    </div>
</template>

<script>
    import VHeader from 'components/v-header/v-header.vue'
    import {getSeller} from "api";
    import Tab from 'components/tab/tab.vue'

    import commit from 'components/commit/commit.vue'
    import Goods from 'components/goods/goods.vue'
    import shop from 'components/shop/shop.vue'

    export default {
        name: 'app',
        data() {
            return {
                seller: {},

            }
        },
        computed:{
            tabs(){
              return  [
                    {

                        label: '点餐',
                        component: Goods,
                        data:{
                            seller:this.seller
                        }
                    },
                    {

                        label: '评价',
                        component: commit,
                        data:{
                            seller : this.seller
                        }
                    }, {

                    label: "商家",
                    component: shop,
                    data:{
                        seller:this.seller
                    }
                }
                ]
            }
        },
        components: {
            VHeader,
            Tab
        },
        created() {
            this._getSeller()

        },
        methods: {
            _getSeller() {
                getSeller().then((seller) => {
                    this.seller = seller
                    console.log(this.tabs)
                })
            }
        }
    }
</script>

<style lang="stylus">

    #app

        font-size: 16px;
        line-height  1.2em;
        .tab-wrapper
            position: fixed
            top: 266px
            left: 0
            right: 0
            bottom: 0


</style>
