import { create } from 'zustand';
import DynamicDatabaseData from '../../interfaces/DynamicDatabaseData';

interface State {
  results: DynamicDatabaseData[]
  selectedResultId?: number
  selectedTable: string
  setResult: (result: DynamicDatabaseData) => void
  setSelectedResultId: (selectedResultId: number) => void
  setSelectedTable: (selectedTable: string) => void
  clearResults: () => void
}

const useTrackStore = create<State>()(set => ({
  results: [],
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
  }),

}));

export default useTrackStore;
