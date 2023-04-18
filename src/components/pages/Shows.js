import { useEffect, useState } from "react"

import ShowItem from "./helpers/ShowItem"
import Schedule from "./helpers/Schedule"
import ScheduleEpisode from "./helpers/ScheduleEpisode"
export default function Shows() {
  
  const [loaded, setLoaded] = useState(false)
  const [sched, setSched] = useState(null)

  useEffect(() => {
    // console.log(localStorage.getItem("tv"))
    if (localStorage.getItem('tv')) {
      setLoaded(true)
      setSched(JSON.parse(localStorage.getItem('tv')))
    } else {
      fetchSchedule()
    }
  },[])

  function handleClick() {
    setLoaded(false)
    localStorage.clear()
    fetchSchedule()

    
  }


  const fetchSchedule = () => {
    fetch("https://api.tvmaze.com/schedule")
    
    .then((r) => r.json())
    .then((d) => localStorage.setItem("tv", JSON.stringify(d)))
    .then(() => setSched(JSON.parse(localStorage.getItem('tv'))))
    .catch((e) => console.error("Error Fetching Today's Schedule " +e))

  }


  function renderShows() {
    // console.log(sched)
    return sched.map((s) => {
      // console.log(s)
      return <ShowItem key={s.id} show={s}/>;
    });
  }
  // console.log(localStorage.getItem("tv"))

 
  
  return(

    <>
    <h1>Today's Lineup</h1>

    {loaded? <button onClick={handleClick}>Refresh Schedule</button> : <p>Loading</p>}

    {/* {sched? renderShows(): null} */}

    {sched? <Schedule sched={sched} /> : null}
    {/* {sched? <ScheduleEpisode /> : null} */}
    </>
  )
}
// <a
//         href={`data:text/json;charset=utf-8,${encodeURIComponent(
//           JSON.stringify(sched)
//         )}`}
//         download="sched.json"
//       >
//         {`Download Json`}
//       </a>