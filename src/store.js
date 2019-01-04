import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const auth = {
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
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
