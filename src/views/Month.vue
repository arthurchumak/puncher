<template>
  <div>
    <a @mousedown="$router.push({ name: 'goal', params: { id: $route.params.id } })">
      <h1 class="title is-1">
        <template v-if="goal">{{goal.title}}</template>
        <template v-else>...</template>
      </h1>
    </a>
    <div id="date-selector">
      <button @mousedown="monthGo(-1)" class="button is-rounded" style="width: 37px; margin: 4px;">←</button>
      <h3 class="title is-3">{{date.format('MMM YYYY')}}</h3>
      <button @mousedown="monthGo(1)" class="button is-rounded" style="width: 37px; margin: 4px;">→</button>
    </div>
    <div id="month" v-if="rates">
      <a class="day" v-for="day of lastMonthDays" :key="day"></a>
      <a
        v-for="day of month"
        :key="day"
        class="button is-rounded day"
        :class="{ 'is-warning': rates[day] && rates[day].rate==0, 'is-success': rates[day] && rates[day].rate==1, 'is-danger': rates[day] && rates[day].rate==-1, }"
        @mousedown="$router.push({ name: 'rate', params: { id: $route.params.id, year: $route.params.year, month: $route.params.month, date: day } })"
      >{{day}}</a>
    </div>
    <p>
      <button @mousedown="remove">Delete</button>
    </p>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  created() {
    this.db.getGoal(this.$route.params.id).on("value", snapshot => {
      this.goal = snapshot.val();
    });
  },
  data() {
    return {
      goal: null,
      rates: {}
    };
  },
  computed: {
    lastMonthDays() {
      const WEEK_START = 1;
      let walker = this.date.startOf("month");
      const days = [];
      while (walker.day() != WEEK_START) {
        walker = walker.subtract(1, "day");
        days.push(walker.unix());
      }
      return days;
    },
    date() {
      return dayjs(
        `${this.$route.params.year}/${this.$route.params.month + 1}/1`
      );
    },
    month() {
      const month = [];
      const days = this.date.daysInMonth();
      for (let i = 1; i <= days; i++) {
        month.push(i);
      }
      return month;
    }
  },
  methods: {
    remove() {
      if (confirm("DELETE?")) {
        this.db.removeGoal(this.$route.params.id);
        this.$router.go(-1);
      }
    },
    monthGo(shift) {
      this.rates = [];
      const date = this.date.add(shift, "month");
      this.$router.push({
        name: "goalMonth",
        params: {
          id: this.$route.params.id,
          year: date.year(),
          month: date.month()
        }
      });
    }
  },
  watch: {
    date: {
      immediate: true,
      handler(date) {
        this.db
          .getRates(this.$route.params.id, date)
          .once("value", snapshot => {
            this.rates = snapshot.val() || {};
          });
      }
    }
  }
};
</script>


<style>
#date-selector {
  display: flex;
  justify-content: space-around;
}
#month {
  display: flex;
  flex-wrap: wrap;
  margin: 0px 1vw;
}
.day {
  width: 10vw;
  margin: 2vw;
}
</style>
