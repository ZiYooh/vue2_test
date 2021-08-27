import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CorpInfo from '@/components/CorpInfo';
import VuetifyTest from '@/components/VuetifyTest';
import ConnTest from '@/components/ConnTest';
import Candidate from '@/components/Candidate';
import Notice from '@/components/Notice';
import Help from '@/components/Help';
import FAQ from '@/components/FAQ';
import QNA from '@/components/QNA';
import Endvote from '@/components/Endvote';
import E404 from '@/components/E404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '*',
      name: 'E404',
      component: E404,
    },
    {
      path: '/corp',
      name: 'CorpInfo',
      component: CorpInfo,
    },
    {
      path: '/vuetifytest',
      name: 'VuetifyTest',
      component: VuetifyTest,
    },
    {
      path: '/conntest',
      name: 'ConnTest',
      component: ConnTest,
    },
    {
      path: '/candidate',
      name: 'Candidate',
      component: Candidate,
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ,
    },
    {
      path: '/qna',
      name: 'QNA',
      component: QNA,
    },
    {
      path: '/endvote',
      name: 'Endvote',
      component: Endvote,
    },
  ],
});
