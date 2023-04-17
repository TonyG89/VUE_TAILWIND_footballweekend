<template>
  <ul class="flex">
    <li>{{ props.match.start }}</li>
    <li>{{ props.match.teamHost }}</li>
    <li>{{ props.match.score }}</li>
    <li>{{ props.match.teamGuest }}</li>
    <li>{{ props.match.gameTime }}</li>
  </ul>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  match: {
    type: Object,
    required: true,
    default: {
      start: Date,
      teamHost: '',
      teamGuest: '',
      score: '0:0',
      gameTime: 7,
    },
  },
});

</script>

<style scoped>
li {
  border: 1px solid black;
  flex: 1 1 0%;
}
</style>
