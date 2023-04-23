import { useEffect, useState } from "react"
import Select from "react-dropdown-select"

import RenderShow from "./shows/RenderShow"
import LoadingBar from "../helpers/LoadingBar"

export default function Shows() {
  
  const [loaded, setLoaded] = useState(false);
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);
  const [percent, setPercent] = useState(((page/275) * 100).toFixed(0));
  const [genres, setGenres] = useState(new Set());
  const [toRender, setToRender] = useState([]);
  const [countries, setCountries] = useState([
    { 
      value: "US",
      label: "United States"
    },
    {
      value:  "GB",
      label: "Great Britain"
    },
    {
      value:  "FR",
      label: "France"
    },
    {
      value:  "JP",
      label: "Japan"
    },
    {
      value:  "DE",
      label: "Germany"
    },
    {
      value:  "RU",
      label: "Russia"
    },
  ]);
  const [ chosenCountry, setChosenCountry ] = useState("US");
  const [ showIds, setShowIds ] = useState([]);
  useEffect(() => {
    if (loaded) {
      return
    }
    fetchAllShows()
  },[loaded, shows, percent, genres])

  function handleClick() {
    setLoaded(false)
    setShows([])
    setToRender([])
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
    .then((d) => {
      const workingShows = [];
      
      setShows((prev) => {
        
        d.forEach((s) => {

          const countryCode = s.network?.country ? s.network.country.code : 'UNK'
          if(countryCode === chosenCountry) {
              workingShows.push(s)
              setGenres((p) => {
                s.genres.forEach((g)=> {
                  p.add(g)
                })
                return p
              })
          }
          
        })

        return [...prev, ...workingShows]
    })
  }
    )
    .then(() => setPage((p) => p+1))
    .then(() => {
      setPercent(((page/275) * 100).toFixed(0))
    })
    
    .catch((e) => console.error(`Program has failed successfully. No more shows to fetch ${page}:\n${e}`))
    
  }
  
  function stopFetching() {
    setLoaded(true)
    setPage(0)
    setToRender(shows.sort((arr) => arr.rating?.average ? arr.rating.average : null).reverse().slice(0,100))
    
  }

  function getCountryLabel() {
      let workingLabel;
      countries.forEach((c) => {
        if(c.value === chosenCountry) {
          workingLabel = c.label
        }
        })
        return workingLabel
  }
  
  function renderShows() {
    return (
      toRender.map((s) => {
        return <RenderShow key={s.id} show={s}/>
      })
    )
  }
  
  
    return(
      <>

      {loaded?  <div className="filter">

                  <Select 
                  options={countries} 
                  closeOnSelect={true} 
                  placeholder={getCountryLabel()} 
                  searchable={false}
                  onChange={(value) => {
                    setChosenCountry(value[0].value)
                  }}/>


                  <button onClick={handleClick}>Apply Filter</button>
                </div>: null}
        

      <div className="shows">
        <div className="loading">{loaded? null : <LoadingBar percent={percent} />}</div>
        <div className="shows-grid">
          {loaded? renderShows(): null}
        </div>

      </div>
    </>
  )
}
