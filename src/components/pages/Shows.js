import { useEffect, useState } from "react"

import RenderShow from "./shows/RenderShow"

export default function Shows() {
  
  const [loaded, setLoaded] = useState(false)
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(0)
  const [genres, setGenres] = useState([])
  const [toRender, setToRender] = useState([])
  const [countries, setCountries] = useState({})
  const [topHundred, setTopHundred] =useState([])
  const [ chosenCountry, setChosenCountry ] = useState("US")

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
        // console.log(`fetching page: ${page}`)
        return r.json()
      } else {
        stopFetching()
        throw new Error('Reached last page')
      }
    })
    .then((d) => {
      
      setShows((prev) => {
        const workingShows = []
        const workingGenres = []
        d.forEach((s) => {
          const countryCode = s.network?.country ? s.network.country.code : 'TDB'
          if(countryCode === chosenCountry) {
            workingShows.push(s)
          }

          // s.genres.forEach((g)=> {
          //   if (!workingGenres.includes(g)) {
          //     workingGenres.push(g)
          //   }

          //   setGenres((prev)=> [...prev, ...workingGenres])
          // })

        })
        return [...prev, ...workingShows]
    })
  }
    )
    .then(() => setPage((p) => p+1))
    
    .catch((e) => console.error(`Program has failed successfully. No more shows to fetch ${page}:\n${e}`))
    
  }
  
  function stopFetching() {
    setLoaded(true)
    setPage(0)
    setToRender(shows.sort((arr) => arr.rating?.average ? arr.rating.average : null).reverse().slice(0,100))
    }
  
  
  function renderShows() {
    return (
      toRender.map((s) => {
        console.log(s)
        return <RenderShow key={s.id} show={s}/>
      })
    )
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