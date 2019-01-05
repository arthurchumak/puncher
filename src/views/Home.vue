<template>
  <div>
    <section class="goal dark" v-for="(goal, id) of goals" :key="id">
      <div @mousedown="$router.push({name: 'goal', params: {id}})">{{goal.title}}</div>
    </section>

    <section class="goal">
      <div @mousedown="$router.push({name: 'newgoal'})">+</div>
    </section>
  </div>
</template>

<script>
export default {
  created() {
    this.db.getGoals().on("value", snapshot => {
      this.goals = snapshot.val();
    });
  },
  data() {
    return {
      title: "",
      goals: []
    };
  },
  methods: {
    addGoal() {
      this.db.addGoal({
        title: this.title
      });
    }
  }
};
</script>


<style>
.goal {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  font-size: 2em;
  font-weight: bold;
}
.dark {
  background: #2d2d2d;
  color: white;
}
.border {
  border: 1px solid black;
}
</style>
