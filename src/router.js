import Vue from "vue";
import Router from "vue-router";
import dayjs from "dayjs";

import Day from "./views/Day";
import Goals from "./views/Goals";
import Layout from "./views/Layout";
import Login from "./views/Login";
import Month from "./views/Month";
import NewGoal from "./views/NewGoal";
import Profile from "./views/Profile";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      beforeEnter(to, from, next) {
        next();
      },
      children: [
        {
          path: "/",
          name: "home",
          component: Goals
        },
        {
          path: "/goal/new",
          name: "newgoal",
          component: NewGoal
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
          component: Month
        },
        {
          path: "/goal/:id/:year/:month/:date",
          name: "rate",
          component: Day
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile
        }
      ]
    }
  ]
});
