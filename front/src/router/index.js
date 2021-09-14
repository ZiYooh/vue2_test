import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import BlockInfo from '@/components/BlockInfo';
import VuetifyTest from '@/components/VuetifyTest';
import ConnTest from '@/components/ConnTest';
import Candidate from '@/components/Candidate';
import Notice from '@/components/Notice';
import NoticeList from '@/components/NoticeList';
import Write from '@/components/Write';
import Update from '@/components/Update';
import ContPage from '@/components/ContPage';
import Help from '@/components/Help';
import FAQ from '@/components/FAQ';
import Endvote from '@/components/Endvote';
import Board from '@/components/Board';
import VoteList from '@/components/VoteList';
import E404 from '@/components/E404';
import Login from '@/components/jayoon/Login';
import Logincomp from '@/components/jayoon/Logincomp';
import MakeVote from '@/components/jayoon/MakeVote';
import Register from '@/components/jayoon/Register';
import Registercomp from '@/components/jayoon/Registercomp';
import Profile from '@/components/jayoon/Profile';
import ModProfile from '@/components/jayoon/ModProfile';
import UserList from '@/components/jayoon/UserList';
import Profilecomp from '@/components/jayoon/Profilecomp';
import UserListcomp from '@/components/jayoon/UserListcomp';
import NowVote from '@/components/voteComponent/NowVote';
import VoterInfo from '@/components/voteComponent/VoterInfo';
import VoteAnalyze from '@/components/voteComponent/VoteAnalyze';
import EndVoteView from '@/components/voteComponent/EndVoteView';
import QNA from '@/components/QNA';
import QNAWrite from '@/components/QNAWrite';
import QNAContPage from '@/components/QNAContPage';
import QNAUpdate from '@/components/QNAUpdate';

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
      path: '/blockinfo',
      name: 'BlockInfo',
      component: BlockInfo,
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
      path: '/noticelist',
      name: 'NoticeList',
      component: NoticeList,
    },
    {
      path: '/write',
      name: 'Write',
      component: Write,
    },
    {
      path: '/update',
      name: 'Update',
      component: Update,
    },
    {
      path: '/contpage',
      name: 'ContPage',
      component: ContPage,
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
      path: '/endvote',
      name: 'Endvote',
      component: Endvote,
    },
    {
      path: '/votelist',
      name: 'VoteList',
      component: VoteList,
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/logincomp',
      name: 'Logincomp',
      component: Logincomp,
    },
    {
      path: '/makevote',
      name: 'MakeVote',
      component: MakeVote,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/registercomp',
      name: 'Registercomp',
      component: Registercomp,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/modprofile',
      name: 'ModProfile',
      component: ModProfile,
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList,
    },
    {
      path: '/profilecomp',
      name: 'Profilecomp',
      component: Profilecomp,
    },
    {
      path: '/userlistcomp',
      name: 'UserListcomp',
      component: UserListcomp,
    },
    {
      path: '/nowvote/:code',
      name: 'NowVote',
      component: NowVote,
    },
    {
      path: '/voterinfo/:code',
      name: 'VoterInfo',
      component: VoterInfo,
    },
    {
      path: '/voteanalyze/:code',
      name: 'VoteAnalyze',
      component: VoteAnalyze,
    },
    {
      path: '/endvoteview/:code',
      name: 'EndVoteView',
      component: EndVoteView,
    },
    {
      path: '/qna',
      name: 'QNA',
      component: QNA,
    },
    {
      path: '/qnawrite',
      name: 'QNAWrite',
      component: QNAWrite,
    },
    {
      path: '/qnacontpage',
      name: 'QNAContPage',
      component: QNAContPage,
    },
    {
      path: '/qnaupdate',
      name: 'QNAUpdate',
      component: QNAUpdate,
    },
  ],
});
