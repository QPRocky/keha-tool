import doSearch from "./doSearch";
import SearchResult from "../../interfaces/SearchResult";
import getAllDataFromTables from "./getAllDataFromTables";
import getForeignKeyDetails from "./getForeignKeyDetails";
import getTableNames from "./getTableNames";

const search = async (searchTerm: string): Promise<SearchResult> => {
  try {
    const tableNames = await getTableNames()
    const foreignKeyDetails = await getForeignKeyDetails()
    const allTablesData = await getAllDataFromTables(tableNames)
    const data = await doSearch(searchTerm, allTablesData)

    return {
      foreignKeyDetails,
      data
    }
  } catch (error) {
    console.error('Error in search:', error);
    throw error;
  }
}

export default search