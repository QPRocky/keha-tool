import { ResponsiveValue } from "@chakra-ui/react";

const getCursor = (parentKeyDetails: boolean, referenceKeysDetails: boolean, isJsonString: boolean, value: any) => {
  let cursor: ResponsiveValue<any> = undefined

  if (isJsonString) cursor = "pointer"
  if (parentKeyDetails) cursor = "pointer"
  if (referenceKeysDetails) cursor = "pointer"
  if (value === null) cursor = undefined

  return cursor
}

export default getCursor