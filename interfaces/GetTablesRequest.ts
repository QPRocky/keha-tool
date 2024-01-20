interface SearchDetails {
  tableName: string
  column: string
}

interface GetTablesRequest {
  searchDetails: SearchDetails[]
  value: number
  getOnlyParent: boolean
}

export default GetTablesRequest;