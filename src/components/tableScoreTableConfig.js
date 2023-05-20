import { reactive, ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3';

const gridApi = ref(null); // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
};


const columnDefs = [
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
]

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
}

const gridOptions = {
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
}

const statusBar = {
  statusPanels: [
    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
    // { statusPanel: totalSumCol3 , align: "right"},
    { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
    { statusPanel: 'agAggregationComponent' },
  ],
};

export {
  columnDefs, defaultColDef, statusBar,
  onGridReady, 
  gridOptions
}