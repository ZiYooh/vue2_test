// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Web3 from 'web3';
import vuetify from '@/plugins/vuetify';
import App from './App';
import router from './router';
import store from "./vuex/store";
import Config from './config';

//require("../node_modules/bootstrap/dist/css/bootstrap.css");


Vue.config.productionTip = false;

Vue.mixin({
  created() {
    const web3js = window.web3;
    if (typeof web3js !== 'undefined') {
      this.$web3 = new Web3(web3js.currentProvider);
    }

    this.$getDefaultAccount = () => new Promise((resolve, reject) => {
      this.$web3.eth.getAccounts((err, data) => {
        if (!err) resolve(data[0]);
        reject(err);
      });
    });
    this.$config = Config;
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  components: { App },
  template: '<App/>',
});
