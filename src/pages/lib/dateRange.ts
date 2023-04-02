const date = new Date()
const year = date.getFullYear().toString()
const month = date.getMonth().toString()
const day = date.getDate().toString()
const d = date.toLocaleDateString()
const dateTimeInParts = date.toISOString().split( "T" );
// const dateOnly = dateTimeInParts[ 0 ];
// const dateOnly = "2023-05-25"

function dateRange(dateOnly: string) {
  return [
  new Date(dateOnly + "T01:00:00.00"),
  new Date(dateOnly + "T01:15:00.00"),
  new Date(dateOnly + "T01:30:00.00"),
  new Date(dateOnly + "T01:45:00.00"),
  new Date(dateOnly + "T02:00:00.00"),
  new Date(dateOnly + "T02:15:00.00"),
  new Date(dateOnly + "T02:30:00.00"),
  new Date(dateOnly + "T02:45:00.00"),
  new Date(dateOnly + "T03:00:00.00"),
  new Date(dateOnly + "T03:15:00.00"),
  new Date(dateOnly + "T03:30:00.00"),
  new Date(dateOnly + "T03:45:00.00"),
  new Date(dateOnly + "T04:00:00.00"),
  new Date(dateOnly + "T04:15:00.00"),
  new Date(dateOnly + "T04:30:00.00"),
  new Date(dateOnly + "T04:45:00.00"),
  new Date(dateOnly + "T05:00:00.00"),
  new Date(dateOnly + "T06:00:00.00"),
  new Date(dateOnly + "T07:00:00.00"),
  new Date(dateOnly + "T08:00:00.00"),
  new Date(dateOnly + "T09:00:00.00"),
  new Date(dateOnly + "T10:00:00.00"),
  new Date(dateOnly + "T11:00:00.00"),
  new Date(dateOnly + "T12:00:00.00"),
  new Date(dateOnly + "T13:00:00.00"),
  new Date(dateOnly + "T14:00:00.00"),
  new Date(dateOnly + "T15:00:00.00"),
  new Date(dateOnly + "T16:00:00.00"),
  new Date(dateOnly + "T17:00:00.00"),
  new Date(dateOnly + "T18:00:00.00"),
  new Date(dateOnly + "T19:00:00.00"),
  new Date(dateOnly + "T20:00:00.00"),
  new Date(dateOnly + "T21:00:00.00"),
  new Date(dateOnly + "T22:00:00.00"),
  new Date(dateOnly + "T23:00:00.00"),
]
}

export default dateRange;