import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">

      <div className="link-wrapper">
      <NavLink activeClassName="active-link" exact to="/">Home</NavLink>
      </div>

      <div className="link-wrapper">
      <NavLink activeClassName="active-link" to="/shows">Shows</NavLink>
      </div>
      
      <div className="link-wrapper">
      <NavLink activeClassName="active-link" to="/schedule">Schedule</NavLink>
      </div>
      
      <div className="link-wrapper">
      <NavLink activeClassName="active-link" to="/about">About</NavLink>
      </div>
      


    </div>
  );
}
