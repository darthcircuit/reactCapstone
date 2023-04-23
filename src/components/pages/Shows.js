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
  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry ] = useState("DE");
  const [showIds, setShowIds ] = useState(new Set());
  const [countryCodes, setCountryCodes] = useState(new Set());
  const [countryNames, setCountryNames] = useState(new Set());

  // Fetch Data
  useEffect(() => {
    if (loaded) {
      return
    }

    fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then((r) => {
      if (r.status === 200) {
        return r.json()
      } else {
        setLoaded(true)
        setPage(0)
        throw new Error('Reached last page')
      }
    })
    .then((d) => setShows((prev) => [...prev, ...d]))
    .then(() => setPage((p) => p+1))
    .then(() => setPercent(((page/275) * 100).toFixed(0)))
    .catch((e) => console.error(`Program has failed successfully. No more shows to fetch ${page}:\n${e}`))

  },[loaded, shows, percent])

  // Extract Show ID and Genres
  useEffect(()=>{
    if(!shows.length){
      return
    }
    if (countries.length) {
      return
    }
    shows.forEach(
      (s) => {
        s.genres.forEach((g)=> {
          setGenres((p) => {
            p.add(g)
            return p
          })
          
        setShowIds((p) => {
          p.add(s.id)
          return p
        })

        setCountryCodes((p) => {
            const countryCode = s.network?.country ? s.network.country.code : 'UNK'
          p.add(countryCode)
          return p
        })
        setCountryNames((p) => {
            const countryName = s.network?.country ? s.network.country.name : "Unknown"
          p.add(countryName)
          return p
        })

      })
      })
  }, [showIds, countries, countryCodes, countryNames, genres, shows])

  // Populate Country Dropdown List
  useEffect(() => {
    if (!loaded){
      return
    }
    if (!countries.length) {
      return
    }

    const codes = Array.from(countryCodes)
    const names = Array.from(countryNames)
    for (let i in codes) {
      setCountries((prev) => {
        return [...prev, {value: codes[i], label: names[i]}]
      })
    }
  }, [countries, loaded, countryNames, countryCodes])

  // Set Render to specified Country
  useEffect(() => {
    if(toRender.length) {
      return
    }
    const workingShows = []
    shows.forEach((s) => {
      if ((s.network? s.network.country.code : null ) === chosenCountry) {
        console.log(s)
        workingShows.push(s)
      } 

     
      workingShows.sort((a) => a.rating?.average ? a.rating.average : null ).reverse().slice(0,100)
    })

    setToRender(workingShows)
  }
    ,[chosenCountry, toRender])


  function handleClick() {
    // setLoaded(false)
    setToRender([])
    
  }

  
  // function stopFetching() {

  //   extractGenresIds()
  //   setToRender(shows.sort((arr) => arr.rating?.average ? arr.rating.average : null).reverse().slice(0,100))
  // }


  function getCountryLabel() {
    
    console.log(countries)
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
        // console.log(s)
        return <RenderShow key={s.id} show={s}/>
      })
    )
  }
  
  
    return(
      <>

      {loaded?  <div className="filter">

                  <Select 
                  options={Array.from(countries)} 
                  closeOnSelect={true} 
                  placeholder={getCountryLabel()} 
                  searchable={false}
                  onChange={(value) => {
                    setChosenCountry(value[0].value)
                  }}/>


                  <button onClick={handleClick}>Apply Filter</button>
                </div>: null}
        

        <div className="loading">{loaded? null : <LoadingBar percent={percent} />}</div>
      <div className="shows" style={{display: 'flex', flexDirection: 'column'}}>
          {(loaded && chosenCountry)? <h1>Top 100 Shows in {getCountryLabel()}:</h1> : <h1>Top 100 Shows Worldwide:</h1>}
        <div className="shows-grid">

          {loaded? renderShows(): null}
        </div>

      </div>
    </>
  )
}
