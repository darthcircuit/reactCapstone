import { useEffect, useState } from "react"

import unk from "../../images/unknown.png"
export default function Shows() {
  
  const [loaded, setLoaded] = useState(false)
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(270)
  const [genres, setGenres] = useState([])
  const [toRender, setToRender] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (loaded) {
      return
    }
    fetchAllShows()
  },[loaded, shows])

  function handleClick() {
    setLoaded(false)
    fetchAllShows()
  }


  const fetchAllShows = () => {
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then((r) => {
      if (r.status === 200) {
        return r.json()
      } else {
        stopFetching()
        throw new Error('Reached last page')
      }
    })
    .then((d) => setShows((prev) => [...prev, ...d]))
    .then(() => setPage((p) => p+1))
    
    .catch((e) => console.error(`No more shows to fetch ${page}:\n${e}`))
    
  }
  
  function stopFetching() {
    setLoaded(true)
    console.log(shows)
    setPage(0)
  }


  function renderShows() {
    return shows.map((s) => {
      if (s) {
              return (
        <div className="show-wrapper">
          
          <div className="image-wrapper">
            <img src={s.image? s.image.medium : unk} alt={s.name}/>
          </div>

          <div className="title-wrapper">
            {s.name}
          </div>

        </div>
      )}
    });
  }
 
  return(
<>
    {loaded? <button onClick={handleClick}>Refresh Schedule</button> : <p>Loading</p>}

    <div className="shows">
      <div className="shows-grid">
        {loaded? renderShows(): 'Loading Shows'}
      </div>

    </div>
</>
  )
}
{/* <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(shows))}`}
  download="shows.json"
  >
  {`Download Json`}
  </a> */}