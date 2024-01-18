import { getConnectionType, getDb } from "./db";

const getTableNames = async (): Promise<string[]> => {
  try {
    const db = getDb();
    const connectionType = getConnectionType()

    let tables: any[] = []

    if (connectionType === 'pg') {
      tables = await db
        .select('table_name')
        .from('information_schema.tables')
        .where('table_schema', 'public');

      return tables.map(row => row.table_name).sort();
    } else {
      tables = await db
        .select("table_schema", "table_name")
        .from("information_schema.tables")
        .where("table_type", "base table");

      return tables.map(row => row.table_schema + '.' + row.table_name).sort();
    }

  } catch (error) {
    console.error('Error in getTableNames:', error);
    throw error;
  }
}

export default getTableNames

