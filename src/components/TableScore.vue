<template>
  <div>
    <h3>Результат:</h3>
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 500px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
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
    },
    {
      headerName: 'Игр',
      field: 'game',
    },
    {
      headerName: 'П',
      field: 'lose',
    },
    {
      headerName: 'Н',
      field: 'draw',
    },
    {
      headerName: 'В',
      field: 'win',
    },
    {
      headerName: 'ЗМ',
      field: 'ballsIn',
    },
    {
      headerName: 'ПМ',
      field: 'ballsOut',
    },
    {
      headerName: 'Мячи',
      field: 'balls',
    },
    {
      headerName: 'Очки',
      field: 'result',
    },
    {
      headerName: 'place',
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

console.log(
  Object.keys(props.results.without)?.map((header) => ({
    headerName: header,
    field: header,
  }))
);
// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
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
