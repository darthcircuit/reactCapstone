import { Link } from "react-router-dom"

import unk from "../../../images/unknown.png"

export default function RenderShow(props) {
  const show = props.show
      if (show) {
        const rating = props.show.rating?.average? props.show.rating.average * 10 : 0 
              return (
        <div className="show-wrapper">
            <Link to={`/shows/${props.show.id}`} >

          <div className="image-wrapper">

              <img src={show.image? show.image.medium : unk} alt={show.name}/>

          </div>

          <div className="title-wrapper">
            {show.name}
          
          {/* <div className="rating-container" > */}

            {/* <div className="rating-container-fill" style={{ width: rating + '%' }}>
              <span>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </span>

              </div> */}
          {/* </div> */}
          
          </div>

            </Link>
        </div>
      )}
    }
