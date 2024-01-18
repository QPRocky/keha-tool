import ConnectionType from '../../interfaces/ConnectionType';

const getPort = (connectionType: ConnectionType): string => {
  switch (connectionType) {
    case 'mssql':
      return "1433";
    case 'pg':
      return "5432";
    default:
      return "";
  }
}

export default getPort;