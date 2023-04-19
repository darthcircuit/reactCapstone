import { useState, useEffect } from 'react'

import ScheduleEpisode from "./ScheduleEpisode"

export default function Schedule(props) {

  const [networks, setNetworks] = useState({})
  const time = String(new Date(Date.now()))
  const shows = props.sched


  useEffect(() => {
    shows.map((s) => {
      try {
        console.log(s.show.network.id)
      } catch(err) {
        console.error("Missing Network ID for " + s.name + ":" + err)
        return
      }
      
      const ids = []
      setNetworks((p) => {
        const currentNetwork = s.show.network.id

        if (!ids.includes(currentNetwork)) {
          ids.push(currentNetwork)

          console.log(...p[currentNetwork].slice(0,p[currentNetwork].length))
          return {...p, [currentNetwork] : [...p[currentNetwork].slice(0,p[currentNetwork].length), s ] }

          } else {
            return {...p, [currentNetwork]: [s,]}
          }

          })
          

    //   if (!networks.includes(s.show.network.id)) {
    //     setNetworks([...networks], s.show.network.id)
    //   }
    })  
   }, [])


      
  



  function renderEpisodes(){

    // return shows.map((show) => <ScheduleEpisode show={show} />)
    console.log(networks)
  }

  function renderNetwork(){
  return(


    <div className="schedule">
      {time}

        <div className="channel-wrapper">
          {renderEpisodes()}
        </div>



    </div>

  )
}
  return (

    <>
    {/* {renderNetwork()} */}

    <div className="show">
      <p>{renderEpisodes()}</p>
    </div>
    {/* {renderEpisodes()} */}
    </>
  )
}