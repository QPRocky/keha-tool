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

interface Props {
  column: string
  value: any
}

const CenterTd = ({ column, value }: Props) => {
  const [jsonString, setJsonString] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const selectedTable = useDbDataStore(s => s.selectedTable)
  const parentKeysBySelectedTable = useDbDataStore(s => s.parentKeysBySelectedTable)
  const referenceKeysBySelectedTable = useDbDataStore(s => s.referenceKeysBySelectedTable)

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
    <Td
      _hover={{ textDecoration: isJsonString ? "underline" : undefined }}
      cursor={showPointer ? "pointer" : undefined}
      onClick={() => {
        if (isJsonString) {
          setJsonString(value)
          onOpen()
        }

        if (parentKey && value) {
          const { referenceTableName, referenceColumn } = parentKey

          const req: GetTablesRequest = {
            searchDetails: [
              {
                tableName: referenceTableName,
                column: referenceColumn
              }
            ],
            value,
            getOnlyParent: true
          }

          window.ipc.send('getTables', req)
        }

        if (referenceKeys.length > 0 && value) {
          const req: GetTablesRequest = {
            searchDetails: referenceKeys.map((referenceKey) => {
              const { parentTableName, parentColumn } = referenceKey
              return {
                tableName: parentTableName,
                column: parentColumn
              }
            }),
            value,
            getOnlyParent: false
          }

          window.ipc.send('getTables', req)
        }

      }}
      color={textColor}
      textAlign={textAlign}>
      {value === null ? "null" : value}
    </Td>
  )
}

export default CenterTd;