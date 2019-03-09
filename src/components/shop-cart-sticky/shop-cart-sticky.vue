<template>

    <div class="shop-cart-sticky" v-show="visible" @click="close">
        <shop-cart
            ref="shopCart"
            :sticky=true
            :selectFoods="selectFoods"
        ></shop-cart>
    </div>
</template>

<script>
    import ShopCart from 'components/shop-cart/shop-cart'
    export default {
        name:"ShopCartSticky",
        components:{
            ShopCart
        },
        props: {
            selectFoods:{
                type:Array,
                default(){
                    return[]
                }
            },
        },
        data(){
            return {
                visible:{
                    type:Boolean,
                    default(){
                        false
                    }
                }
            }
        },
        methods:{
            hide(){
              this.visible = true
            },
            show(){
                this.visible = false

            },
            close(){
                this.$emit('closeOrg')
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .shop-cart-sticky{
        position: absolute
        left: 0
        bottom: 0
        z-index: 999
        width: 100%
        height: 48px
    }
</style>
