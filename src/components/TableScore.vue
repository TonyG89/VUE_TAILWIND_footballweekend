<template>
  <div>
    <h3>Результат:</h3>
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 200px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :statusBar="statusBar"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

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
      width: '140px',
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
  // editable: true,
  cellStyle: {
    'text-align': 'start',
  },
  gridOptions: {
    autoWidth: true,
    showTotals: 'row', // Отображаем итоги строк внизу таблицы
    rowGroupPanelShow: 'always', // Показываем панель группировки строк всегда
    enableRangeSelection: true, // Разрешаем выбор диапазона ячеек
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

const gridOptions = {
  autoWidth: true,
  showTotals: 'row', // Отображаем итоги строк внизу таблицы
  rowGroupPanelShow: 'always', // Показываем панель группировки строк всегда
  enableRangeSelection: true, // Разрешаем выбор диапазона ячеек
  pinnedBottomRowConfig: [
    {
      field: 'game',
      title: 'Всего игр:',
      type: 'int',
      aggAttrName: 'count',
    },
  ],
};

rowData.value = Object.values(props.results);

watch(
  () => props.results,
  () => (rowData.value = Object.values(props.results))
);

const props = defineProps({
  results: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
