<template>
    <div class="header" @click="showDetail">
        <div class="bgImgWarrper">
            <div class="bgImg" :style="`background-image: url(${seller.avatar})`">
            </div>
        </div>
        <div class="shopInfo">
            <img :src="seller.avatar" alt="">
            <h1 class="shopName">{{seller.name}}</h1>
            <div class="shopScore">
                <span>评价{{seller.foodScore}} 月售{{seller.sellCount}} {{seller.description}}约{{seller.deliveryTime}}</span>
            </div>

            <div class="coupon">
                <p class="couponLeft">
                    <span class="money">
                        <small>
                            ¥
                        </small>
                        6
                    </span>
                    <span class="role">
                        <svg class="icon" aria-hidden="true" style="fill:#fdb715">
                            <use xlink:href="#icon-huangguan">
                            </use>
                         </svg>
                        无门槛
                    </span>
                </p>
                <p class="couponRight">领取</p>
            </div>
            <div class="disCount">
                <span class="fullDiscount">满减</span>
                <div class="itemsWarrper">
                    满28减3，满48减5，满88减9，满128减15，满188减30
                </div>
                <div class="trigger">2个优惠</div>
            </div>
            <div class="board">
                 公告: {{seller.bulletin}}
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SupportIco from 'components/support-ico/support-ico'

    export default {
        name: 'v-header',
        props: {
            seller: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {

        },
        methods:{
            showDetail() {
                this.headerDetailComp = this.headerDetailComp || this
                    .$createHeaderDetail({
                    $props:{
                        seller: "seller"
                    }
                })
                this.headerDetailComp.show()
            }
        },
        components: {
            SupportIco
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/style/mixin.styl"
    @import "../../common/style/variable.styl"
    .header
        font-size 11px
        line-height 26px

        .bgImgWarrper {
            overflow: hidden;
        }

        .bgImg
            height: 90px;
            background-repeat: no-repeat;
            background-size cover;
            width: 375px
            position: relative;
            filter: blur(10px);

            &::before
                height 100%
                width: 375px
                position: absolute;
                content: "";
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(119, 103, 137, .43)
                filter: blur(2px);

        .shopInfo
            position relative
            padding-top 50px
            display flex;
            vertical-align center;
            text-align center;
            flex-direction column;

            > img
                position: absolute
                height 75px;
                width 75px;
                top: 0;
                left 50%
                margin-left -38px;
                margin-top -38px;
                border-radius: 5px;

            .shopName
                font-size 20px;
                font-weight 700
                line-height 25px

            .shopScore
                font-size 12px
                line-height: 27px;
                color rgb(102, 102, 102)

            .coupon
                padding-top 2px;
                color: #594519;
                background: #ffe578;
                align-items: center;
                display: flex;
                justify-content: space-between;
                position: relative;
                padding-left: 2vw;
                height: 6.4vw;
                margin auto
                position: relative;
                margin-bottom 10px

                .money
                    font-size 18px
                    font-weight 700
                    margin-right 10px
                    padding-right -2px;

                    > small
                        font-size 15px
                        margin-right -4px
                        padding-left 4px;

                .couponRight
                    padding-right 8px
                    padding-left: 10px;

                ::before {
                    content: "";
                    position: absolute;
                    right: 37px;
                    height: 6px;
                    width: 6px;
                    border-radius: 50%;
                    background: #fff;
                    -webkit-transform: translateX(50%);
                    transform: translateX(50%);
                    top: -3px

                }

                ::after {
                    content: "";
                    position: absolute;
                    right: 37px;
                    height: 6px;
                    width: 6px;
                    bottom: -3px;
                    border-radius: 50%
                    background: #fff;
                    -webkit-transform: translateX(50%);
                    transform: translateX(50%);
                    border-radius: 50%;

                }

                .couponLeft
                    flex 1
                    display: flex;
                    justify-content: center
                    vertical-align center;
                    margin: 0;
                    font-weight: 400;
                    padding-right: -1px;


            .disCount
                font-size 11px
                line-height 13px
                color: rgb(51, 51, 51)
                display flex
                justify-content: center;
                align-items center;

                .fullDiscount
                    color white;
                    padding-left: 9px;
                    padding-right: 9px;
                    border-bottom-right-radius: 2px
                    background-color: rgb(240, 115, 115)
                    margin-right 12px
                    font-size 11px;
                    padding-top 2px
                    padding-bottom 2px

                .itemsWarrper
                    width 150px

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;


                .trigger
                    color: rgb(153, 153, 153);

                    padding-left 5px;
                    position: relative;

                    &::after {
                        content: "";
                        position: absolute;
                        right: -6px;
                        background: #fff;
                        -webkit-transform: translateX(50%);
                        transform: translateX(50%);

                        border: 4px solid transparent;
                        border-top :4px solid rgb(153, 153, 153);
                        top:5px;
                    }


            .board
                color rgb(153, 153, 153)
                width 300px
                margin auto
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

</style>
