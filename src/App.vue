<template>
  <div class="w-[100%] mx-0 px-0">
    <h1 class="uppercase text-4xl font-bold text-center text-stone-400">
      Субботний футбол
    </h1>
    <TableScore :results="results" />
    <div>
      <MatchesList
        v-if="matchesList.length"
        :teams="teamPlays"
        :score="resultsState.scores.slice(-1)"
        :matchesList="matchesList"
        :color="colorTeam"
      />
      <div
        v-if="matchesList.length"
        class="flex items-center justify-center m-3"
      >
        <button v-if="showButton" class="text-red-700" @click="removeLastMatch">
          удалить последнею игру
        </button>
        <!-- <button class="text-red-700" @click="hardReset">hardReset</button> -->
      </div>
      <GameInput @onAddMatch="addMatch" :teams="teamPlays" />
      <!-- {{ scoreList }}
      <br />
      {{ resultsState.count }}
      <br />
      {{ matchesList }}
      <br />
      {{ matchStatistic.gameCount }} -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import MatchesList from './components/MatchesList.vue';
import GameInput from './components/GameInput.vue';
import TableScore from './components/TableScore.vue';
import { teamsData, teamNames, colorTeam } from './consts/';

const wonByPenalty = ref('');

const showButton = ref(true);

const results = reactive({
  without: {
    lose: 0,
    draw: 0,
    win: 0,
    ballsIn: 0,
    ballsOut: 0,
  },
  yellow: {
    lose: 0,
    draw: 0,
    win: 0,
    ballsIn: 0,
    ballsOut: 0,
  },
  red: {
    lose: 0,
    draw: 0,
    win: 0,
    ballsIn: 0,
    ballsOut: 0,
  },
});

// const resultState = reactive({
//   teamHost:,
//   teamGuest:,
// result:,
// goals:,
// })

