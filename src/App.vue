<template>
  <h1 class="uppercase text-4xl font-bold text-center text-stone-400">
    Субботний футбол
  </h1>
  <TableScore :results="resultsState.team" />
  <div>
    <h2 class="">Игры</h2>
    <MatchesList
      :teams="teamPlays.value"
      :score="resultsState.scores.reverse()[0]"
      :matchesList="matchesList"
    />
    <GameInput @onAddMatch="addMatch" />
    {{ scoreList }}
    <br />
    {{ resultsState.count }} игр
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import MatchesList from './components/MatchesList.vue';
import GameInput from './components/GameInput.vue';
import TableScore from './components/TableScore.vue';

const resultsState = computed(() => ({
  team: {
    without: {
      team: 'Без манишек',
      game: 0,
      lose: 0,
      draw: 0,
      win: 0,
      balls: 0,
      result: 0,
      place: 0,
      color: 'bg-slate-500',
    },
    yellow: {
      team: 'Желтые',
      game: 0,
      lose: 0,
      draw: 0,
      win: 0,
      balls: 0,
      result: 0,
      place: 0,
      color: 'bg-amber-500',
    },
    red: {
      team: 'Красные',
      game: 0,
      lose: 0,
      draw: 0,
      win: 0,
      balls: 0,
      result: 0,
      place: 0,
      color: 'bg-red-500',
    },
  },
  count: scoreList.value.length,
  scores: scoreList.value,
}));

// static data
const teamsData = ['without', 'yellow', 'red'];

const scoreList = ref([]);

const teamPlays = ref(['yellow', 'red']);

const lastGame = computed(() => ({}));

const won = ref(null);
const lose = ref(null);

const nextGame = ref([
  won.value,
  teamsData?.filter((team) => !teamPlays.value?.includes(team)),
]);

const matchesList = ref([]);
const matchStatistic = reactive({});

// время
const updateTime = (gameTime = 7) => {
  const date = new Date();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  const correctMinutes = minutes / 10 < 1 ? `0${minutes}` : minutes;
  const timeString = `${hours}:${correctMinutes}`;
  return timeString;
};

const timeNow = ref(updateTime());

const defaults = {
  game: 0,
  lose: 0,
  draw: 0,
  win: 0,
  balls: 0,
  result: 0,
  allMatches: 0,
};
const addMatch = (payload) => {
  scoreList.value.push(payload.score);
  console.log(scoreList.value);
  matchStatistic.value = {
    start: timeNow,
    teamHost: teamPlays.value[0],
    teamGuest: teamPlays.value[1],
    score: payload.score,
    gameTime: 7,
  };
  matchesList.value = [...matchesList.value, matchStatistic.value];
  console.log(matchesList.value);
};

const removeLastMatch = () => {
  scoreList.value.pop();
  console.log(scoreList.value);
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
