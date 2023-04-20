import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import "./styles/main.scss"
import Navbar from "./components/core/Navbar"
import Home from "./components/pages/Home"
import Contact from "./components/pages/Contact"
import About from "./components/pages/About"
import Shows from "./components/pages/Shows"
import ShowPage from "./components/pages/ShowPage"
import Footer from "./components/core/Footer"
import Lineup from './components/pages/Lineup'

export default function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />

        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/shows" component={Shows} />
          <Route exact path="/schedule" component={Lineup} />
          <Route path="/shows/:id" component={ShowPage} />
          <Route exact path="/about" component={About} />


          <Route render={(routeProps) => (
              <div className='not-found'>
                <h1>
                  404
                </h1>
                <p>
                  {routeProps.location.pathname.slice(1)} is not a valid resource
                </p>
              </div>
            )}
          />


        </Switch>


        <Footer />
      </Router>

    </div>
  );
}

