import { getDb } from "./db";
import ForeignKeyDetails from "../../interfaces/ForeignKeyDetails";

const getForeignKeyDetails = async (): Promise<ForeignKeyDetails[]> => {
  try {
    const db = getDb();

    const results = await db.raw<ForeignKeyDetails[]>(`
      SELECT 
        ts.name AS parentTableSchema,
        tp.name AS parentTable,
        cp.name AS parentColumn,
        trs.name AS referencedTableSchema,
        tr.name AS referencedTable,
        cr.name AS referencedColumn
      FROM 
        sys.foreign_keys AS fk
      INNER JOIN 
        sys.tables AS tp ON fk.parent_object_id = tp.object_id
      INNER JOIN 
        sys.schemas AS ts ON tp.schema_id = ts.schema_id
      INNER JOIN 
        sys.tables AS tr ON fk.referenced_object_id = tr.object_id
      INNER JOIN 
        sys.schemas AS trs ON tr.schema_id = trs.schema_id
      INNER JOIN 
        sys.foreign_key_columns AS fkc ON fkc.constraint_object_id = fk.object_id
      INNER JOIN 
        sys.columns AS cp ON fkc.parent_column_id = cp.column_id AND fkc.parent_object_id = cp.object_id
      INNER JOIN 
        sys.columns AS cr ON fkc.referenced_column_id = cr.column_id AND fkc.referenced_object_id = cr.object_id;
    `);

    return results;
  } catch (error) {
    console.error('Error in getForeignKeyDetails:', error);
    throw error;
  }
}

export default getForeignKeyDetails
