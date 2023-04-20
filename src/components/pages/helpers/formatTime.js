function formatDate(year, month, day) {
  const dateObj = new Date(`${year}-${month}-${day}`)
  return (
    `${dateObj.getFullYear()}-${String(dateObj.getUTCMonth() + 1).padStart(2,'0')}-${String(dateObj.getUTCDate()).padStart(2,'0')}`
  )
}