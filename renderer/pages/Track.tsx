import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Divider, Flex } from '@chakra-ui/react';
import { Resplit } from 'react-resplit';
import { NextPage } from 'next';
import DynamicDatabaseData from '../../interfaces/DynamicDatabaseData';
import CenterTable from '../components/CenterTable';
import TablesList from '../components/TablesList';
import Splitter from '../components/Splitter';
import MainContainer from '../components/MainContainer';
import useTrackStore from '../store/useTrackStore';
import TrackList from '../components/TrackList';
import ConnectionIndicator from '../components/ConnectionIndicator';
import useConnectionStatusStore from '../store/useConnectionStatusStore';

const TrackPage: NextPage = () => {
  const [isStart, setIsStart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const results = useTrackStore(s => s.results)
  const selectedResultId = useTrackStore(s => s.selectedResultId)
  const selectedTable = useTrackStore(s => s.selectedTable)
  const setResult = useTrackStore(s => s.setResult)
  const setSelectedResultId = useTrackStore(s => s.setSelectedResultId)
  const setSelectedTable = useTrackStore(s => s.setSelectedTable)
  const clearResults = useTrackStore(s => s.clearResults)
  const connectionStatus = useConnectionStatusStore(s => s.connectionStatus)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('track', args => {
      const data = args as DynamicDatabaseData
      setIsLoading(false)

      if (!isStart && Object.keys(data).length > 0) {
        setResult(data)
      }
    });

    return () => {
      removeTrackListener();
    };
  }, [isStart])

  const trackClick = useCallback(() => {
    setIsLoading(true)
    setIsStart(!isStart)
    window.ipc.send('track', null)
  }, [isLoading]);

  return (
    <MainContainer>
      <Resplit.Root style={{ flex: 1 }}>

        <Resplit.Pane order={0} initialSize="0.2fr" minSize='0.2fr'>
          <Flex direction="column" h="100vh" py={2}>

            <ConnectionIndicator />

            <Box px={2} mb={2}>
              <Button
                isDisabled={connectionStatus === 'disconnected'}
                w="full"
                onClick={trackClick}
                isLoading={isLoading}
              >
                {isStart ? 'Stop' : 'Start'}
              </Button>
            </Box>

            {
              results.length > 0 &&
              <>
                <Box px={2}>
                  <Button
                    w="full"
                    onClick={clearResults}
                  >
                    Clear
                  </Button>
                </Box>
                <TrackList
                  itemCount={results.length}
                  selectedId={selectedResultId}
                  setSelectedId={setSelectedResultId}
                />
              </>
            }

            {
              selectedTable && selectedResultId !== undefined &&
              <>
                <Divider pt={6} />
                <TablesList
                  items={Object.keys(results[selectedResultId])}
                  selected={selectedTable}
                  setSelected={setSelectedTable}
                />
              </>
            }

          </Flex>
        </Resplit.Pane>

        <Splitter />

        <Resplit.Pane order={2} initialSize="0.8fr">
          {
            selectedResultId != undefined &&
            <Flex h="100vh">
              <CenterTable
                tableData={results[selectedResultId][selectedTable]}
              />
            </Flex>
          }

        </Resplit.Pane>

      </Resplit.Root>
    </MainContainer>
  );
}

export default TrackPage;
