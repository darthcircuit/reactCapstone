export default function About() {
  return(
<div className="about-page">
    <h1>About Me</h1>


<div className="page-content">

    <div className="section-wrapper">
      <h2>The Project</h2>
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

      <div className="section-wrapper">
        <h2>My Goals</h2>
        <p>I've got more than 15 years of experience in IT, and I've also discovered a love of coding. I'm hoping to combine these skills and have been exploring positions in DevOps</p>
      </div>

      <div className="section-wrapper">
        <h2>What Have I learned at DevPipeline to Date?</h2>
        <p>I've learned so much in the past year. I started off learning Python, and was able to pick it up very quickly. I started teaching that class which really helped me understand through helping others. Since then, I've spent time learning Flask, SQLAlchemy, HTML, CSS, SCSS, Vanilla JavaScript and now React.</p>
      </div>

      <div className="section-wrapper">
        <h2>Projects I have Made</h2>
        <p>
        <a href="https://github.com/darthcircuit">
              My GitHub Account
            </a>
        </p>
      </div>

      <div className="section-wrapper">
        <h2>What Is Your Favorite Language and Why?</h2>
        <p>
          My Favorite language changes depending on what I'm doing. I prefer working in Python on a day to day basis because I've worked with it the most and can easily follow the indentations. I apprecaite the strengths of JavaScript however, and I really am enjoying the power of JS combined with React.
        </p>
      </div>
    </div>
    </div>
  )
}