import { create } from 'zustand';
import DynamicDatabaseData from '../../interfaces/DynamicDatabaseData';
import ForeignKeyDetails from '../../interfaces/ForeignKeyDetails';

interface State {
  dbData: DynamicDatabaseData | undefined
  tableNames: string[]
  selectedTable: string
  columnNames: string[]
  tableData: Record<string, any>[]
  foreignKeyDetails: ForeignKeyDetails[]
  parentKeysBySelectedTable: ForeignKeyDetails[]
  referenceKeysBySelectedTable: ForeignKeyDetails[]
  setDbData: (dbData: DynamicDatabaseData) => void
  setForeignKeyDetails: (foreignKeyDetails: ForeignKeyDetails[]) => void
  setSelectedTable: (selectedTable: string, useCurrentTable?: boolean) => void
}

const useDbDataStore = create<State>()(set => ({
  dbData: undefined,
  tableNames: [],
  selectedTable: '',
  columnNames: [],
  tableData: [],
  foreignKeyDetails: [],
  parentKeysBySelectedTable: [],
  referenceKeysBySelectedTable: [],

  setDbData: (dbData: DynamicDatabaseData) => set({
    dbData,
    tableNames: Object.keys(dbData)
  }),

  setForeignKeyDetails: (foreignKeyDetails: ForeignKeyDetails[]) => set({
    foreignKeyDetails
  }),

  setSelectedTable: (selectedTable: string, useCurrentTable?: boolean) => set(state => {
    const tableData = Object.keys(state.dbData)
      .filter(s => s === selectedTable)
      .map(s => state.dbData[s])
      .flat()

    if (useCurrentTable && state.selectedTable) {
      const current = state.selectedTable
      console.log(current);
    }

    const parentKeysBySelectedTable = state.foreignKeyDetails
      .filter(f => f.parentTableName === selectedTable)

    const referenceKeysBySelectedTable = state.foreignKeyDetails
      .filter(f => f.referenceTableName === selectedTable)

    return {
      selectedTable,
      tableData,
      columnNames: Object.keys(tableData[0]),
      parentKeysBySelectedTable,
      referenceKeysBySelectedTable
    }
  }),

}));

export default useDbDataStore;

