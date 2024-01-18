import { Flex, Text } from '@chakra-ui/react'

interface Props {
  itemCount: number
  selectedId: number
  setSelectedId: (selectedId: number) => void
}

const TrackList = ({ itemCount, selectedId, setSelectedId }: Props) => {
  return (
    <Flex overflowY="auto" w="full" flexDirection="column">
      <Text py={5} fontSize="sm" px={2} as='b'>Results</Text>
      {[...Array(itemCount)].map((_, index) => (
        <Flex
          key={index}
          bgColor={selectedId === index ? "gray.600" : undefined}
          _hover={{ bgColor: "gray.600" }}
          cursor="pointer"
          onClick={() => setSelectedId(index)}
        >
          <Text fontSize="xs" px={2} py={1}>
            #{index + 1}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default TrackList;

