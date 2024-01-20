import { Input } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import useConnectionStatusStore from '../store/useConnectionStatusStore';
import SearchResult from '../../interfaces/SearchResult';
import useDbDataStore from '../store/useDbDataStore';

const SearchInput = () => {
  const connectionStatus = useConnectionStatusStore(s => s.connectionStatus)
  const [seachValue, setSeachValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setDbData = useDbDataStore((s) => s.setDbData)
  const setForeignKeyDetails = useDbDataStore((s) => s.setForeignKeyDetails)
  const setSelectedTable = useDbDataStore((s) => s.setSelectedTable)
  const selectedTable = useDbDataStore((s) => s.selectedTable)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('search', args => {
      const { foreignKeyDetails, data } = args as SearchResult

      setDbData(data)
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

      setIsLoading(false)
    });

    return () => {
      removeTrackListener();
    };
  }, [selectedTable])

  const search = useCallback((seachValue: string) => {
    if (!seachValue) return
    setIsLoading(true)
    window.ipc.send('search', seachValue)
  }, [isLoading]);

  return (
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
  )
}

export default SearchInput
