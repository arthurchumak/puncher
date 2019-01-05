<template>
  <div>
    <h3 class="title is-3" @mousedown="routeMonth">{{date.format('MMM YYYY')}}</h3>
    <div id="date">
      <button
        @mousedown="dateWalk(-1)"
        class="button is-rounded"
        style="width: 37px; margin: 4px;"
      >←</button>
      <h3 class="title is-3">{{date.format('DD')}}</h3>
      <button @mousedown="dateWalk(1)" class="button is-rounded" style="width: 37px; margin: 4px;">→</button>
    </div>
    <form @submit.prevent="submit">
      <div id="rater">
        <a v-for="rate of rates" :key="rate.value">
          <span
            :class="{ active: rate.value === selectedRate }"
            @mousedown="select(rate.value)"
          >{{rate.name}}</span>
        </a>
      </div>
      <textarea class="textarea" placeholder="Comment" v-model="comment"></textarea>
      <input type="submit">
    </form>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      rates: [
        {
          name: "🙁",
          value: -1
        },
        {
          name: "😐",
          value: 0
        },
        {
          name: "🙂",
          value: 1
        }
      ],
      selectedRate: null,
      comment: ""
    };
  },
  computed: {
    date() {
      return dayjs(
        `${this.$route.params.year}/${this.$route.params.month + 1}/${
          this.$route.params.date
        }`
      );
    }
  },
  methods: {
    select(rate) {
      if (this.selectedRate != rate) {
        this.selectedRate = rate;
      } else {
        this.selectedRate = null;
      }
    },
    submit() {
      this.db.addRate(
        this.$route.params.id,
        this.date,
        this.selectedRate,
        this.comment
      );
      this.routeMonth();
    },
    dateWalk(shift) {
      const newDate = this.date.add(shift, "day");
      this.$router.push({
        name: "rate",
        params: {
          id: this.$route.params.id,
          year: newDate.year(),
          month: newDate.month(),
          date: newDate.date()
        }
      });
    },
    routeMonth() {
      this.$router.push({
        name: "goalMonth",
        params: {
          id: this.$route.params.id,
          year: this.date.year(),
          month: this.date.month()
        }
      });
    }
  },
  watch: {
    date: {
      immediate: true,
      handler(date) {
        this.db
          .getRate(this.$route.params.id, this.date)
          .once("value", snapshot => {
            const rate = snapshot.val() || {};
            this.selectedRate = rate.rate;
            this.comment = rate.comment;
          });
      }
    }
  }
};
</script>


<style>
#date {
  display: flex;
  justify-content: space-around;
}
#rater a {
  font-size: 4em;
}
#rater a :not(.active) {
  opacity: 0.5;
}
form {
  max-width: 80vw;
  text-align: center;
}
</style>
