<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :key="index" :class="{'active': currentPageIndex == index}"></span>
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
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            if (this.autoPlay) {
                this._paly();
            }
        }, 20);  // 浏览器刷新dom时间
        // 改变窗口时重新计算slider的width
        window.addEventListener('resize', () => {
            if (!this.slider) {
                return
            } else {
                this._setSliderWidth(true);
                this.slider.refresh();
            }
        });
    },
    methods: {
        _setSliderWidth(isResize) {
            let width = 0;
            this.childer = this.$refs.sliderGroup.children;
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i < this.childer.length; i++) {
                let child = this.childer[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if (this.loop && !isResize) {
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
            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX;
                if (this.loop) {
                    pageIndex -= 1;
                }
                this.currentPageIndex = pageIndex;
                if (this.autoPlay) {
                    clearTimeout(this.timer);
                    this._paly();
                }
            });
        },
        _initDots() {
            this.dots = new Array(this.childer.length);
        },
        _paly() {
            let pageIndex = this.currentPageIndex + 1;
            if (this.loop) {
                pageIndex += 1;
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400);
            }, this.interval)
        }
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import '~assets/css/variable.less';
@import '~assets/css/mixin.less';
.slider {
    min-height: 1px;
    position: relative;
    .slider-group {
        overflow: hidden;
        white-space: nowrap;
        .slider-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
            }
            img {
                display: block;
                width: 100%;
            }
        }
        &:after {
            .clear-both();
        }
    }
    .dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 1rem;
        text-align: center;
        font-size: 0;
        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
            &.active {
                width: 20px;
                border-radius: 5px;
                background: @color-text-ll;
            }
        }
    }
}
</style>
