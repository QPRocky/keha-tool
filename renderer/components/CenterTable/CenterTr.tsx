import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, ResponsiveValue, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format, set } from 'date-fns';
import isBufferObject from "../../utils/isBufferObject";
import convertBufferObjectToHexString from "../../utils/convertBufferObjectToHexString";
import isJson from "../../utils/isJson";
import JsonModal from "../JsonModal";
import useDbDataStore from "../../store/useDbDataStore";
import GetTablesRequest from "../../../interfaces/GetTablesRequest";
import SearchResult from "../../../interfaces/SearchResult";
import DynamicDatabaseData from "../../../interfaces/DynamicDatabaseData";
import CenterTd from "./CenterTd";

const CenterTr = () => {
  const [jsonString, setJsonString] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const columnNames = useDbDataStore(s => s.columnNames)
  const tableData = useDbDataStore(s => s.tableData)
  const selectedTable = useDbDataStore(s => s.selectedTable)
  const parentKeysBySelectedTable = useDbDataStore(s => s.parentKeysBySelectedTable)
  const referenceKeysBySelectedTable = useDbDataStore(s => s.referenceKeysBySelectedTable)
  const setDbData = useDbDataStore((s) => s.setDbData)
  const setSelectedTable = useDbDataStore(s => s.setSelectedTable)

  useEffect(() => {
    const removeTrackListener = window.ipc.on('getTables', (args: DynamicDatabaseData) => {
      setDbData(args)
      setSelectedTable(Object.keys(args)[0])
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
                    let textAlign: ResponsiveValue<any> = "start";

                    if (value instanceof Date) {
                      value = format(value, "dd.MM.yyyy HH:mm");
                    }

                    if (typeof value === "boolean") {
                      value = value ? "[x]" : "[ ]";
                      textAlign = "center"
                    }

                    if (isBufferObject(value)) {
                      return convertBufferObjectToHexString(value);
                    }

                    const isJsonString = isJson(value);

                    const parentKey = parentKeysBySelectedTable
                      .find(k => k.parentTableName === selectedTable && k.parentColumn === column)

                    const referenceKeys = referenceKeysBySelectedTable
                      .filter(k => k.referenceTableName === selectedTable && k.referenceColumn === column)

                    let textColor = "#fff"
                    if (parentKey) textColor = "blue.400"
                    if (referenceKeys.length > 0) textColor = "blue.400"
                    if (value === null) textColor = "gray.500"

                    let showPointer = isJsonString
                    if (parentKey) showPointer = true
                    if (referenceKeys.length > 0) showPointer = true
                    if (value === null) showPointer = false

                    return (
                      <CenterTd
                        key={index}
                        column={column}
                        value={value}
                      />
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer >
    </>
  )
}

export default CenterTr;