import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";

const matchesSearchTerm = (row: Record<string, any>, searchTerm: string): boolean => {
  for (const column in row) {
    //search by column
    if (column.toString().toLowerCase().includes(searchTerm)) {
      return true;
    }

    //search by value
    const value = row[column];
    if (value?.toString().toLowerCase().includes(searchTerm)) {
      return true;
    }
  }
  return false;
}

const doSearch = async (searchTerm: string, allTablesData: DynamicDatabaseData): Promise<DynamicDatabaseData> => {
  try {
    searchTerm = searchTerm.toLowerCase();

    return Object.keys(allTablesData).reduce((result, tableName) => {
      let tableFound = false

      //search by table
      if (tableName.toString().toLowerCase().includes(searchTerm)) {
        result[tableName] = allTablesData[tableName];
        tableFound = true
      }

      //search by column or value
      if (!tableFound) {
        const filteredRows = allTablesData[tableName].filter(row => matchesSearchTerm(row, searchTerm));
        if (filteredRows.length > 0) {
          result[tableName] = filteredRows;
        }
      }
      return result;
    }, {});
  } catch (error) {
    console.error('Error in doSearch:', error);
    throw error;
  }
}

export default doSearch
