<template>
  <ul class="flex fs-lg uppercase  ">
    <!-- <li>{{ props.match.start }}</li> -->
    <li
      :class="[
        { 'font-black': props.match.score[0] > props.match.score[2] },
        props.color[props.match.teamHost],
      ]"
    >
      {{ teamNames[props.match.teamHost] }}
    </li>
    <li>{{ props.match.score }}</li>
    <li
      :class="[
        { 'font-black': props.match.score[0] < props.match.score[2] },
        props.color[props.match.teamGuest],
      ]"
    >
      {{ teamNames[props.match.teamGuest] }}
    </li>
    <!-- <li>{{ props.match.gameTime }}</li> -->
  </ul>
</template>

<script setup>
import { reactive } from 'vue';
import { teamNames } from '../consts/';

const props = defineProps({
  match: {
    type: Object,
    required: true,
    default: {
      // start: Date,
      teamHost: '',
      teamGuest: '',
      score: '0:0',
      // gameTime: 7,
    },
  },
  color: {
    type: Object,
  },
});
</script>

<style scoped>
li {
  border: 1px solid black;
  flex: 1 1 0%;
}
</style>
