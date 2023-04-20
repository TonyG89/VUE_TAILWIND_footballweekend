<template>
  <div>
    <h2>Результат игры:</h2>
    <div class="flex flex-1 justify-center items-center">
      <div
        class="text-sm font-bold mx-4 text-center w-[100px]"
        :class="colorTeamStyle"
      >
        {{ componentsState.teamHost }}
      </div>
      <select v-model="score">
        <option v-for="score in scoreData" :key="score">
          {{ score }}
        </option>
      </select>
      <div class="text-sm font-bold mx-4 text-center w-[100px]">
        {{ componentsState.teamGuest }}
      </div>
    </div>
    <button class="my-3" @click="onAddMatch">Добавить</button>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { teamsData, scoreData, teamNames } from '../consts';

const colorTeamStyle = ref(`bg-${props.teams.teamHost}-500`);
props.teams.teamGuest === 'red';

const componentsState = computed(() => ({
  teamHost: teamNames[props.teams.teamHost],
  teamGuest: teamNames[props.teams.teamGuest],
  status:
    scoreData[0] === score.value || scoreData[3] === score.value
      ? 'draw'
      : scoreData[1] === score.value ||
        scoreData[4] === score.value ||
        scoreData[6] === score.value
      ? 'win'
      : 'lose',
}));

const score = ref(scoreData[0]);

const emit = defineEmits({
  onAddMatch: null,
});

const props = defineProps({
  teams: {
    type: Object,
    required: true,
    default: teamsData,
  },
});

const onAddMatch = () => {
  emit('onAddMatch', {
    score: score.value,
    teamHostStatus: componentsState.value.status,
  });
};
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 10px;
  font-size: large;
  border-radius: 30%;
  border: 2px solid #ccc;
  padding-left: 14px;
  letter-spacing: 5px;
  text-align: center;
  justify-content: center;
}
</style>
