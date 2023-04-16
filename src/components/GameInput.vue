<template>
  <div>
    <h2>Результат игры:</h2>
    <div class="flex justify-center items-center py-3">
      <div class="text-sm font-bold mx-4 text-center">команда 1:</div>
      <select v-model="score">
        <option
          v-for="score in scoreData"
          :key="score"
          :class="
            scoreData[0] === score || scoreData[3] === score
              ? 'text-red-500'
              : scoreData[1] === score ||
                scoreData[4] === score ||
                scoreData[6] === score
              ? 'bg-fuchsia-600'
              : 'bg-slate-500'
          "
        >
          {{ score }}
        </option>
      </select>
      <div class="text-sm font-bold mx-4 text-center">команда 2:</div>
    </div>
    <button @click="onAddMatch">Добавить</button>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const scoreData = ['0:0', '1:0', '0:1', '1:1', '2:1', '1:2', '2:0', '0:2'];

const score = ref(scoreData[0]);


const emit = defineEmits({
  onAddMatch: null,
});

const onAddMatch = () => {
  emit('onAddMatch', { score: score.value });
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
