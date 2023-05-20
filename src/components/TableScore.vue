<template>
  <div class="w-full my-5">
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 300px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :statusBar="statusBar"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
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
import { teamsData, teamNames, colorTeam } from '../consts';

const gridApi = ref(null); // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
};

const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    {
      headerName: 'Команда',
      field: 'team',
      width: '95px',
      flex: 'none',
    },
    {
      headerName: 'Результат игр',
      marryChildren: true,
      children: [
        {
          headerName: 'Игры',
          field: 'game',
        },
        {
          headerName: 'Проигрыш',
          field: 'lose',
          columnGroupShow: 'open',
        },
        {
          headerName: 'Ничья',
          field: 'draw',
          columnGroupShow: 'open',
        },
        {
          headerName: 'Выигрыш',
          field: 'win',
          columnGroupShow: 'open',
        },
      ],
    },
    {
      headerName: 'Мячи',
      marryChildren: true,
      children: [
        {
          headerName: 'Забитые',
          field: 'ballsIn',
          columnGroupShow: 'open',
        },
        {
          headerName: 'Пропущенные',
          field: 'ballsOut',
          columnGroupShow: 'open',
        },
        {
          headerName: 'Разница',
          field: 'balls',
        },
      ],
    },
    {
      headerName: 'Очки',
      field: 'result',
    },
    {
      headerName: 'Место',
      field: 'place',
      hide: true,
    },
    {
      headerName: 'color',
      field: 'color',
      hide: true,
    },
  ],
});

// console.log(
//   Object.keys(props.results.without)?.map((header) => ({
//     headerName: header,
//     field: header,
//   }))
// );

const statusBar = {
  statusPanels: [
    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
    // { statusPanel: totalSumCol3 , align: "right"},
    { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
    { statusPanel: 'agAggregationComponent' },
  ],
};

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  // filter: true,
  flex: 1,
  resizable: true,
  // width: '100px',
  autoWidth: true,
  autoSizeColumns: true,
  suppressRowDrag: true,
  // editable: true,
  cellStyle: {
    'font-size': '0.8rem',
  },

  gridOptions: {
    showTotals: 'row', // Отображаем итоги строк внизу таблицы
    rowGroupPanelShow: 'always', // Показываем панель группировки строк всегда
    enableRangeSelection: true, // Разрешаем выбор диапазона ячеек

    suppressRowDrag: true,
    pinnedBottomRowConfig: [
      {
        field: 'game',
        title: 'Всего игр:',
        type: 'int',
        aggAttrName: 'count',
      },
    ],
  },
};

const gridOptions = {};


const resultTeams = computed(() => ({
  without: {
    team: teamNames.without,
    game:
      props.results?.without.lose +
      props.results?.without.draw +
      props.results?.without.win,
      lose: props.results?.without.lose,
      draw: props.results?.without.draw,
      win: props.results?.without.win,
      ballsIn: props.results?.without.ballsIn,
      ballsOut: props.results?.without.ballsOut,
      balls: props.results?.without.ballsIn - props.results?.without.ballsOut,
      result: props.results?.without.win * 3 + props.results?.without.draw,
      place: 0,
      color: colorTeam.without,
    },
    yellow: {
      team: teamNames.yellow,
      game:
      props.results?.yellow.lose +
      props.results?.yellow.draw +
      props.results?.yellow.win,
    lose: props.results?.yellow.lose,
    draw: props.results?.yellow.draw,
    win: props.results?.yellow.win,
    ballsIn: props.results?.yellow.ballsIn,
    ballsOut: props.results?.yellow.ballsOut,
    balls: props.results?.yellow.ballsIn - props.results?.yellow.ballsOut,
    result: props.results?.yellow.win * 3 + props.results?.yellow.draw,
    place: 0,
    color: colorTeam.yellow,
  },
  red: {
    team: teamNames.red,
    game:
    props.results?.red.lose + props.results?.red.draw + props.results?.red.win,
    lose: props.results?.red.lose,
    draw: props.results?.red.draw,
    win: props.results?.red.win,
    ballsIn: props.results?.red.ballsIn,
    ballsOut: props.results?.red.ballsOut,
    balls: props.results?.red.ballsIn - props.results?.red.ballsOut,
    result: props.results?.red.win * 3 + props.results?.red.draw,
    place: 0,
    color: colorTeam.red,
  },
}));

rowData.value = Object.values(resultTeams.value);
watch(
  () => props.results,
  () => (rowData.value = Object.values(resultTeams.value))
);

const props = defineProps({
  results: {
    type: Object,
    required: true,
    default: ()=>{}
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
