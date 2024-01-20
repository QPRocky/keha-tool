const getTextColor = (parentKeyDetails: boolean, referenceKeysDetails: boolean, value: any, isJsonString: boolean) => {
  let textColor = "#fff"

  if (parentKeyDetails) textColor = "blue.400"
  if (referenceKeysDetails) textColor = "blue.400"
  if (value === null) textColor = "gray.500"
  if (isJsonString) textColor = "yellow.500"

  return textColor
}

export default getTextColor