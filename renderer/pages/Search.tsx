import {
  Box,
  Flex,
  Input
} from '@chakra-ui/react'
import { NextPage } from 'next';
import { Resplit } from 'react-resplit';
import { useCallback, useEffect, useState } from 'react';
import CenterTable from '../components/CenterTable';
import TablesList from '../components/TablesList';
import Splitter from '../components/Splitter';
import MainContainer from '../components/MainContainer';
import useConnectionStatusStore from '../store/useConnectionStatusStore';
import ConnectionIndicator from '../components/ConnectionIndicator';
import SearchResult from '../../interfaces/SearchResult';
import useForeignKeyStore from '../store/useForeignKeyStore';
import useDbDataStore from '../store/useDbDataStore';

const SearchPage: NextPage = () => {
  const connectionStatus = useConnectionStatusStore(s => s.connectionStatus)
  const [seachValue, setSeachValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setForeignKeyDetails = useForeignKeyStore(s => s.setForeignKeyDetails)
  const setDbData = useDbDataStore((s) => s.setDbData)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('search', args => {
      const { foreignKeyDetails, data } = args as SearchResult

      setDbData(data)
      setForeignKeyDetails(foreignKeyDetails)
      setIsLoading(false)
    });

    return () => {
      removeTrackListener();
    };
  }, [])


  const search = useCallback((seachValue: string) => {
    if (!seachValue) return
    setIsLoading(true)
    window.ipc.send('search', seachValue)
  }, [isLoading]);

  return (
    <MainContainer>
      <Resplit.Root style={{ flex: 1 }}>

        <Resplit.Pane order={0} initialSize="0.2fr" minSize='0.2fr'>
          <Flex direction="column" h="100vh" py={2}>

            <ConnectionIndicator />

            <Box px={2}>
              <Input
                isDisabled={connectionStatus === 'disconnected'}
                w="full"
                value={seachValue}
                onChange={e => setSeachValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    if (isLoading) return
                    search(seachValue);
                  }
                }}
              />
            </Box>

            <TablesList />

          </Flex>
        </Resplit.Pane>

        <Splitter />

        <Resplit.Pane order={2} initialSize="0.8fr">
          <Flex h="100vh">
            <CenterTable />
          </Flex>
        </Resplit.Pane>

      </Resplit.Root>
    </MainContainer>
  )
}

export default SearchPage
