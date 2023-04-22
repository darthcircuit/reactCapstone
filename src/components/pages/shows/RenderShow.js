import unk from "../../../images/unknown.png"

export default function RenderShow(props) {
  const show = props.show
      if (show) {
              return (
        <div className="show-wrapper">
          <div className="image-wrapper">
            <img src={show.image? show.image.medium : unk} alt={show.name}/>
          </div>

          <div className="title-wrapper">
            {show.name}
          </div>

        </div>
      )}
    }
