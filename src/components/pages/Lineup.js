import { useEffect, useState } from "react"

import Schedule from "./sched/Schedule"


export default function Lineup() {

  const today = new Date().toJSON().slice(0,10)
  const [loaded, setLoaded] = useState(false)
  const [sched, setSched] = useState(null)
  const [date, setDate] = useState(today)

  useEffect(() => {
    if (localStorage.getItem('lineup')) {
      setLoaded(true)
      setSched(JSON.parse(localStorage.getItem('lineup')))
    } else {
      fetchSchedule()
    }
  },[])

  const fetchSchedule = () => {
    setDate(today)
    fetch(`https://api.tvmaze.com/schedule/?date=${date}`)
    
    .then((r) => r.json())
    .then((d) => localStorage.setItem("lineup", JSON.stringify(d)))
    .then(() => setSched(JSON.parse(localStorage.getItem('lineup'))))
    .then(() => setLoaded(true))
    .catch((e) => console.error("Error Fetching Today's Schedule " +e))

  }
  function handleClick() {
    setLoaded(false)
    localStorage.clear()
    fetchSchedule()

    
  }
  
  return(

    <>
    {/* <h1>Today's Lineup</h1> */}

    {/* {loaded? <button onClick={handleClick}>Refresh Schedule</button> : <p>Loading</p>} */}

    {/* {sched? renderShows(): null} */}

    {sched? <Schedule sched={sched} date={date}/> : null}
    {/* {sched? <ScheduleEpisode /> : null} */}
    </>
  )
}
