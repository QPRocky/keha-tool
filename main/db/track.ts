import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";
import SearchResult from "../../interfaces/SearchResult";
import findDifferences from "./findDifferences";
import getAllDataFromTables from "./getAllDataFromTables";
import getForeignKeyDetails from "./getForeignKeyDetails";
import getTableNames from "./getTableNames";

let tempData: DynamicDatabaseData = {};

const track = async (isStart: boolean): Promise<SearchResult> => {
  try {
    const tableNames = await getTableNames()
    const foreignKeyDetails = await getForeignKeyDetails()
    const allTablesData = await getAllDataFromTables(tableNames)
    const data = isStart ? {} : findDifferences(tempData, allTablesData)
    tempData = isStart ? { ...allTablesData } : {}

    return {
      foreignKeyDetails,
      data
    }

  } catch (error) {
    console.error('Error in track:', error);
    throw error;
  }
}

export default track