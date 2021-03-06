import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    user: null
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = user;
    },

    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    LOGOUT() {
      // 반대 로직
      // state.user = null
      // localStorage.removeItem('user')
      // axios.defaults.headers.common['Authorization'] = null

      // 더 좋은 코드
      localStorage.removeItem("user");
      location.reload();
    }
  },
  actions: {
    update_user({ commit }, data) {
      commit("UPDATE_USER", data);
    }
    ,
    register({ commit }, credentials) {
      return axios
        .post("//localhost:3000/register", credentials)
        .then(({ data }) => {
          console.log("user data is", data);
          commit("SET_USER_DATA", data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:3000/login", credentials)
        .then(({ data }) => {
          console.log("user data is", data);
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  }
});
