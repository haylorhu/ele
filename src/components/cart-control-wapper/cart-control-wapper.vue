<template>
    <div class="cart-control-wapper">
        <transition name="move">
            <div class="cart-minus" v-show="food.count" @click.stop="decrease">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jian"></use>
                </svg>
            </div>
        </transition>
        <div class="nums" v-show="food.count">
            {{food.count}}
        </div>
        <div class="cart-add" @click.stop="add">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jia"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    const EVENT_ADD = 'add'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            decrease() {
                if (this.food.count) {
                    this.food.count--
                }

            },
            add(e) {
                console.log(this.food)
                if (!this.food.count) {
                    this.$set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
                this.$emit(EVENT_ADD, event.target)
            }
        },
        mounted() {

        }

    };
</script>
<style lang="stylus" scoped>
    .move-enter-active {
        transition: all .4s cubic-bezier(0, 0.77, 0.35, 0.97);
    }
    .move-leave-active {
        transition: all .4s cubic-bezier(0, 0.77, 0.35, 0.97);
    }
    .move-enter, .move-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }



    .cart-control-wapper {
        display: flex
        align-items: center
        .cart-minus {
            background-color: white;
            border: 2px solid rgb(35, 149, 255);
            border-radius 50%
            display flex;
            justify-content: center
            align-items center

            .icon {
                fill rgb(35, 149, 255)
                padding 2px

            }

        }

        .nums {
            margin-left 4px
            margin-right 4px
        }

        .cart-add {
            border: 2px solid rgb(35, 149, 255);
            border-radius 50%
            background-color: rgb(35, 149, 255);
            display flex;
            justify-content: center
            align-items center

            .icon {
                fill white

            }

        }
    }


</style>
