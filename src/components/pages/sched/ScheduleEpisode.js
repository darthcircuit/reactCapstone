export default function ScheduleEpisode(props) {
  const episode = props.show.name
  const show = props.show.show.name
  const airtime = props.show.airtime
  return (
    <div className="episode-wrapper">
      <h5>{show}</h5>
      <p>{episode}</p>
      <p>{airtime}</p>
    </div>
)

}
