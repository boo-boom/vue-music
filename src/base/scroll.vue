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
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, this.refreshDelay);
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      }
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        });

        if(this.listenScroll){
          const _this = this;
          this.scroll.on('scroll', (pos) => {
            _this.$emit('scroll', pos);
          });
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement(arguments[0], arguments[1]);
        //this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