const resultsState = computed(() => ({
  team: {
    without: {
      team: teamNames.without,
      game: results.without.lose + results.without.draw + results.without.win,
      lose: results.without.lose,
      draw: results.without.draw,
      win: results.without.win,
      ballsIn: results.without.ballsIn,
      ballsOut: results.without.ballsOut,
      balls: results.without.ballsIn - results.without.ballsOut,
      result: results.without.win * 3 + results.without.draw,
      place: 0,
      color: colorTeam.without,
    },
    yellow: {
      team: teamNames.yellow,
      game: results.yellow.lose + results.yellow.draw + results.yellow.win,
      lose: results.yellow.lose,
      draw: results.yellow.draw,
      win: results.yellow.win,
      ballsIn: results.yellow.ballsIn,
      ballsOut: results.yellow.ballsOut,
      balls: results.yellow.ballsIn - results.yellow.ballsOut,
      result: results.yellow.win * 3 + results.yellow.draw,
      place: 0,
      color: colorTeam.yellow,
    },
    red: {
      team: teamNames.red,
      game: results.red.lose + results.red.draw + results.red.win,
      lose: results.red.lose,
      draw: results.red.draw,
      win: results.red.win,
      ballsIn: results.red.ballsIn,
      ballsOut: results.red.ballsOut,
      balls: results.red.ballsIn - results.red.ballsOut,
      result: results.red.win * 3 + results.red.draw,
      place: 0,
      color: colorTeam.red,
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
const teamWon = (t) => {
  results[t].win++;
  results[t].result += 3;
};

const teamLose = (t) => {
  results[t].lose++;
};

const resultsMatch = () => {
  if (
    matchesList.value.length === 1 &&
    matchStatistic.value.status === 'draw'
  ) {
    // debugger;
  } else {
    switch (matchStatistic.value.status) {
      case 'win':
        teamWon(teamPlays.teamHost);
        teamLose(teamPlays.teamGuest);
        break;
      case 'lose':
        teamWon(teamPlays.teamGuest);
        teamLose(teamPlays.teamHost);
        break;
      default:
        results[teamPlays.teamHost].draw++;
        results[teamPlays.teamGuest].draw++;
    }
  }

  // debugger;
  const scoreHost = matchStatistic.value.score[0];
  const scoreGuest = matchStatistic.value.score[2];
  results[teamPlays.teamHost].ballsIn += +scoreHost;
  results[teamPlays.teamGuest].ballsIn += +scoreGuest;
  results[teamPlays.teamHost].ballsOut += +scoreGuest;
  results[teamPlays.teamGuest].ballsOut += +scoreHost;
};

// CANCEL
const teamWonCancel = (t) => {
  results[t].win--;
  results[t].result -= 3;
};

const teamLoseCancel = (t) => {
  results[t].lose--;
};

const cancelMatch = () => {
  if (
    matchesList.value.length === 1
    // && matchStatistic.value.status === 'draw'
  ) {
    results['yellow'].lose = 0;
    results['yellow'].draw = 0;
    results['yellow'].win = 0;
    results['red'].lose = 0;
    results['red'].draw = 0;
    results['red'].win = 0;

  } else {
    // debugger;
    switch (matchStatistic.value.status) {
      case 'win':
        teamWonCancel(matchesList.value[matchesList.value.length-1].teamHost);
        teamLoseCancel(matchesList.value[matchesList.value.length-1].teamGuest);
        break;
      case 'lose':
        teamWonCancel(matchesList.value[matchesList.value.length-1].teamGuest);
        teamLoseCancel(matchesList.value[matchesList.value.length-1].teamHost);
        break;
      default:
        results[matchesList.value[matchesList.value.length-1].teamHost].draw--;
        results[matchesList.value[matchesList.value.length-1].teamGuest].draw--;
    }
  }
};

// NEXT GAME CONFIGURATION
const changeTeams = () => {
  const lastHost = teamPlays.teamHost;
  const lastGuest = teamPlays.teamGuest;
  // FIRST TEAM ON NEW GAME
  if (
    matchesList.value.length === 1 &&
    matchStatistic.value.status === 'draw'
  ) {
    teamPlays.teamHost = wonByPenalty;
  } else {
    teamPlays.teamHost =
      matchStatistic.value.status === 'win' ? lastHost : lastGuest;
  }
  // SECOND TEAM ON NEW GAME
  teamPlays.teamGuest = teamsData?.filter(
    (team) => ![lastHost, lastGuest]?.includes(team)
  )[0];
};

const matchesList = ref([]);

const matchStatistic = reactive({});

// время
// const updateTime = (gameTime = 7) => {
//   const date = new Date();
//   const hours = date.getHours();
//   let minutes = date.getMinutes();
//   const correctMinutes = minutes / 10 < 1 ? `0${minutes}` : minutes;
//   const timeString = `${hours}:${correctMinutes}`;
//   return timeString;
// };

// const timeNow = ref(updateTime());

const addMatch = (payload) => {
  // debugger;
  showButton.value = true;
  matchStatistic.value = {
    gameCount: null,
    // start: timeNow,
    teamHost: teamPlays.teamHost,
    score: null,
    teamGuest: teamPlays.teamGuest,
    status: payload.teamHostStatus,
    // gameTime: 7,
  };

  const firstDraw = () => {
    // debugger;
    const whoWon = prompt(
      `Шо ничья? Так кто по пенальти победил? Если победила команда ${
        teamNames[teamPlays.teamHost]
      } - 1, если команда ${teamNames[teamPlays.teamGuest]} - 2?`,
      1
    );
    if (whoWon === '1') {
      teamWon(teamPlays.teamHost);
      teamLose(teamPlays.teamGuest);
      // alert(`Победила команда ${teamNames[teamPlays.teamHost]}`);

      matchStatistic.value.score =
        payload.score + ' п.' + teamNames[teamPlays.teamHost];

      wonByPenalty.value = teamPlays.teamHost;
    } else if (whoWon === '2') {
      teamWon(teamPlays.teamGuest);
      teamLose(teamPlays.teamHost);

      matchStatistic.value.score =
        payload.score + ' п.' + teamNames[teamPlays.teamGuest];

      // alert(`Победила команда ${teamNames[teamPlays.teamGuest]}`);

      wonByPenalty.value = teamPlays.teamGuest;
    } else {
      alert('Ну ты и дурак, вводи 1 или 2');
      firstDraw();
    }

    console.log(wonByPenalty.value);
  };

  if (!scoreList.value.length && payload.teamHostStatus === 'draw') {
    firstDraw();
    // debugger;
  } else {
    matchStatistic.value.score = payload.score;
  }
  scoreList.value.push(payload.score);
  matchStatistic.value.gameCount = scoreList.value.length;
  matchesList.value = [...matchesList.value, matchStatistic.value];
  resultsMatch();
  changeTeams();
};
// TODO:проблема с удалением
const removeLastMatch = () => {
  if (confirm('Удалить матч?')) {
  cancelMatch();
  showButton.value = false;
  (teamPlays.teamHost = matchesList.value.at(-1).teamHost),
    (teamPlays.teamGuest = matchesList.value.at(-1).teamGuest),
    (results[teamPlays.teamHost].ballsIn -= +matchStatistic.value.score[0]);
  results[teamPlays.teamGuest].ballsIn -= +matchStatistic.value.score[2];
  results[teamPlays.teamHost].ballsOut -= +matchStatistic.value.score[2];
  results[teamPlays.teamGuest].ballsOut -= +matchStatistic.value.score[0];
  matchesList.value.pop();
  scoreList.value.pop();
  }
};

const hardReset = () => {
  if (confirm('Сбросить все?')) {
    matchesList.value = [];
    scoreList.value = [];
    results = {};
    teamPlays.teamHost = null;
    teamPlays.teamGuest = null;
    wonByPenalty.value = null;
    resultsMatch();
  }
};

watch(
  () => scoreList.value,
  (newVal) => {
    console.log(newVal);
  }
);

watch(
  () => scoreList.value,
  (newVal) => {
    console.log(newVal);
  }
);
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
