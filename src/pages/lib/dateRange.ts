// date is going to be 5 hours ahead of our current time (EST)
const today = new Date()
const dateTimeInParts = today.toISOString().split( "T" );
const dateOnly = dateTimeInParts[0]; // YYYY-MM-DD ex:"2023-04-05"

function dateRange() {
  console.log(today.toISOString())
  let date = new Date(dateOnly + "T00:00:00.00")
  let dates = [];
  for (let i = 0; i < 143; i++) {
    const newDate = new Date(date.getTime() + 600000)
    dates.push(newDate)
    date = newDate
  }
  return dates;
}

export default dateRange;