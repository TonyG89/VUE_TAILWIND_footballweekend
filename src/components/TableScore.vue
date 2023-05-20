<template>
  <div class="w-full my-5">
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 300px"
      :columnDefs="columnDefs"
      :rowData="rowData.value"
      :statusBar="statusBar"
      :defaultColDef="defaultColDef"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { teamsData, teamNames, colorTeam } from '@/consts/';
import {
  columnDefs,
  defaultColDef,
  statusBar,
  onGridReady,
  gridOptions,
} from './tableScoreTableConfig';

// const gridApi = ref(null); // Optional - for accessing Grid's API

// // Obtain API from grid's onGridReady event
// const onGridReady = (params) => {
//   gridApi.value = params.api;
// };

const buildTable = computed(() => ({
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
}));

const rowData = reactive(Object.values(buildTable));

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

// watch(
//   () => props.results,
//   () => (rowData.value = Object.values(props.results))
// );

const props = defineProps({
  results: {
    type: Object,
    required: true,
  },
});
</script>

<style>
.ag-header-row {
  color: #000;
  font-size: 1rem;
  font-weight: 600;
}
.ag-cell {
  padding: 0.1rem;
  text-align: center;
  font-weight: 600;
}
</style>
