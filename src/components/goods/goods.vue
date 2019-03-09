<template>

    <div class="goods" v-if="goods.length">
        <transition class="cube-scroll-nav-warrper">
            <cube-scroll-nav
                    :side="true"
                    :data="goods"
                    :options="scrollOptions"
                    :current="current"
            >
                <template slot="bar" slot-scope="props">
                    <cube-scroll-nav-bar
                            direction="vertical"
                            :labels="props.labels"
                            :txts="barTxts"
                            :current="props.current"
                    >
                        <template slot-scope="props">
                            <div class="text">
                                <span>{{props.txt.name}}</span>
                                <div class="num" v-if="props.txt.count">
                                 {{props.txt.count}}
                                </div>
                            </div>
                        </template>
                    </cube-scroll-nav-bar>
                </template>
                <cube-scroll-nav-panel
                        v-for="item in goods"
                        :key="item.name"
                        :label="item.name"
                        :title="item.name">
                    <ul>
                        <li v-for="food in item.foods"
                            :key="food.name"
                            @click="selectFood(food)"
                        >
                            <div class="goodDetail">
                                <img :src="food.icon">
                                <div class="sellInfo">
                                    <p class="foodName">{{food.name}}</p>
                                    <div class="rate">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                    </div>

                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                    </div>

                                </div>
                                <div class="cart-control-wapper">

                                    <cart-control-wapper
                                            :food="food"
                                            @add="onAdd"

                                    ></cart-control-wapper>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </transition>
        <div class="shopCartWarrper">
            <shop-cart ref="shopCart"
                       :selectFoods="selectFoods"

            ></shop-cart>
        </div>

    </div>


</template>

<script>
    import {getGood} from 'api'
    import ShopCart from 'components/shop-cart/shop-cart.vue'
    import cartControlWapper from 'components/cart-control-wapper/cart-control-wapper.vue'

    export default {
        components: {
            ShopCart,
            cartControlWapper
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                goods: [],

                scrollOptions: {
                    click: false,
                    directionLockThreshold: 0
                },

            }

        },
        computed: {
            current() {
                return this.goods[0].name
            },
            selectFoods() {
                let foods = []
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            },
            barTxts() {
                let ret = []
                this.goods.forEach((good) => {
                    const {name, foods, type} = good
                    let count = 0
                    foods.forEach((food) => {
                        count += food.count || 0

                    })
                    ret.push({
                        name, count
                    })
                })
                return ret
            }
        },
        methods: {
            fetch() {
                getGood().then((res) => {
                    this.goods = res
                    console.log(res)
                })
            },
            stickyChangeHandler() {
                console.log('sticky-change', current)
            },
            selectFood() {

            },
            onAdd(el) {
                this.$refs.shopCart.drop(el)
            }

        },
        mounted() {

        },


    };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

    .goods {
        position: relative
        text-align left
        height: 100%;
        .text{
            position: relative
            .num{
                right  0
                position: absolute
                padding: 0 5px
                height: 16px
                line-height: 16px
                text-align: center
                border-radius: 16px
                font-family: Helvetica
                font-weight: 700
                color: white
                background: red
            }
        }
        .cube-scroll-nav {
            padding-bottom: 47px

        }

        .cube-scroll-nav-warrper {
            padding-bottom: 55px

        }

        .goodDetail {
            display flex
            padding 5px 0 5px 5px;
            position: relative

            > img {
                width 57px;
                height 57px;
                border-radius: 2px;
            }

            .sellInfo {
                padding-left 10px

                .foodName {
                    font-weight 700
                }

                .rate {
                    color: #999;
                    display flex;
                    flex-direction column
                    font-size 10px
                }

                .price {
                    color: rgb(255, 83, 57)
                }


            }

            .cart-control-wapper {
                position: absolute;
                right 5px;
                bottom 2px
            }
        }

        >>> .cube-scroll-wrapper {
            .cube-sticky-content {

                background: #f3f5f7;

                h2 {
                    padding 5px
                    border-left: 2px solid #d9dde1;
                }

            }
        }

        >>> .cube-scroll-nav-bar-item {
            width 100px;
            text-align left;
            color #666
            background: #f3f5f7;

            &.cube-scroll-nav-bar-item_active {
                color #333
                background: #fff;
            }

            span {

                white-space: pre-wrap;
                word-wrap: break-word;

            }

        }

        .shopCartWarrper {
            position: fixed
            bottom 0
            z-index 1
        }

        .shopCartWarrper {
            width 100vw
        }
    }
</style>
