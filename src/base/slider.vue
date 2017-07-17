<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import { addClass } from 'assets/js/base';
export default {
    name: 'slider',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initSlider();
        }, 20);

        /* window.addEventListener('resize', () => {
            this.slider.refresh();
        }); */
    },
    methods: {
        _setSliderWidth() {
            let width = 0;
            let childer = this.$refs.sliderGroup.children;
            let sliderWidth = this.$refs.slider.clientWidth;
            console.log(sliderWidth);
            for (let i = 0; i < childer.length; i++) {
                let child = childer[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if (this.loop) {
                width += sliderWidth * 2;
            }
            this.$refs.sliderGroup.style.width = width + 'px';
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400
            });
        }
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import '~assets/css/variable.less';
@import '~assets/css/mixin.less';
.slider {
    //overflow: hidden;
    .slider-group {
        .slider-item {
            float: left;
            a {
                display: block;
                width: 100%;
                /* overflow: hidden;
                text-decoration: none; */
            }
            img {
                display: block;
                width: 100%;
            }
        }
        .dots {
            position: absolute;
            left: 0;
            bottom: 1rem;
            font-size: 0;
            .dot {
                width: 0.8rem;
                height: 0.8rem;
                background: @color-text-l;
            }
        }
        &:after {
            .clear-both();
        }
    }
}
</style>
