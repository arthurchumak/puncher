<template>
  <section class="section">
    <div id="date">
      <router-link :to="prevDayLink" class="button is-rounded" style="width: 37px; margin: 4px;">←</router-link>
      <h3 class="title is-3">
        <router-link to=".">{{date.format('YYYY/MM')}}</router-link>{{date.format('/DD')}}
      </h3>
      <router-link :to="nextDayLink" class="button is-rounded" style="width: 37px; margin: 4px;">→</router-link>
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
      <br>
      <input class="button is-fullwidth" :disabled="!valid" type="submit">
    </form>
  </section>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      rates: [
        {
          name: "☹️",
          value: -1
        },
        {
          name: "😐",
          value: 0
        },
        {
          name: "😊",
          value: 1
        }
      ],
      selectedRate: null,
      comment: ""
    };
  },
  computed: {
    valid() {
      return this.selectedRate !== null;
    },
    date() {
      const params = this.$route.params;
      return dayjs(`${params.year}/${+params.month + 1}/${params.date}`);
    },
    nextDayLink() {
      const newDate = this.date.add(1, "day");
      return {
        name: "rate",
        params: {
          id: this.$route.params.id,
          year: newDate.year(),
          month: newDate.month(),
          date: newDate.date()
        }
      };
    },
    prevDayLink() {
      const newDate = this.date.add(-1, "day");
      return {
        name: "rate",
        params: {
          id: this.$route.params.id,
          year: newDate.year(),
          month: newDate.month(),
          date: newDate.date()
        }
      };
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
        this.comment || null
      );
      this.$router.go(-1);
    },
  },
  watch: {
    date: {
      immediate: true,
      handler(date) {
        this.db.getRate(this.$route.params.id, date).once("value", snapshot => {
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
section {
  max-width: 800px;
  margin: auto;
}
.section {
  padding: 0rem 1.5rem;
}
#date {
  display: flex;
  justify-content: space-around;
}
#rater {
  display: flex;
  justify-content: center;
}
#rater a {
  font-size: 2.7em;
  margin: 0px 10px;
}
#rater a :not(.active) {
  opacity: 0.5;
}
form textarea {
}
</style>
