import { Button } from '@chakra-ui/react'
import { useState, useCallback, useEffect } from 'react';
import useConnectionStatusStore from '../store/useConnectionStatusStore';
import useDbDataStore from '../store/useDbDataStore';
import SearchResult from '../../interfaces/SearchResult';

const TrackButton = () => {
  const [isStart, setIsStart] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const connectionStatus = useConnectionStatusStore(s => s.connectionStatus)
  const setDbData = useDbDataStore(s => s.setDbData)
  const setForeignKeyDetails = useDbDataStore(s => s.setForeignKeyDetails)
  const setSelectedTable = useDbDataStore((s) => s.setSelectedTable)
  const selectedTable = useDbDataStore((s) => s.selectedTable)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('track', args => {
      const { foreignKeyDetails, data } = args as SearchResult

      setDbData(isStart ? {} : data)
      setForeignKeyDetails(foreignKeyDetails)

      const tables = Object.keys(data)

      if (tables.length > 0) {
        if (selectedTable) {
          if (tables.includes(selectedTable)) {
            setSelectedTable(selectedTable)
          } else {
            setSelectedTable(tables[0])
          }
        } else {
          setSelectedTable(tables[0])
        }
      }

      setIsStart(!isStart)
      setIsLoading(false)
    });

    return () => {
      removeTrackListener();
    };
  }, [isStart])

  const trackClick = useCallback(() => {
    setIsLoading(true)

    window.ipc.send('track', isStart)
  }, [isLoading]);

  return (
    <Button
      isDisabled={connectionStatus === 'disconnected'}
      w="full"
      onClick={trackClick}
      isLoading={isLoading}
    >
      {isStart ? 'Start' : 'Stop'}
    </Button>
  )
}

export default TrackButton
