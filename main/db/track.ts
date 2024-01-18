import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";
import findDifferences from "./findDifferences";
import getAllDataFromTables from "./getAllDataFromTables";
import getTableNames from "./getTableNames";

let isFirstRun = true;
let startData: DynamicDatabaseData = {};

const track = async (): Promise<DynamicDatabaseData> => {
  try {
    const tableNames = await getTableNames()
    const allTablesData = await getAllDataFromTables(tableNames)

    if (isFirstRun) {
      isFirstRun = false
      startData = { ...allTablesData }
      return {}
    } else {
      isFirstRun = true
      const differences = findDifferences(startData, allTablesData);
      startData = {}
      return differences
    }
  } catch (error) {
    console.error('Error in track:', error);
    throw error;
  }
}

export default track