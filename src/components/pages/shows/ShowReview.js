import {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function ShowReview(props) {
  const showId = props.showId
  const [review, setReview] = useState(localStorage.getItem(`${showId}-review`))
  const up = useRef(null)
  const down = useRef(null)
  useEffect(() => {
    if (!review) {
      return
    }
    up.current.classList.remove('reviewed')
    down.current.classList.remove('reviewed')

    if (review === 'up') {
      up.current.classList.add('reviewed')
    }

    if (review === 'down') {
      down.current.classList.add('reviewed')
    }

  },[review])

  function handleClick(e) {
    e.preventDefault()
    const rev = e.currentTarget.id

    localStorage.setItem(`${showId}-review`, rev)
    setReview(rev)

  }

  return (

    <div className="review">
      <p>Did you like this show?</p>

      <div className="review-buttons">
        <div className="button-wrapper">
          <button id='down' ref={down} onClick={handleClick}>
            <FontAwesomeIcon icon="fa-solid fa-thumbs-down" />
          </button>
        </div>
        
        <div className="button-wrapper">
          <button id='up' ref={up} onClick={handleClick}>
            <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
          </button>
        </div>
      </div>

    </div>
  )
}