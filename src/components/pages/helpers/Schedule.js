import ScheduleEpisode from "./ScheduleEpisode"
export default function Schedule(props) {

  const time = String(new Date(Date.now()))




  function renderEpisodes(){
    const shows = props.sched

    return shows.map((show) => <ScheduleEpisode show={show} />)
    
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