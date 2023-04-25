import { Markup } from 'interweave'

export default function ShowPage(props) {

  const showId = props.match.params.id
  const show = JSON.parse(localStorage.getItem(`${showId}`));
  const summary = show.summary;
  const rating = show.rating?.average? show.rating.average : 0;

  console.log(show)

  return(
    <>

    <div className="hero-section" style={{backgroundImage: `url(${show.image.original}`}}>

      <div className="title-wrapper">        

        <h1>{show.name}</h1>
      </div>


    <div className="showpage-ratings">

      <h2>{rating}</h2>
      <div className="ratings-container">
        
      </div>
      </div>
    </div>

    <Markup content={summary} />
    </>

  )
}