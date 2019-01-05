import Vue from "vue";
import Router from "vue-router";
import dayjs from "dayjs";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/",
      name: "layout",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./views/Layout.vue"),
      beforeEnter(to, from, next) {
        next();
      },
      children: [
        {
          path: "/",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "goals" */ "./views/Goals.vue")
        },
        {
          path: "/goal/new",
          name: "newgoal",
          component: () =>
            import(/* webpackChunkName: "newgoal" */ "./views/NewGoal.vue")
        },
        {
          path: "/goal/:id/",
          name: "goal",
          redirect: to => {
            const today = dayjs();
            return {
              name: "goalMonth",
              params: {
                id: to.params.id,
                year: today.year(),
                month: today.month()
              }
            };
          }
        },
        {
          path: "/goal/:id/:year/:month",
          name: "goalMonth",
          component: () =>
            import(/* webpackChunkName: "month" */ "./views/Month.vue")
        },
        {
          path: "/goal/:id/:year/:month/:date",
          name: "rate",
          component: () =>
            import(/* webpackChunkName: "day" */ "./views/Day.vue")
        },
        {
          path: "/profile",
          name: "profile",
          component: () =>
            import(/* webpackChunkName: "profile" */ "./views/Profile.vue")
        }
      ]
    }
  ]
});
