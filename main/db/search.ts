import doSearch from "./doSearch";
import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";
import getAllDataFromTables from "./getAllDataFromTables";
import getTableNames from "./getTableNames";

const search = async (searchTerm: string): Promise<DynamicDatabaseData> => {
  try {
    const tableNames = await getTableNames()
    const allTablesData = await getAllDataFromTables(tableNames)
    const searchResult = await doSearch(searchTerm, allTablesData)

    return searchResult
  } catch (error) {
    console.error('Error in search:', error);
    throw error;
  }
}

export default search