<template>
  <h1>Результаты игр</h1>
  <ul class="flex fs-lg uppercase">
    <li>начало матча</li>
    <li>команда</li>
    <li>счет</li>
    <li>команда</li>
    <li>время игры</li>
  </ul>
  <div>
    <MatchCard
      v-for="match in props.matchesList"
      :key="match.start"
      :match="match"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import MatchCard from './MatchCard.vue';

const defaults = {
  start: '11:00',
  teamHost: 'team 1',
  teamGuest: 'team 2',
  score: '0:0',
  gameTime: 7,
};

const props = defineProps({
  matchesList: {
    type: Array,
  },
});

console.log(props.teams);
</script>

<style scoped>
li {
  border: 1px solid black;
  padding: 5px;
  font: 900;
  font-size: 1.5em;
  flex: 1 1 0%;
}
</style>
