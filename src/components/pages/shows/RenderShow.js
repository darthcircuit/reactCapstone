import { Link } from "react-router-dom"

import unk from "../../../images/unknown.png"

export default function RenderShow(props) {
  const show = props.show
      if (show) {
              return (
        <div className="show-wrapper">

          <div className="image-wrapper">

            <Link to={`/shows/${props.show.id}`} >
              <img src={show.image? show.image.medium : unk} alt={show.name}/>
            </Link>

          </div>

          <div className="title-wrapper">
            {show.name}
          </div>
        </div>
      )}
    }
