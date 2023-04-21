<template>
  <h2 class="text-xl mb-3">Результаты игр</h2>
  <div class="w-auto mx-auto">
    <ul class="flex text-sm uppercase">
      <!-- <li>начало матча</li> -->
      <li>команда</li>
      <li>счет</li>
      <li>команда</li>
      <!-- <li>время игры</li> -->
    </ul>
    <div>
    <MatchCard
    v-for="(match, index) in props.matchesList"
    :key="index"
    :match="match"
    :color="props.color"
    />
  </div>
</div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import MatchCard from './MatchCard.vue';

const props = defineProps({
  matchesList: {
    type: Array,
  },
  color: {
    type: Object,
  },
});

console.log(props.teams);
</script>

<style scoped>
li {
  border: 1px solid black;
  padding: 5px;
  font: 700;
  font-size: 1em;
  flex: 1 1 0%;
}
</style>
