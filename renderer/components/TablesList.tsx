import { Flex, Text } from '@chakra-ui/react'
import useDbDataStore from '../store/useDbDataStore';

const TablesList = () => {
  const selectedTable = useDbDataStore(s => s.selectedTable)
  const setSelectedTable = useDbDataStore(s => s.setSelectedTable)
  const tableNames = useDbDataStore(s => s.tableNames)

  if (tableNames.length === 0) return null

  return (
    <Flex flex="1" overflowY="auto" w="full" flexDirection="column">
      <Text py={5} fontSize="sm" px={2} as='b'>Tables</Text>
      {tableNames.map((item) => (
        <Flex
          key={item}
          bgColor={selectedTable === item ? "gray.600" : undefined}
          _hover={{ bgColor: "gray.600" }}
          cursor="pointer"
          onClick={() => setSelectedTable(item)}
        >
          <Text fontSize="xs" px={2} py={1}>
            {item}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default TablesList;
