import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// Initialize Firebase
const config = require("./fireconfig.json");
firebase.initializeApp(config);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(function(user) {
  store.commit("SET_USER", user);
});

Vue.prototype.auth = {
  client: firebase.auth(),
  login(email, password) {
    return this.client.signInWithEmailAndPassword(email, password);
  },
  logout() {
    return this.client.signOut();
  },
  signin(email, password) {
    return this.client.createUserWithEmailAndPassword(email, password);
  },
  resetPass(email) {
    return this.client.sendPasswordResetEmail(email);
  }
};
import dayjs from "dayjs";
Vue.prototype.db = {
  userId() {
    return firebase.auth().currentUser.uid;
  },
  db: firebase.database(),
  addGoal(goal) {
    return this.db.ref(`/users/${this.userId()}/goals`).push(goal);
  },
  getGoals() {
    return this.db.ref(`/users/${this.userId()}/goals`);
  },
  getGoal(id) {
    return this.db.ref(`/users/${this.userId()}/goals/${id}`);
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
