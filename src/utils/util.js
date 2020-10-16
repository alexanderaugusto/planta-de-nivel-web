const formatNumber = (number, places=2) => {
  if (number === undefined || number === null) {
    return ""
  }

  return number.toFixed(places).toString().replace('.', ',')
}

export {
  formatNumber
}