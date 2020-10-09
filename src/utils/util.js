const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return ""
  }

  return number.toFixed(2).toString().replace('.', ',')
}

export {
  formatNumber
}