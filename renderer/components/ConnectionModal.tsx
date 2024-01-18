import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Select,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ConnectionInputWrapper from './ConnectionInputWrapper';
import useDbConnectionsStore from '../store/useDbConnectionsStore';
import { v4 as uuidv4 } from 'uuid';
import Connection from '../../interfaces/Connection';
import ConnectionType from '../../interfaces/ConnectionType';
import getPort from '../utils/getPort';

interface Props {
  editConnectionItem?: Connection
  isOpen: boolean
  onClose: () => void
}

const ConnectionModal = ({ editConnectionItem, isOpen, onClose }: Props) => {
  const saveConnection = useDbConnectionsStore((s) => s.saveConnection)
  const [connectionType, setConnectionType] = useState<ConnectionType>('mssql')
  const [server, setServer] = useState("")
  const [port, setPort] = useState(getPort("mssql"))
  const [database, setDatabase] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('testConnection', args => {
      const error = args as string

      toast({
        title: error === "" ? "Connection Successful" : "Connection Failed",
        description: error,
        status: error === "" ? "success" : "error",
        duration: 10000,
        isClosable: true
      })

      setIsLoading(false)
    });

    return () => {
      removeTrackListener();
    };
  }, [])

  useEffect(() => {
    if (editConnectionItem) {
      setConnectionType(editConnectionItem.connectionType)
      setServer(editConnectionItem.server)
      setPort(editConnectionItem.port.toString())
      setDatabase(editConnectionItem.database)
      setUser(editConnectionItem.user)
      setPassword(editConnectionItem.password)
    }
  }, [editConnectionItem])

  const saveConnectionClick = () => {
    saveConnection({
      uid: editConnectionItem?.uid ?? uuidv4(),
      connectionType,
      server,
      port: parseInt(port),
      database,
      user,
      password
    })

    onCloseHandler()
  }

  const onCloseHandler = () => {
    setConnectionType('mssql')
    setServer("")
    setPort(getPort("mssql"))
    setDatabase("")
    setUser("")
    setPassword("")

    onClose()
  }

  const isButtonsDisabled = () => {
    return server === '' || database === '' || user === '' || password === '';
  };

  const testConnection = () => {
    setIsLoading(true)

    const connection = {
      uid: editConnectionItem?.uid ?? uuidv4(),
      connectionType,
      server,
      port: parseInt(port),
      database,
      user,
      password
    }

    window.ipc.send('testConnection', connection)
  }

  const options: { value: ConnectionType; label: string }[] = [
    { value: 'mssql', label: 'Microsoft SQL Server' },
    { value: 'pg', label: 'PostgreSQL' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} size={"lg"} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editConnectionItem ? 'Edit connection' : 'Add connection'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <ConnectionInputWrapper label={"Connection type"}>
            <Select
              value={connectionType}
              onChange={e => {
                const connectionType = e.target.value as ConnectionType
                setConnectionType(connectionType)
                setPort(getPort(connectionType))
              }}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </ConnectionInputWrapper>

          <ConnectionInputWrapper label={"Server name"}>
            <Input
              value={server}
              onChange={(e) => setServer(e.target.value)}
            />
          </ConnectionInputWrapper>

          <ConnectionInputWrapper label={"Port"}>
            <Input
              value={port}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPort(value);
                }
              }}
            />
          </ConnectionInputWrapper>

          <ConnectionInputWrapper label={"Database name"}>
            <Input
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
            />
          </ConnectionInputWrapper>

          <ConnectionInputWrapper label={"User name"}>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </ConnectionInputWrapper>

          <ConnectionInputWrapper label={"Password"}>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ConnectionInputWrapper>

        </ModalBody>

        <ModalFooter>
          <Flex justify="space-between" flex={1}>
            <Button
              isLoading={isLoading}
              isDisabled={isButtonsDisabled()}
              variant='outline'
              onClick={testConnection}
            >
              Test connection
            </Button>
            <Button
              isDisabled={isButtonsDisabled()}
              variant='outline'
              onClick={saveConnectionClick}
            >
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConnectionModal;
