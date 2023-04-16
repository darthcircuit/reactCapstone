import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import "./styles/main.scss"
import Navbar from "./components/core/Navbar"
import Home from "./components/pages/Home"
import Footer from "./components/core/Footer"

export default function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />





        </Switch>


        <Footer />
      </Router>

    </div>
  );
}

