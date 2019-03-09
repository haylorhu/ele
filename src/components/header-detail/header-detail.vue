<template>
    <transition name="fade">
        <div v-show="visible" @click="hide" class="header-detail" @touchmove.stop.prevent>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'header-detail',
        props: {
            seller: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data(){
          return{
              visible:false
          }
        },
        methods:{
            show(){
                this.visible = true

            },
            hide(){
                this.visible = false
                    console.log(123)
            },
        },
        components: {

        }
    }
</script>

<style lang="stylus" scoped>


    .header-detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        backdrop-filter: blur(10px)
        opacity: 1
        color: white
        background: black
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s
        &.fade-enter, &.fade-leave-active
            opacity: 0
            background: black
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





</style>
