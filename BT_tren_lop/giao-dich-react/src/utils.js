export const formatCurrency = (value) => {
  return Number(value).toLocaleString('vi-VN')
}

export const formatDateTime = (isoString) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = `Tháng ${date.getMonth() + 1}`
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${day} ${month} ${year} ${hour}:${minute}`
}
