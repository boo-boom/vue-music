import Vue from 'vue';
import Router from 'vue-router';
import Recommend from '@/components/recommend';
import Singer from '@/components/singer';
import Rank from '@/components/rank';
import Search from '@/components/search';
import SingerDetail from '@/components/singer_detail';
import Disc from '@/components/disc';
import TopList from '@/components/top_list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
