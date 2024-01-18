import { create } from 'zustand';
import DynamicDatabaseData from '../../interfaces/DynamicDatabaseData';

interface State {
  dbData: DynamicDatabaseData | undefined
  tableNames: string[]
  selectedTable: string
  columnNames: string[]
  tableData: Record<string, any>[]
  setDbData: (dbData: DynamicDatabaseData) => void
  setSelectedTable: (selectedTable: string) => void
}

const useDbDataStore = create<State>()(set => ({
  dbData: undefined,
  tableNames: [],
  selectedTable: '',
  columnNames: [],
  tableData: [],

  setDbData: (dbData: DynamicDatabaseData) => set({
    dbData,
    tableNames: Object.keys(dbData)
  }),

  setSelectedTable: (selectedTable: string) => set(state => {
    const tableData = Object.keys(state.dbData)
      .filter(s => s === selectedTable)
      .map(s => state.dbData[s])
      .flat()

    return {
      selectedTable,
      tableData,
      columnNames: Object.keys(tableData[0])
    }
  }),
}));

export default useDbDataStore;

