<template>
  <div>
    <div id="date-selector">
      <router-link :to="prevMonthLink" class="button is-rounded" style="width: 37px; margin: 4px;">←</router-link>
      <h3 class="title is-3">{{date.format('MMM YYYY')}}</h3>
      <router-link :to="nextMonthLink" class="button is-rounded" style="width: 37px; margin: 4px;">→</router-link>
    </div>
    <div id="month" v-if="rates">
      <a class="day" v-for="day of lastMonthDays" :key="day"></a>
      <router-link
        v-for="day of month"
        :key="day.unix()"
        class="button is-rounded day"
        :class="{ 'today': day.isSame(new Date(), 'day'), 'is-warning': rates[day.date()] && rates[day.date()].rate==0, 'is-success': rates[day.date()] && rates[day.date()].rate==1, 'is-danger': rates[day.date()] && rates[day.date()].rate==-1, }"
        :to="{ name: 'rate', params: { id: $route.params.id, year: $route.params.year, month: $route.params.month, date: day.date() } }"
      >
        {{day.date()}}
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      rates: {}
    };
  },
  computed: {
    lastMonthDays() {
      const WEEK_START = 1;
      let walker = this.date;
      const days = [];
      while (walker.day() != WEEK_START) {
        walker = walker.subtract(1, "day");
        days.push(walker.unix());
      }
      return days;
    },
    date() {
      const date = new Date(+this.$route.params.year, +this.$route.params.month)
      return dayjs(date).startOf("month");
    },
    month() {
      const month = [];
      const days = this.date.daysInMonth();
      for (let i = 0; i < days; i++) {
        month.push(this.date.add(i, "day"));
      }
      return month;
    },
    prevMonthLink() {
      const date = this.date.add(-1, "month");
      return {
        name: "goalMonth",
        params: {
          id: this.$route.params.id,
          year: date.year(),
          month: date.month()
        }
      };
    },
    nextMonthLink() {
      const date = this.date.add(1, "month");
      return {
        name: "goalMonth",
        params: {
          id: this.$route.params.id,
          year: date.year(),
          month: date.month()
        }
      };
    },
  },
  methods: {
    loadRates(goalId, date) {
      this.db
        .getRates(goalId, date)
        .once("value", snapshot => {
          this.rates = snapshot.val() || {};
        });
    }
  },
  watch: {
    date: {
      immediate: true,
      handler(date) {
        this.loadRates(this.$route.params.id, date);
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
  max-width: 800px;
  margin: auto;
}
.day {
  width: 10%;
  margin: 2%;
}
.today {
  font-weight: bold;
  border: 1px solid;
}
</style>
