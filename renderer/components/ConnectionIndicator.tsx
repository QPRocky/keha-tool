import { Text } from '@chakra-ui/react'
import useConnectionStatusStore from '../store/useConnectionStatusStore';

const ConnectionIndicator = () => {
  const connectionStatus = useConnectionStatusStore(s => s.connectionStatus)
  const database = useConnectionStatusStore(s => s.database)

  return (
    <Text fontSize="xs" px={2} py={1} as='b' mb={3}>
      {connectionStatus === 'connected' ? 'Connected: ' + database : 'No connection'}
    </Text>
  );
};

export default ConnectionIndicator;
