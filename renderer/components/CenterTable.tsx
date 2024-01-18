import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, ResponsiveValue, useDisclosure } from "@chakra-ui/react";
import { useState, memo } from "react";
import { format } from 'date-fns';
import isBufferObject from "../utils/isBufferObject";
import convertBufferObjectToHexString from "../utils/convertBufferObjectToHexString";
import isJson from "../utils/isJson";
import JsonModal from "./JsonModal";

interface Props {
  tableData: any[];
}

const CenterTable = ({ tableData }: Props) => {
  const columns = Object.keys(tableData[0])
  const [jsonString, setJsonString] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <TableContainer overflowY="auto">
        <Table>
          <Thead position="sticky" top={0} zIndex="docked">

            <Tr>
              {columns.map((column) => {
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
                  {columns.map((column, index) => {
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

                    return (
                      <Td
                        key={index}
                        _hover={{ textDecoration: isJsonString ? "underline" : undefined }}
                        cursor={isJsonString ? "pointer" : undefined}
                        onClick={() => {
                          if (isJsonString) {
                            setJsonString(value)
                            onOpen()
                          }
                        }}
                        color={value === null ? "gray.500" : "#fff"}
                        textAlign={textAlign}>
                        {value === null ? "null" : value}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {
        jsonString &&
        <JsonModal
          jsonString={jsonString}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </>
  )
}


export default memo(CenterTable);