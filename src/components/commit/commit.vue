<template>
    <cube-scroll class="scroll">

    <div class="commit">
        <div class="rating">
            <div class="shopRating">4.7</div>
            <div class="startRating">
                <p>商家评分</p>

            </div>
            <div class="ratDetail">
                <div>
                    <h2>味道</h2>
                    <p>4.7</p>
                </div>
                <div>
                    <h2>包装</h2>
                    <p>4.7</p>
                </div>
                <div class="send">
                    <h2>配送</h2>
                    <p>4.8</p>
                </div>
            </div>
        </div>
        <div class="detail">

            <ul>
                <li class="commentsItem" v-for="(item,index) in comments" :key="index">
                    <div class="contentWarrper">
                        <div class="content">
                            <img :src="item.avatar" alt="">
                            <p>{{item.username}}</p>
                        </div>
                        <p class="time">{{item.rateTime}}</p>
                    </div>
                    <p class="text">{{item.text}}</p>
                </li>
            </ul>

        </div>
    </div>
    </cube-scroll>

</template>

<script>
    var  moment = require('moment')

    import {getRatings} from 'api'

    export default {
        props: {},
        data() {
            return {
                comments: {
                    type: Array,
                    default() {
                        []
                    }
                },

            }
        },
        created() {
            this._getRating()
        },
        methods: {
            _getRating() {
                let newComments = []
                getRatings().then((res) => {
                    this.comments = res
                    console.log('org')
                    console.log(res)
                    this.comments.forEach((comment)=>{
                        comment.rateTime = moment(comment.rateTime).format('YYYY-MM-DD')
                        newComments.push(comment)
                    })
                    this.comments = newComments
                })

            }

        },


    };
</script>
<style lang="stylus" scoped>
    .commit {
        height 100%
        display flex
        align-items center;
        justify-content center
        flex-direction column

        .rating {
            color #666;
            display flex
            align-items center;
            align-items center;

            .shopRating {
                font-size: 30px;
                color: #ff6000;
                vertical-align center
                margin-right 10px

            }

            .startRating {

            }

            .ratDetail {
                display flex
                padding 20px 0

                div {
                    padding: 0 20px;
                    text-align center

                    h2 {
                        margin auto
                        font-size 10px
                        margin-bottom 10px
                    }

                    p {
                        font-size 20px

                    }

                    &:last-child {
                        position: relative
                        border-left 1px solid #ddd

                    }

                }

            }

        }

        .detail {
            flex:1
            height 100%

            ul {
                display flex;
                flex-direction column
                padding 10px
                .commentsItem {
                    border-top:1px solid #eee;
                    width 100vw
                    display flex
                    flex-direction column
                    padding: 10px
                    box-sizing border-box
                    .contentWarrper{
                        display: flex;
                        justify-content:space-between

                        .content {
                            display flex
                            vertical-align center;
                            text-align center

                            img {
                                width: 30px
                                height: 30px
                                border-radius: 50%;
                                margin-right  10px

                            }
                            p{
                                text-align center
                                font-size 12px

                            }
                        }
                        .time{
                            color #999;
                            font-size 11px
                        }

                    }
                    .text{
                        color #333;
                        font-size 13px
                        margin-left 39px
                        width 305px
                        margin-bottom: 8px
                        line-height: 18px
                        word-break break-all
                        white-space:normal

                    }
                }
            }


        }
    }
</style>
