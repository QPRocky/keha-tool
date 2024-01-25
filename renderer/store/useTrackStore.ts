import { create } from 'zustand';
import DynamicDatabaseData from '../../interfaces/DynamicDatabaseData';

interface State {
  dbData: DynamicDatabaseData | undefined
  tableNames: string[]
  setDbData: (dbData: DynamicDatabaseData) => void
  /*results: DynamicDatabaseData[]
  selectedResultId?: number
  selectedTable: string
  setResult: (result: DynamicDatabaseData) => void
  setSelectedResultId: (selectedResultId: number) => void
  setSelectedTable: (selectedTable: string) => void
  clearResults: () => void*/
}

const useTrackStore = create<State>()(set => ({
  dbData: undefined,
  tableNames: [],

  setDbData: (dbData: DynamicDatabaseData) => set({
    dbData,
    tableNames: Object.keys(dbData)
  }),
  /*results: [],
  selectedResultId: undefined,
  selectedTable: "",

  setResult: (result) => set(state => ({
    results: [...state.results, result],
    selectedResultId: state.results.length,
    selectedTable: Object.keys(result)[0],
  })),

  setSelectedResultId: (selectedResultId: number) => set(state => ({
    selectedResultId,
    selectedTable: Object.keys(state.results[selectedResultId])[0]
  })),

  setSelectedTable: (selectedTable: string) => set({
    selectedTable
  }),

  clearResults: () => set({
    results: [],
    selectedResultId: undefined
  }),*/

}));

export default useTrackStore;
