<template>
    <cube-scroll>
        <section class="shopWapper">
            <div class="shop">
                <h3 class="section-title">配送信息</h3>
                <span>由蜂鸟快送提供配送，约31分钟送达，距离1m</span>
                <div >配送费￥2.6</div>
            </div>
            <div class="shop">
                <h3 class="section-title">活动与服务</h3>
                <div>活动与服务</div>
                <div>
                    满23减22，满48减24，满69减28，满99减35
                </div>
                <div>
                    满49元赠送美年达1份
                </div>
                <div>新用户下单立减16元(不与其它活动同享)</div>
                <div>
                    折扣商品5折起
                </div>
            </div>

        </section>

    </cube-scroll>

</template>

<script>
    import {getSeller} from 'api'
    export default {
        props: {
        },
        data(){
          return {
              seller:{
                  type:Array,
                  default(){
                      []
                  }
              }
          }
        },
        created() {
            this._getSeller()
        },
        methods:{
            _getSeller(){
                getSeller().then((seller)=>{
                    this.seller= seller
                })
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .shopWapper{
        font-size 13px
        line-height  15px
        color #666
        padding 20px
        p{
            padding 10px
        }
        .shop{
            display flex;
            flex-direction column;

            h3{
                color #000;
                line-height 20px
                margin-bottom 10px
                font-size 20px


            }
            div{
                line-height 40px

            }
        }
    }
</style>
