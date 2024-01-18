import DynamicDatabaseData from "../../interfaces/DynamicDatabaseData";

const findDifferences = (startData: DynamicDatabaseData, endData: DynamicDatabaseData): DynamicDatabaseData => {
  const differences: DynamicDatabaseData = {};

  Object.keys(startData).forEach(key => {
    const startItemsSerialized = startData[key].map(item => JSON.stringify(item));
    const endItemsSerialized = endData[key].map(item => JSON.stringify(item));

    const uniqueItems = [...startItemsSerialized, ...endItemsSerialized].filter(item =>
      !(startItemsSerialized.includes(item) && endItemsSerialized.includes(item))
    );

    if (uniqueItems.length > 0) {
      differences[key] = [];
      uniqueItems.forEach(item => {
        differences[key].push(JSON.parse(item));
      })
    }
  });

  return differences;
};

export default findDifferences
