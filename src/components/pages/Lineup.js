import { useEffect, useState } from "react"

import Schedule from "./sched/Schedule"


export default function Lineup() {

  const today = new Date().toJSON().slice(0,10)
  const [sched, setSched] = useState(null)
  const [date, setDate] = useState(today)

  useEffect(() => {
    if (localStorage.getItem('lineup')) {
      setSched(JSON.parse(localStorage.getItem('lineup')))
    } else {
      setDate(today)
      fetch(`https://api.tvmaze.com/schedule/?date=${date}`)
      .then((r) => r.json())
      .then((d) => localStorage.setItem("lineup", JSON.stringify(d)))
      .then(() => setSched(JSON.parse(localStorage.getItem('lineup'))))
      .catch((e) => console.error("Error Fetching Today's Schedule " +e))
    }
  },[date,today])

  return(

    <>
    {sched? <Schedule sched={sched} date={date}/> : null}
    </>
  )
}
