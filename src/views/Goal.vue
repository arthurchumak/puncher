<template>
  <div>
    <router-link :to="`/goal/${$route.params.id}`">
      <h1 class="title is-1 has-text-centered">
        <template v-if="goal">{{goal}}</template>
        <template v-else>...</template>
      </h1>
    </router-link>
    <button class="button is-danger" @mousedown="remove">Delete</button>
    <router-view/>
  </div>
</template>


<script>
export default {
  created() {
    this.db.getGoal(this.$route.params.id).on("value", snapshot => {
      this.goal = snapshot.val();
    });
  },
  data() {
    return {
      goal: null,
    };
  },
  methods: {
    remove() {
      if (confirm("DELETE?")) {
        this.db.removeGoal(this.$route.params.id);
        this.$router.go(-1);
      }
    },
  }
}
</script>