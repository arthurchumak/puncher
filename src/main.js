/* eslint-disable no-undef */
import Vue from "vue";
import dayjs from "dayjs";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./registerServiceWorker";

Vue.prototype.auth = {
  client: firebase.auth(),
  login(email, password) {
    return this.client.signInWithEmailAndPassword(email, password).then(({user}) => {
      store.commit("SET_USER", user);
    });
  },
  logout() {
    store.commit("SET_USER", null);
    router.push('/');
    return this.client.signOut();
  },
  signin(email, password) {
    return this.client.createUserWithEmailAndPassword(email, password).then(({user}) => {
      store.commit("SET_USER", user);
    });
  },
  resetPass(email) {
    return this.client.sendPasswordResetEmail(email);
  }
};

Vue.prototype.db = {
  userId() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : 0;
  },
  db: firebase.database(),
  addGoal(goal) {
    return this.db.ref(`/users/${this.userId()}/goals`).push(goal);
  },
  getGoals() {
    return this.db.ref(`/users/${this.userId()}/goals`);
  },
  getGoal(id) {
    return this.db.ref(`/users/${this.userId()}/goals/${id}/title`);
  },
  removeGoal(id) {
    this.db.ref(`/users/${this.userId()}/goals/${id}`).remove();
    return this.db.ref(`/users/${this.userId()}/goals/${id}`).remove();
  },
  addRate(goal, date, rate, comment = "") {
    const sDate = dayjs(date);
    return this.db
      .ref(
        `/users/${this.userId()}/goals/${goal}/rates/${sDate.year()}/${sDate.month()}/${sDate.date()}`
      )
      .set({
        rate,
        comment
      });
  },
  getRates(goal, date) {
    const sDate = dayjs(date);
    return this.db.ref(`/users/${this.userId()}/goals/${goal}/rates/${sDate.year()}/${sDate.month()}`);
  },
  getRate(goal, date) {
    const sDate = dayjs(date);
    return this.db.ref(
      `/users/${this.userId()}/goals/${goal}/rates/${sDate.year()}/${sDate.month()}/${sDate.date()}`
    );
  }
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.auth.user) {
    next('/login');
  }
  next();
})

const onAuthStateChangedUnsubscribe = firebase.auth().onAuthStateChanged(function(user) {
  onAuthStateChangedUnsubscribe();
  store.commit("SET_USER", user);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
