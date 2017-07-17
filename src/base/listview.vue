<template>
    <scroll class="listview" :data="data">
        <ul>
            <li class="list-group" v-for="(group, groupIndex) in data" :key="groupIndex">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="(item, index) in group.items" :key="index">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll';

export default {
    name: 'listview',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: { Scroll },
    methods: {

    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import '~assets/css/variable';

.listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
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