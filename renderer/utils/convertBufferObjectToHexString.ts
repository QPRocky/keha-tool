const convertBufferObjectToHexString = (value: any) => {
  return '0x' + value.data.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export default convertBufferObjectToHexString

