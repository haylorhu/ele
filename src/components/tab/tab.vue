<template>
    <div class="tab">
        <cube-tab-bar
                ref="tabBar"
                v-model="selectedLabel"
                :data="tabs"
                :showSlider=true
                :useTransition=false
                @click="clickHandler"
                @change="changeHandler">
        </cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide
                    ref="slide"
                    :loop=false
                    :auto-play=false
                    :show-dots=false
                    :initialIndex="index"
                    @change="onChange"
                    @scroll="onScroll"
                    :options="slideOptions"
                >
                <cube-slide-item v-for="(tab,index) in tabs" :key="index">
                    <component ref="component" :is="tab.component" :data="tab.data"></component>
                </cube-slide-item>

            </cube-slide>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tabs: {
                type: Array,
                default() {
                    return []
                }
            },
            initialIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                index: 0,

                slideOptions: {
                    listenScroll: true,
                    probeType: 3,
                    directionLockThreshold:0
                }
            }
        },
        mounted() {
            this.onChange(this.index)

        },
        methods: {
            onScroll(pos) {
                const tabBarWidth = this.$refs.tabBar.$el.clientWidth
                const slideWidth = this.$refs.slide.slide.scrollerWidth
                const transform = -pos.x / slideWidth * tabBarWidth
                this.$refs.tabBar.setSliderTransform(transform)
            },
            onChange(current) {
                this.index = current
                const component = this.$refs.component[current]
                component.fetch && component.fetch()
            },
            clickHandler(label) {
            },
            changeHandler(label) {
            },
            onScroll(pos) {
                const tabBarWidth = this.$refs.tabBar.$el.clientWidth
                const slideWidth = this.$refs.slide.slide.scrollerWidth
                const tranform = -pos.x / slideWidth * tabBarWidth
                this.$refs.tabBar.setSliderTransform(tranform)
            }
        },
        computed: {
            selectedLabel: {
                get() {
                    return this.tabs[this.index].label
                },
                set(newValue) {
                    console.log(newValue)
                    this.index = this.tabs.findIndex((value) => {
                        return value.label === newValue
                    })
                }
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

    .tab
        display flex;
        flex-direction column;
        height: 100%



    .slide-wrapper
        flex 1
        overflow hidden

    >>> .cube-tab

        color gray
        font-size 15px;
        border-bottom 1px solid #ebebeb

        &.cube-tab_active
            > div
                color rgb(51, 51, 51)
                font-weight: 700;

    >>> .cube-tab-bar-slider
        background: linear-gradient(to right, rgba(235, 235, 235, 0) 0%, rgba(235, 235, 235, 0) 35%, rgb(35, 149, 255) 36%, rgb(35, 149, 255) 64%, rgba(125, 185, 232, 0) 65%, rgba(235, 235, 235, 0) 77%);


</style>
