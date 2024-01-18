interface ForeignKeyDetails {
  parentTableSchema: string;
  parentTable: string;
  parentColumn: string;
  referencedTableSchema: string;
  referencedTable: string;
  referencedColumn: string;
}

export default ForeignKeyDetails