import { format } from "date-fns";

const formatValue = (value: any) => {
  if (value instanceof Date) {
    value = format(value, "dd.MM.yyyy HH:mm");
  }

  if (typeof value === "boolean") {
    value = value ? "[x]" : "[ ]";
  }

  if (value === null) {
    value = "null";
  }

  return value
}

export default formatValue