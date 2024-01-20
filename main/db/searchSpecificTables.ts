import GetTablesRequest from "../../interfaces/GetTablesRequest";
import { getDb } from "./db";
import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";

const searchSpecificTables = async (req: GetTablesRequest): Promise<DynamicDatabaseData> => {
  try {
    const db = getDb();

    const dataPromises = req.searchDetails.map(s =>
      db(s.tableName)
        .select('*')
        .where(s.column, req.value)
        .then(data => ({
          tableName: s.tableName,
          data
        }))
    );

    const results = await Promise.all(dataPromises);

    return results.reduce((allTablesData, { tableName, data }) => {
      if (data.length > 0) {
        allTablesData[tableName] = data;
      }
      return allTablesData;
    }, {});

  } catch (error) {
    console.error('Error in searchSpecificTables:', error);
    throw error;
  }
}

export default searchSpecificTables