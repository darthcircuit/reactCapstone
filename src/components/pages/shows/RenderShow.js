import { Link } from "react-router-dom"

import unk from "../../../images/unknown.png"

export default function RenderShow(props) {
  const show = props.show
      if (show) {
              return (
        <div className="show-wrapper">
            <Link to={`/shows/${props.show.id}`} >

          <div className="image-wrapper">

              <img src={show.image? show.image.medium : unk} alt={show.name}/>

          </div>

          <div className="title-wrapper">
            {show.name}

            <div className="ratings-container">

              <div className="ratings-wrapper" style={{width: props.rating + '%'}}> 
              
                <span className="stars">
                      <div className="star">★</div>
                      <div className="star">★</div>
                      <div className="star">★</div>
                      <div className="star">★</div>
                      <div className="star">★</div>
                </span>
              
              </div>
            </div>

          </div>
            </Link>
        </div>
      )}
    }
