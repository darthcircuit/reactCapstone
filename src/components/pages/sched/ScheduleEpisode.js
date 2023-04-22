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

  // console.log(show.name)
  // return (
  //   <div className="show-item">
  //     <div className="banner-img-wrapper">
  //       <Link to={`/products/${props.id}`}>
  //         <img
  //           src={show.image.original}
  //           height={150}
  //           alt="Episode main banner"
  //         />
  //       </Link>
  //     </div>

  //     <h5>
  //       {episode.name} | S{episode.season}E{episode.number} - {show.name}
  //     </h5>

  //     {/* <p>{props.show.summary}</p> */}
  //   </div>
  // );
}
