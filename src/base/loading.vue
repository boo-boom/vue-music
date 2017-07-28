<template>
    <div class="loading">
        <img width="24" height="24" src="~common/image/loading.gif">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        title: {
            type: String,
            default: '正在加载...'
        }
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import '~common/css/variable';
.loading {
    width: 100%;
    text-align: center;
    .desc {
        line-height: 2rem;
        font-size: @font-size-small;
        color: @color-text-l;
    }
}
</style>
