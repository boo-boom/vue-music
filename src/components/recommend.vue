<template>
    <div class="recommend">
        <div>
            <div class="recommend-content" v-if="recommends.length">
                <Slider>
                    <div v-for="(item, index) in recommends" :key="index">
                        <a href="javascript:;">
                            <!-- item.linkUrl -->
                            <!-- item.id -->
                            <img class="needsclick" :src="item.picUrl">
                        </a>
                    </div>
                </Slider>
            </div>
        </div>
    </div>
</template>

<script>
import { ERR_OK } from 'api/config';
import { getRecommend } from 'api/recommend';
import Slider from 'base/slider';
export default {
    name: 'recommend',
    components: { Slider },
    data() {
        return {
            recommends: []
        }
    },
    created() {
        this._getRecommend();
    },
    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            });
        }
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.recommend {
    .recommend-content{
        overflow: hidden;
    }
}
</style>

