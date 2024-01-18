const isBufferObject = (value: any) => {
  if (typeof value === "object" && value !== null) {
    const hasType = value.hasOwnProperty('type');
    const hasData = value.hasOwnProperty('data');
    const typeIsBuffer = value.type === 'Buffer';
    const dataIsArray = Array.isArray(value.data);
    const dataIsArrayOfNumbers = dataIsArray && value.data.every(item => typeof item === 'number');

    return hasType && hasData && typeIsBuffer && dataIsArrayOfNumbers;
  }
  return false;
}

export default isBufferObject