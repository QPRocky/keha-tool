import ForeignKeyDetails from './ForeignKeyDetails';
import DynamicDatabaseData from './DynamicDatabaseData';

interface SearchResult {
  foreignKeyDetails: ForeignKeyDetails[];
  data: DynamicDatabaseData
}

export default SearchResult