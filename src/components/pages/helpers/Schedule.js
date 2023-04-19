import { useState, useEffect } from 'react'

import ScheduleEpisode from "./ScheduleEpisode"
import ScheduleNetwork from "./ScheduleNetwork"

export default function Schedule(props) {

  const [networks, setNetworks] = useState({})
  const time = String(new Date(Date.now()))
  const shows = props.sched

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

      workingNetworks[networkName].push(show);
    });

    setNetworks(workingNetworks);
    // console.log(workingNetworks);
  }, [shows]);


  function renderEpisodes(){

    // return shows.map((show) => <ScheduleEpisode show={show} />)
  }

  function renderNetworks(){
    
    return (
      
      Object.keys(networks).map((n) => {

        if (n) {
          return <ScheduleNetwork shows={networks[n]} name={n} key={n}/>
        }

      }
      )

    )
  }



  return (

    <div className="schedule">
      {renderNetworks()}
    </div>
  )
}