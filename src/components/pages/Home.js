export default function Home() {
  return(

    <div className="home-page">

    <div className="title-wrapper">
      <h1>Welcome!</h1>

    </div>
      <div className="page-content">
        <p>
          This site is my capstone project for the Front End Class I'm taking at&#160;
          
          <a href="https://devpipeline.com">
            DevPipeline
          </a>.
        </p>

        <p>
          I'm pulling in television information from&#160; 

          <a href="https://tvmaze.com">
            TV Maze
          </a>.
              
        </p>

        <p>
          If you go to my&#160;
          
          <a href="https://github.com/darthcircuit/reactCapstone">
            GitHub
          </a>
          , you can see the requirements for the project, but in summary, this React app allows you to view information about Televisions shows all around the world. By clicking on the "Shows" button above, you will see a selection of all the shows in TV Maze's database. I fetched info on all the shows in the database and then have my app sort the top 100 results that match the given filters. You can sort by Country and/or Genre.
        </p>     

        <p>
          Given that this is a purely Front-End app, all of the filtering and sorting takes place in the browser once the database is fetched. As such, the app takes longer to fetch the data than if I set up a backend as well.      
        </p>
      </div>
    </div>

  )
}