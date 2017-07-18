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
        <div class="list-shortcut">
            <ul>
                <li class="item" v-for="(item, index) in shortcutList" :key="index" :class="{'current':currentIndex==index}">{{item}}</li>
            </ul>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll';
import Loading from 'base/loading';

export default {
    name: 'listview',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            currentIndex: 0
        }
    },
    components: { Scroll, Loading },
    methods: {

    },
    computed: {
        shortcutList(){
            return this.data.map((group) => {
                return group.title.substr(0, 1);
            });
        }
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
    .list-shortcut {
        position: absolute;
        right: 0;
        top: 50%;
        z-index: 30;
        transform: translateY(-50%);
        width: 2rem;
        padding: 2rem 0;
        border-radius: 1rem;
        text-align: center;
        background: @color-background-d;
        font-family: Helvetica;
        .item {
            //font-size: 20rem;
            padding: 0.3rem;
            line-height: 1;
            color: @color-text-l;
            font-size: @font-size-small;
            &.current{
                color: @color-theme;
            }
        }
    }
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>