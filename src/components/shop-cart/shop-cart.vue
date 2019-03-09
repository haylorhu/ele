<template>
    <div class="shop-cart">
        <div class="cart-total" @click="cartListToggle">
            <div class="cart-icon" :class='{highlight:totalCount >0}'>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-htmal5icon29"></use>
                </svg>
            </div>
            <div class="count">
                <p :class="{'highLight':totalCount>0}"><span v-show="totalCount>0">￥</span>{{totalCount}}</p>
                <p class="fee">另需配送费</p>
            </div>

        </div>
        <div class="checkOut" @click="pay">
            <p>去结算</p>
        </div>
        <div class="ballContainer">
            <div v-for="(ball,index) in balls" :key="index">
                <transition
                @before-enter="beforeDrop"
                @enter="dropping"
                @after-enter="afterDrop"
                >
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook">
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import  ShopCartList from 'components/shop-cart-list/shop-cart-list.vue'
    const BALL_LEN = 10

    function createBalls() {
        let balls = []

        for(let i=0;i<10;i++){
            balls.push({show:false})
        }
        return balls
    }

    export default {
        components:{
            ShopCartList
        },
        props: {
            selectFoods: {
                type: Array,
                default() {

                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            miniPrice: {
                type: Number,
                default: 0
            },
            fold:{
                type:Boolean,
                default:true
            }
        },
        data(){
          return {
              balls:createBalls(),
              listFold:this.fold
          }
        },
        created(){
          this.dropBalls = []
        },
        computed: {
            totalCount() {
                let sum = 0

                this.selectFoods.forEach((food) => {
                    sum += food.count * food.price
                })
                if (!sum) {
                    return "未选购商品"
                } else {
                    return sum
                }
            }
        },
        methods:{
            pay(e){
                this.$createDialog({
                    title: '支付',
                    content: `您需要支付${this.totalCount}元`
                }).show()
                e.stopPropagation()

            },
            cartListToggle(){
                if(this.listFold){
                    if (!this.totalCount){
                        return
                    }
                    this.listFold = false
                    this._showShopCartList()
                    // this._showShopCartSticky()
                }else {

                    this.listFold = true
                    this._hideShopCartList()
                    // this.__hideShopCartSticky()

                }
                console.log(this.listFold)

            },
            _showShopCartList(){
                this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
                    $props: {selectFoods: 'selectFoods',totalCount:'totalCount'


                    },
                    $events:{
                        hide:()=>{
                          this.listFold = true
                        }
                    }
                })

                this.shopCartListComp.show()


            },
            _hideShopCartList(){
                this.shopCartListComp.hide()

            },
            _showShopCartSticky(){
                this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
                    $props: {selectFoods: 'selectFoods',
                    },
                    $events: {
                        closeOrg:()=>{
                            this.listFold = true
                            this._hideShopCartList()
                        }
                    }

                })

                this.shopCartStickyComp.show()

            },
            __hideShopCartSticky(){
                this.shopCartStickyComp.hide()
            },
            drop(el){
                for(let i=0;i<this.balls.length;i++){

                    const ball = this.balls[i]
                    if(!ball.show){
                        ball.show = true
                        ball.el = el
                        this.dropBalls.push(ball)

                    }
                }
                return
            },
            beforeDrop(el){
                const ball = this.dropBalls[this.dropBalls.length - 1]
                const rect = ball.el.getBoundingClientRect()
                const x = rect.left - 50
                const y = -(window.innerHeight - rect.top - 50)
                el.style.display = ''
                el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
                const inner = el.getElementsByClassName("inner-hook")[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`

            },
            dropping(el,done){
                this._reflow = document.body.offsetHeight
                el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]

                inner.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
                el.addEventListener('transitionend',done)


            },
            afterDrop(el){
                const ball = this.dropBalls.shift()
                if (ball){
                    ball.show = false
                    el.style.display = 'none'
                }
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .shop-cart {
        height 47px
        display flex;
        .shopCartListWarrper{
            position: fixed
            bottom 50px
            width 100%
        }

        .cart-total {
            flex 1
            background-color: rgba(61, 61, 63, .9);
            position: relative
            padding-top 10px

            .cart-icon {
                &.highlight {
                    background-color: #2a85e4
                    .icon {
                        fill white
                    }
                }
                position: absolute
                top -10px
                flex 1
                left 20px

                background-color: #444
                width 50px;
                height 50px;
                display flex;
                justify-content center;
                vertical-align center
                border-radius 50%
                border: 5px solid #3c3c3c;

                .icon {
                    fill: #737373;
                    margin auto
                    width 25px;
                    height 25px
                }
            }

        }

        .count {
            margin-left 80px
            font-size 12px;
            color #999;
            line-height 1.1
            position: relative
            .fee{
                position: fixed;bottom 4px;
                font-size 8px
                padding-top 3px;
            }

            .highLight {
                color white
                font-size 18px
            }


        }

        .checkOut {
            width 100px
            display flex;
            justify-content: center;
            align-items center
            background-color: #38ca73;

            p {
                color white
            }
        }
        .ballContainer{
            .ball{
                position: fixed;
                bottom 42px;
                z-index 20;
                left 42px
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner{
                    background-color: black;
                    width :8px;
                    height:8px;
                    border-radius: 50%;
                    transition: all 0.4s linear
                }
            }
        }
    }
</style>
