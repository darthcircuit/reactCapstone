import { Markup } from 'interweave'

import ShowReview from './ShowReview';
import unk from "../../../images/unknown-big.png"

export default function ShowPage(props) {

  const showId = props.match.params.id
  const show = JSON.parse(localStorage.getItem(`${showId}`));
  const summary = show.summary;
  const rating = show.rating?.average? show.rating.average : 0;

  return(
    <>

    <div className="hero-section" style={{backgroundImage: `url(${show.image? show.image.original : unk}`}}>

      <div className="title-wrapper">        

        <h1>{show.name}</h1>
      </div>


    <div className="showpage-ratings">

      <h2>{rating}</h2>

      </div>
    </div>

    <div className="page-content">

      <div className="info-container">
        <p><b className='bolded'>Runtime:</b> {show.runtime} Minutes</p>
        <p><b className='bolded'>Type:</b> {show.type}</p>
        <p><b className='bolded'>Language:</b> {show.language}</p>
        <p><b className='bolded'>Status:</b> {show.status}</p>
        <p><b className='bolded'>Premier Date:</b> {show.premiered}</p>
        {show.ended? <p><b className='bolded'>Ended:</b> {show.ended}</p> : null}
      </div>

      <div className="summary-container">
        <Markup content={summary} />
      </div>

      <ShowReview showId={showId} />

    </div>
    </>

  )
}