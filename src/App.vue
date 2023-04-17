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
    <div v-if="matchesList.length" class="flex items-center justify-center m-3">
      <h2>удалить последнею игру</h2>
      <button @click="removeLastMatch">x</button>
    </div>
    <GameInput @onAddMatch="addMatch" :teams="teamPlays" />
    {{ scoreList }}
    <br />
    {{ resultsState.count }} игр {{ matchesList }} игр
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import MatchesList from './components/MatchesList.vue';
import GameInput from './components/GameInput.vue';
import TableScore from './components/TableScore.vue';
import { teamsData, teamNames } from './consts/';

const results = reactive({
  without: {
    lose: 0,
    draw: 0,
    win: 0,
    balls: 0,
  },
  yellow: {
    lose: 0,
    draw: 0,
    win: 0,
    balls: 0,
  },
  red: {
    lose: 0,
    draw: 0,
    win: 0,
    balls: 0,
  },
});

const resultsState = computed(() => ({
  team: {
    without: {
      team: 'Без манишек',
      game: results.without.lose + results.without.draw + results.without.win,
      lose: results.without.lose,
      draw: results.without.draw,
      win: results.without.win,
      balls: results.without.balls,
      result: results.without.win * 3 + results.without.draw,
      place: 0,
      color: 'bg-slate-500',
    },
    yellow: {
      team: 'Желтые',
      game: results.yellow.lose + results.yellow.draw + results.yellow.win,
      lose: results.yellow.lose,
      draw: results.yellow.draw,
      win: results.yellow.win,
      balls: results.yellow.balls,
      result: results.yellow.win * 3 + results.yellow.draw,
      place: 0,
      color: 'bg-amber-500',
    },
    red: {
      team: 'Красные',
      game: results.red.lose + results.red.draw + results.red.win,
      lose: results.red.lose,
      draw: results.red.draw,
      win: results.red.win,
      balls: results.red.balls,
      result: results.red.win * 3 + results.red.draw,
      place: 0,
      color: 'bg-red-500',
    },
  },
  count: scoreList.value.length,
  scores: scoreList.value,
}));

const scoreList = ref([]);

const teamPlays = reactive({
  teamHost: 'yellow',
  teamGuest: 'red',
});

const lastGame = computed(() => ({}));

// WHO WIN WHO LOSE

const whoWinWhoLose = () => {
  // debugger
  const currentScore = scoreList.value[0];
  if (currentScore[0] > currentScore[2] || currentScore[0] === 2) {
    won.value = teamPlays.teamHost;
    lose.value = teamPlays.teamGuest;
  } else if (currentScore[0] === currentScore[2]) {
    won.value = teamPlays.teamGuest;
    lose.value = null;
  } else {
    won.value = teamPlays.teamGuest;
    lose.value = teamPlays.teamHost;
  }
};

const resultsMatch = () => {
  // whoWinWhoLose();
  // debugger;
  if (matchStatistic.value.status === 'win') {
    teamWon(teamPlays.teamHost);
    teamLose(teamPlays.teamGuest);
  } else {
    results[teamPlays.teamHost].draw++;
    results[teamPlays.teamGuest].draw++;
  }
  results[teamPlays.teamHost].game += 5;
  results[teamPlays.teamGuest].game++;
  results[teamPlays.teamHost].balls += '';
  results[teamPlays.teamGuest].balls += '';
};

const teamWon = (t) => {
  results[t].win++;
  results[t].result += 3;
};

const teamLose = (t) => {
  results[t].lose++;
};

// NEXT GAME CONFIGURATION

const changeTeams = () => {
  const lastHost = teamPlays.teamHost;
  const lastGuest = teamPlays.teamGuest;
  teamPlays.teamHost =
    matchStatistic.value.status === 'win' ? lastHost : lastGuest;
  console.log(teamPlays.teamGuest);

  teamPlays.teamGuest = teamsData?.filter(
    (team) => ![lastHost, lastGuest]?.includes(team)
  )[0];

  console.log(teamPlays.teamGuest);
};

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
  debugger
  if (!scoreList.value.length && payload.teamHostStatus === 'draw') {
    // сделать промпт - 1 и 2 и если что-то другое вводишь - ошибка
    prompt(
      `Шо ничья? Так кто по пенальти победил? Если победила команда ${
        teamNames[teamPlays.teamHost]
      } - 1, если команда ${teamNames[teamPlays.teamGuest]} - 2?`,1
    );
    alert(`Победила команда ${teamNames[teamPlays.teamHost]}`)
    scoreList.value.push(payload.score);
  } else {
    scoreList.value.push(payload.score);
    matchStatistic.value = {
      id: scoreList.value.length,
      start: timeNow,
      teamHost: teamPlays.teamHost,
      teamGuest: teamPlays.teamGuest,
      score: payload.score,
      status: payload.teamHostStatus,
      gameTime: 7,
    };
    matchesList.value = [...matchesList.value, matchStatistic.value];
    resultsMatch();
    console.log(matchStatistic.value);
    changeTeams();
  }
};

const removeLastMatch = () => {
  // if (confirm('Удалить матч?')) {
  matchesList.value.pop();
  // }
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
