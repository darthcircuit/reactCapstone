import { useEffect, useState } from "react"
import Select from "react-dropdown-select"

import RenderShow from "./shows/RenderShow"
import LoadingBar from "../helpers/LoadingBar"

export default function Shows() {
  
  const [loaded, setLoaded] = useState(false);
  const [showsFetched, setShowsFetched] = useState(false);
  const [cached, setCached] = useState(false);
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);
  const [percent, setPercent] = useState(((page/275) * 100).toFixed(0));
  const [genres, setGenres] = useState([]);
  const [toRender, setToRender] = useState([]);
  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry ] = useState("WW");

  // Fetch Data
  useEffect(() => {
    if (showsFetched) {
      return
    }

    localStorage.clear()
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then((r) => {
      if (r.status === 200) {
        return r.json()
      } else {
        // setLoaded(true)
        setShowsFetched(true)
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
    if(!showsFetched || cached){
      return
    } 

    getCountriesGenres()

  }, [showsFetched, cached])

  function getCountriesGenres() {
    const workingCountries = new Set()
    const workingCountriesArray = []
    const workingGenres = new Set()
    const workingGenresArray = []

    shows.forEach(
      (s) => {
        s.genres.forEach((g)=> {
          workingGenres.add(g)
          // setGenres((p) => {
          //   p.add(g)
          //   return p
          // })

          const countryCode = s.network?.country ? s.network.country.code : 'UNK'
          const countryName = s.network?.country ? s.network.country.name : "Unknown"

          if (countryCode !== "UNK"){
            workingCountries.add(JSON.stringify({value: countryCode, label: countryName}))
          }
        })
      })
      workingGenres.forEach(g => workingGenresArray.push({value: g, label: g}))
      setGenres(workingGenresArray)

      workingCountries.forEach(c => workingCountriesArray.push(JSON.parse(c)))
      setCountries([...workingCountriesArray, {value: "WW", label: "Worldwide"}])

    setCached(true)
  }

  // Set Render to specified Country
  useEffect(() => {
    if(!cached) {
      return
    }
    const workingShows = []
    const workingIds = []
    let topShows = []
    // let show;
    shows.forEach((show) => {
      if(workingIds.includes(show.id)) {
        return
      }


      if ((show.network? show.network.country.code : null ) === chosenCountry || (chosenCountry === 'WW')) {
        workingIds.push(show.id)
        workingShows.push(show)
      } 
      
    })
    console.log(genres)

    topShows = workingShows.sort((a, b) => (a.rating.average? a.rating.average : 0) > (b.rating.average? b.rating.average : 0)).reverse().slice(0,100)

    
    
    setToRender(topShows)
    setLoaded(true)

  }
    ,[chosenCountry, cached, loaded])


  function handleClick() {
    setLoaded(false)
    setShows([])
    setToRender([])
    
  }

  
  // function stopFetching() {

  //   extractGenresIds()
  //   setToRender(shows.sort((arr) => arr.rating?.average ? arr.rating.average : null).reverse().slice(0,100))
  // }


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
        localStorage.setItem(`${s.id}`, JSON.stringify(s))
        return <RenderShow key={s.id} show={s} rating={s.rating.average? s.rating.average * 10 : 0}/>
      })
    )
  }
  
  
    return(
      <>
      {loaded?  
          <div className="filter">

            <Select 
              className="country-dropdown"
              options={Array.from(countries)} 
              closeOnSelect={true} 
              placeholder={getCountryLabel()} 
              dropdownGap={0}
              searchable={false}
              onChange={(value) => {
                setChosenCountry(value[0].value)
            }}/>

            <div className="genre-dropdown">

            <Select 
              className="genres-dropdown"
              options={genres} 
              closeOnSelect={true} 
              // placeholder={getCountryLabel()} 
              dropdownGap={0}
              searchable={false}
            //   onChange={(value) => {
            //     // setChosenCountry(value[0].value)
            // }}
            />
            </div>
                
          </div>

      : null}



{/* <button onClick={handleClick}>Apply Filter</button> */}
        

        <div className="loading">{loaded? null : <LoadingBar percent={percent} />}</div>
      <div className="shows" style={{display: 'flex', flexDirection: 'column'}}>
          {(loaded && chosenCountry)? <div>
                                        <h1>Top Shows</h1>  
                                        <p className="title-accent">{getCountryLabel()}</p>
                                      </div>
                                    :
                                      <h1>Loading</h1>}
        <div className="shows-grid">

          {loaded? renderShows(): null}
        </div>

      </div>
    </>
  )
}
