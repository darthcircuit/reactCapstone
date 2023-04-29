import { useState, useEffect } from 'react'

import ScheduleNetwork from "./ScheduleNetwork"

export default function Schedule(props) {

  const [networks, setNetworks] = useState({})
  const shows = props.sched
  const date = props.date

  useEffect(() => {
    if (!shows) {
      return;
    }

    const workingNetworks = {};

    shows.forEach(show => {
      const networkName = show.show.network?.name ? show.show.network.name : 'TDB';

      if (!workingNetworks[networkName]) {
        workingNetworks[networkName] = [];
      }

      workingNetworks[networkName].push(show)
      workingNetworks[networkName].sort((arr) => arr.airtime)
    });

    setNetworks(workingNetworks);
  }, [shows]);

  function renderNetworks(){
    return (
      Object.keys(networks).sort().map((n) => {
        if (n) {
          return <ScheduleNetwork shows={networks[n]} name={n} key={n}/>
        }
      })
    )
  }

  return (

    <div className="schedule">
      <h1 className="date">
        Schedule for {date}
      </h1>
      {renderNetworks()}
    </div>
  )
}