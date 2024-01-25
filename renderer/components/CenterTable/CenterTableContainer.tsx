import { Table, Thead, Tbody, Tr, Th, TableContainer, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import JsonModal from "../JsonModal";
import useDbDataStore from "../../store/useDbDataStore";
import DynamicDatabaseData from "../../../interfaces/DynamicDatabaseData";
import CenterTd from "./CenterTd";

const CenterTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const columnNames = useDbDataStore(s => s.columnNames)
  const tableData = useDbDataStore(s => s.tableData)
  const setDbData = useDbDataStore((s) => s.setDbData)
  const setSelectedTable = useDbDataStore(s => s.setSelectedTable)
  const toast = useToast()

  useEffect(() => {
    const removeTrackListener = window.ipc.on('getTables', (args: DynamicDatabaseData) => {

      if (Object.keys(args).length > 0) {
        setDbData(args)
        setSelectedTable(Object.keys(args)[0])
      } else {
        toast({
          title: "No foreign objects found",
          description: "No foreign objects found",
          status: "error",
          duration: 3000,
          isClosable: true
        })
      }
    });

    return () => {
      removeTrackListener();
    };
  }, [])

  return (
    <>
      <TableContainer overflowY="auto">
        <Table>
          <Thead position="sticky" top={0} zIndex="docked">
            <Tr>
              {columnNames.map((column) => {
                return (
                  <Th
                    key={column}
                  >
                    {column}
                  </Th>
                )
              })}
            </Tr>
          </Thead>

          <Tbody>
            {tableData.map((row, index) => {
              return (
                <Tr key={index}>
                  {columnNames.map((column, index) => {
                    let value = row[column];

                    return (
                      <CenterTd
                        key={index}
                        column={column}
                        value={value}
                        onOpen={onOpen}
                      />
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer >

      <JsonModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}


export default CenterTable;