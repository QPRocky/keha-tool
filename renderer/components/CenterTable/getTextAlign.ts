import { ResponsiveValue } from "@chakra-ui/react";

const getTextAlign = (value: any) => {
  let textAlign: ResponsiveValue<any> = "start";

  if (typeof value === "boolean") {
    textAlign = "center"
  }

  return textAlign
}

export default getTextAlign