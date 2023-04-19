import { useState } from "react"

import ScheduleEpisode from "./ScheduleEpisode"

export default function ScheduleNetwork(props) {
  const shows = props.shows
  const networkName = props.name

  function renderEpisodes(){
    return shows.map((show) => {

      return <ScheduleEpisode show={show} networkName={networkName} key={show.id}/>
    } )
  }

  return (
    <div className="network-wrapper" key={networkName}>

      <h6>
        {networkName}
      </h6>

        {renderEpisodes()}

    
    </div>
  )
  }