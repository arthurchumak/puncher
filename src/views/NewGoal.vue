<template>
  <div>
    <form @submit.prevent="addGoal">
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              <input type="text" v-model="name">
            </h1>
          </div>
        </div>
      </section>

      <section class="hero is-dark" @mousedown="addGoal">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Add</h1>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    addGoal() {
      this.db.addGoal({
        title: this.name,
        id: Date.now()
      });
      this.$router.go(-1);
    }
  }
};
</script>


<style>
</style>
