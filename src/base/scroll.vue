<template>
    <div class="scroll" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'scroll',
    props: {
        data: {
            type: Array,
            default: null
        },
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        }
    },
    mounted() { 
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods: {
        _initScroll() {
            if(!this.$refs.wrapper){
                return;
            };
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            });
        },
        refresh(){
            this.scroll && this.scroll.refresh();
        }
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>