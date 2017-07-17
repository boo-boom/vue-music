<template>
    <div class="list-view">
        <ul>
            <li class="list-group">
                <h2 class="list-group-title">A</h2>
                <ul>
                    <li class="list-group-item">
                        <img class="avatar" src="~assets/image/default.png">
                        <span class="name">sadasdsad</span>
                    </li>
                </ul>
            </li>
            <li class="list-group">
                <h2 class="list-group-title">A</h2>
                <ul>
                    <li class="list-group-item">
                        <img class="avatar" src="~assets/image/default.png">
                        <span class="name">sadasdsad</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'listview',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    methods: {
        
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import '~assets/css/variable';

.list-view {
    .list-group {
        padding-bottom: 3rem;
        .list-group-title {
            height: 3rem;
            line-height: 3rem;
            padding-left: 2rem;
            font-size: @font-size-small;
            color: @color-text-l;
            background: @color-highlight-background;
        }
        .list-group-item {
            display: flex;
            align-items: center;
            padding: 2rem 0 0 3rem;
            .avatar {
                flex: 0 0 5rem;
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                overflow: hidden;
                &>img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .name {
                margin-left: 2rem;
                color: @color-text-l;
                font-size: @font-size-medium;
            }
        }
    }
}
</style>