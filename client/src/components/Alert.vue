<template>
    <div class="alert">
        <div class="alert__bar alert__bar_horizontal alert__bar_top"></div>
        <div class="alert__bar alert__bar_vertical alert__bar_left"></div>
        <div class="alert__bar alert__bar_horizontal alert__bar_bottom"></div>
        <div class="alert__bar alert__bar_vertical alert__bar_right"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({components: {}})
    export default class Alert extends Vue {
    }
</script>

<style lang="scss">
    .alert {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        &__bar {
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(-45deg, #4801FF, #AC32E4, #4801FF) fixed;
            /*background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) fixed;*/
            background-size: 400% 400%;
            animation: gradient 2s linear alternate infinite;

            &_top {
                width: 100%;
                top: 0;
            }

            &_left {
                height: 100%;
                left: 0;
            }

            &_bottom {
                width: 100%;
                bottom: 0;
            }

            &_right {
                height: 100%;
                right: 0;
            }
        }
    }
</style>