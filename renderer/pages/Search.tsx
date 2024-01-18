import {
  Box,
  Flex,
  Input,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next';
import { Resplit } from 'react-resplit';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CenterTable from '../components/CenterTable';
import TablesList from '../components/TablesList';
import Splitter from '../components/Splitter';
import MainContainer from '../components/MainContainer';
import DynamicDatabaseData from '../../interfaces/DynamicDatabaseData';
import useConnectionStatusStore from '../store/useConnectionStatusStore';
import ConnectionIndicator from '../components/ConnectionIndicator';

const SearchPage: NextPage = () => {
  const connectionStatus = useConnectionStatusStore((s) => s.connectionStatus)
  const [searchResults, setSearchResults] = useState<DynamicDatabaseData | undefined>(undefined)
  const [seachValue, setSeachValue] = useState('')
  const [selectedTable, setSelectedTable] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('search', args => {
      setSearchResults(args as DynamicDatabaseData)
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

  const tableData = useMemo(() => {
    return selectedTable
      ? Object.keys(searchResults)
        .filter(s => s === selectedTable)
        .map(s => searchResults[s]).flat()
      : [];
  }, [selectedTable, searchResults]);

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

            {
              searchResults &&
              <TablesList
                items={Object.keys(searchResults)}
                selected={selectedTable}
                setSelected={setSelectedTable}
              />
            }
          </Flex>
        </Resplit.Pane>

        <Splitter />

        <Resplit.Pane order={2} initialSize="0.8fr">
          <Flex h="100vh">
            {
              tableData.length > 0 &&
              <CenterTable tableData={tableData} />
            }
          </Flex>
        </Resplit.Pane>

      </Resplit.Root>
    </MainContainer>
  )
}

export default SearchPage
