<template>
  <div>
    <router-link :to="`/goal/${$route.params.id}`">
      <h1 class="title is-1 has-text-centered">
        <template v-if="goal">{{goal}}</template>
        <template v-else>...</template>
      </h1>
    </router-link>
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
}
</script>

<style scoped>
h1 {
  padding: 1rem 0rem;
}
</style>