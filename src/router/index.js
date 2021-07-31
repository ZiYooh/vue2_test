import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import CorpInfo from '@/components/CorpInfo';
import VuetifyTest from '@/components/VuetifyTest';
import Grid from '@/components/Grid';
import Candidate from '@/components/Candidate';

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
      path: '/grid',
      name: 'Grid',
      component: Grid,
    },
    {
      path: '/candidate',
      name: 'Candidate',
      component: Candidate,
    },
  ],
});
