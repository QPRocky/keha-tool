import { Flex, Text, Button, useDisclosure, Box } from '@chakra-ui/react';
import Navigation from '../components/Navigation';
import { NextPage } from 'next';
import useDbConnectionsStore from '../store/useDbConnectionsStore';
import { useState } from 'react';
import ConnectionModal from '../components/ConnectionModal';
import { VscDebugStart, VscEdit, VscTrash, VscDebugDisconnect } from "react-icons/vsc";
import Connection from '../../interfaces/Connection';
import useConnectionStatusStore from '../store/useConnectionStatusStore';

const Settings: NextPage = () => {
  const connections = useDbConnectionsStore((s) => s.connections)
  const deleteConnection = useDbConnectionsStore((s) => s.deleteConnection)
  const setAsConnected = useConnectionStatusStore((s) => s.setAsConnected)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editConnectionItem, setEditConnectionItem] = useState<Connection | undefined>(undefined)
  const database = useConnectionStatusStore((s) => s.database)
  const setAsDisconnected = useConnectionStatusStore((s) => s.setAsDisconnected)

  const onEditClick = (connection: Connection) => {
    setEditConnectionItem(connection)
    onOpen()
  }

  const onCloseHandler = () => {
    setEditConnectionItem(undefined)
    onClose()
  }

  const onConnectClick = (connection: Connection) => {
    window.ipc.send('connect', connection)
    setAsConnected(connection.database)
  }

  const onDisconnectClick = () => {
    setAsDisconnected()
    window.ipc.send('disconnect', "")
  }

  return (
    <Flex h="100vh">
      <Navigation />

      <Flex flex={1} direction="column" maxW={"300px"} pl={2}>

        <Text fontSize="xs" py={3}>
          Connections
        </Text>

        <Flex direction="column" mb={3}>
          {
            connections.map((c) => (
              <Flex key={c.uid} justify="space-between" py={1}>
                <Flex align="center">
                  <Text fontSize='xs' color={database === c.database ? "#0f0" : "#fff"}>
                    {c.database}
                  </Text>
                </Flex>
                <Flex align="center">
                  <Box>
                    <VscEdit cursor="pointer" onClick={() => onEditClick(c)} />
                  </Box>
                  <Box ml={2}>
                    <VscTrash cursor="pointer" onClick={() => deleteConnection(c)} />
                  </Box>
                  {
                    database === c.database ?
                      <Box ml={2}>
                        <VscDebugDisconnect
                          cursor="pointer"
                          onClick={() => onDisconnectClick()}
                        />
                      </Box> :
                      <Box ml={2}>
                        <VscDebugStart
                          cursor="pointer"
                          onClick={() => onConnectClick(c)}
                        />
                      </Box>
                  }
                </Flex>
              </Flex>
            ))
          }
        </Flex>

        <Button onClick={onOpen}>
          Add Connection
        </Button>
      </Flex>

      <ConnectionModal
        editConnectionItem={editConnectionItem}
        isOpen={isOpen}
        onClose={onCloseHandler}
      />

    </Flex>
  );
}

export default Settings;
