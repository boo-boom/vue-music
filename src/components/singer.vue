<template>
    <div class="singer">
        <list-view :data='singers'></list-view>
    </div>
</template>

<script>
import { ERR_OK } from 'api/config';
import ListView from 'base/listview';
import Singer from 'assets/js/singer';
import { getSingerList } from 'api/singer';

export default {
    name: 'singer',
    components: { ListView },
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList();
    },
    methods: {
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = this._normalizeSinger(res.data.list);
                }
            });
        },
        _normalizeSinger(list) {
            const HOT_TITLE = '热门';
            const HOT_LEN = 1;
            let map = {
                hot: {
                    title: HOT_TITLE,
                    items: []
                }
            }
            list.forEach(function (item, index) {
                if (index < HOT_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }));
                }
                let key = item.Findex;
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }));
                }
            });

            // 排序
            let hot = [];
            let ret = [];
            for(let key in map){
                let val = map[key];
                if(val.title.match(/[a-zA-Z]/)){
                    
                }
            }
            console.log(JSON.stringify(map));
            return list;
        }
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>

