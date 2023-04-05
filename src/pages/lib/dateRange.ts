const today = new Date()
const dateTimeInParts = today.toISOString().split( "T" );
const dateOnly = dateTimeInParts[0]; // YYYY-MM-DD ex:"2023-04-05"
// const year = today.getFullYear().toString()
// const month = today.getMonth().toString()
// const day = today.getDate().toString()
// const d = today.toLocaleDateString()

function dateRange() {
  let date = new Date(dateOnly + "T00:00:00.00")
  let dates = [];
  for (let i = 0; i < 1439; i++) {
    const newDate = new Date(date.getTime() + 60000)
    dates.push(newDate)
    date = newDate
  }
  return dates;
}

export default dateRange;