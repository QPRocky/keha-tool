import { Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next';
import { Resplit } from 'react-resplit';
import CenterTableContainer from '../components/CenterTable/CenterTableContainer';
import TablesList from '../components/TablesList';
import Splitter from '../components/Splitter';
import MainContainer from '../components/MainContainer';
import ConnectionIndicator from '../components/ConnectionIndicator';
import SearchInput from '../components/SearchInput';

const SearchPage: NextPage = () => {
  return (
    <MainContainer>
      <Resplit.Root style={{ flex: 1 }}>
        <Resplit.Pane order={0} initialSize="0.2fr" minSize='0.2fr'>
          <Flex direction="column" h="100vh" py={2}>
            <ConnectionIndicator />
            <Box px={2}>
              <SearchInput />
            </Box>
            <TablesList />
          </Flex>
        </Resplit.Pane>
        <Splitter />
        <Resplit.Pane order={2} initialSize="0.8fr">
          <Flex h="100vh">
            <CenterTableContainer />
          </Flex>
        </Resplit.Pane>
      </Resplit.Root>
    </MainContainer>
  )
}

export default SearchPage
