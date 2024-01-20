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
  jsonString: string
  setDbData: (dbData: DynamicDatabaseData) => void
  setForeignKeyDetails: (foreignKeyDetails: ForeignKeyDetails[]) => void
  setSelectedTable: (selectedTable: string) => void
  setJsonString: (jsonString: string) => void
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
  jsonString: "",

  setDbData: (dbData: DynamicDatabaseData) => set({
    dbData,
    tableNames: Object.keys(dbData)
  }),

  setForeignKeyDetails: (foreignKeyDetails: ForeignKeyDetails[]) => set({
    foreignKeyDetails
  }),

  setSelectedTable: (selectedTable: string) => set(state => {
    const tableData = Object.keys(state.dbData)
      .filter(s => s === selectedTable)
      .map(s => state.dbData[s])
      .flat()

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

  setJsonString: (jsonString: string) => set({
    jsonString
  })

}));

export default useDbDataStore;

