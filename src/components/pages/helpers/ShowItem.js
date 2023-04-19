import { Link } from "react-router-dom";


// function PrivateRoute(props) {
//   const role = "admin"

//   if  (props.roles.includes(role)) {
//     return <Route {...props.routeProps} />
//   } else {
//     return null
//   }
// }

export default function ShowItem(props) {
  const episode = props.show
  const show = props.show.show

  return (
    <div className="show-item">
      <div className="banner-img-wrapper">
        <Link to={`/products/${props.key}`}>
          <img
            src={show.image.original}
            height={150}
            alt="Episode main banner"
          />
        </Link>
      </div>

      <h5>
        {episode.name} | S{episode.season}E{episode.number} - {show.name}
      </h5>

      {/* <p>{props.show.summary}</p> */}
    </div>
  );
}
