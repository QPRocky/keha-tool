import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";
import { getDb } from "./db";

const getAllDataFromTables = async (tableNames: string[]): Promise<DynamicDatabaseData> => {
  try {
    const db = getDb();

    const dataPromises = tableNames.map(tableName =>
      db(tableName).select('*').then(data => ({ tableName, data }))
    );

    const results = await Promise.all(dataPromises);

    return results.reduce((allTablesData, { tableName, data }) => {
      if (data.length > 0) {
        allTablesData[tableName] = data;
      }
      return allTablesData;
    }, {});
  } catch (error) {
    console.error('Error in getAllDataFromTables:', error);
    throw error;
  }
}

export default getAllDataFromTables
