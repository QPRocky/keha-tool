import { Td } from "@chakra-ui/react";
import isJson from "../../utils/isJson";
import useDbDataStore from "../../store/useDbDataStore";
import GetTablesRequest from "../../../interfaces/GetTablesRequest";
import getTextColor from "./getTextColor";
import getTextAlign from "./getTextAlign";
import getCursor from "./getCursor";
import formatValue from "./formatValue";

interface Props {
  column: string
  value: any
  onOpen: () => void
}

const CenterTd = ({ column, value, onOpen }: Props) => {
  const selectedTable = useDbDataStore(s => s.selectedTable)
  const parentKeysBySelectedTable = useDbDataStore(s => s.parentKeysBySelectedTable)
  const referenceKeysBySelectedTable = useDbDataStore(s => s.referenceKeysBySelectedTable)
  const setJsonString = useDbDataStore(s => s.setJsonString)

  const parentKeyDetailsExists = parentKeysBySelectedTable
    .some(k => k.parentTableName === selectedTable && k.parentColumn === column)
  const referenceKeysDetailsExists = referenceKeysBySelectedTable
    .some(k => k.referenceTableName === selectedTable && k.referenceColumn === column)
  const isJsonString = isJson(value)

  const onClick = () => {
    if (isJsonString) {
      setJsonString(value)
      onOpen()
    }

    const parentKeyDetails = parentKeysBySelectedTable.find(k => k.parentTableName === selectedTable && k.parentColumn === column)
    const referenceKeysDetails = referenceKeysBySelectedTable.filter(k => k.referenceTableName === selectedTable && k.referenceColumn === column)

    if (parentKeyDetails && value) {
      const { referenceTableName, referenceColumn } = parentKeyDetails

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

    if (referenceKeysDetails.length > 0 && value) {
      const req: GetTablesRequest = {
        searchDetails: referenceKeysDetails.map((referenceKey) => {
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
  }

  return (
    <Td
      maxW={"300px"}
      overflow="hidden"
      cursor={getCursor(parentKeyDetailsExists, referenceKeysDetailsExists, isJsonString, value)}
      onClick={onClick}
      color={getTextColor(parentKeyDetailsExists, referenceKeysDetailsExists, value, isJsonString)}
      textAlign={getTextAlign(value)}>
      {formatValue(value)}
    </Td>
  )
}

export default CenterTd;