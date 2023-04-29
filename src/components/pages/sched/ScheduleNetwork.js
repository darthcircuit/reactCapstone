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

      <h3 className="network-name">
        {networkName}
      </h3>

        <div className="shows-wrapper">

        {renderEpisodes()}
        </div>

    
    </div>
  )
  }