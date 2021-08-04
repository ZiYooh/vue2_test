import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CorpInfo from '@/components/CorpInfo';
import VuetifyTest from '@/components/VuetifyTest';
import ConnTest from '@/components/ConnTest';
import Candidate from '@/components/Candidate';
import Notice from '@/components/Notice';
import Help from '@/components/Help';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
  ],
});
