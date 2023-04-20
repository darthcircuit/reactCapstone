import { useEffect, useState } from "react"

export default function Shows() {
  
  const [loaded, setLoaded] = useState(false)
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(0)

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
      return (
        <div className="show-wrapper">
          <img src={s.image.medium}
          alt={s.name}/>
        </div>
      )
    });
  }
 
  return(

    <>
    {loaded? <button onClick={handleClick}>Refresh Schedule</button> : <p>Loading</p>}
    {shows? renderShows(): 'Loading Shows'}

    </>
  )
}
{/* <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(shows))}`}
  download="shows.json"
  >
  {`Download Json`}
  </a> */}