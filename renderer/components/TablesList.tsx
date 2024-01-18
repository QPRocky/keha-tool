import { Flex, Text } from '@chakra-ui/react'

interface Props {
  items: string[]
  selected: string
  setSelected: (text: string) => void
}

const TablesList = ({ items, selected, setSelected }: Props) => {
  return (

    <Flex flex="1" overflowY="auto" w="full" flexDirection="column">
      <Text py={5} fontSize="sm" px={2} as='b'>Tables</Text>
      {items.map((item) => (
        <Flex
          key={item}
          bgColor={selected === item ? "gray.600" : undefined}
          _hover={{ bgColor: "gray.600" }}
          cursor="pointer"
          onClick={() => setSelected(item)}
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
