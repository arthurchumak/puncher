import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const auth = {
  state: {
    user: null,
    loading: true
  },
  getters: {
    isAuth: state => state.user && state.user.uid
  },
  mutations: {
    SET_USER(state, payload) {
      console.log('SET_USER', payload);
      state.user = payload;
      state.loading = false;
    }
  }
};

export default new Vuex.Store({
  state: {},
  modules: {
    auth
  },
  strict: false
});
