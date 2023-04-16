import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">

      <NavLink activeClassName="active-link" exact to="/">Home</NavLink>
      <NavLink activeClassName="active-link" to="/greeting">Shows</NavLink>
      <NavLink activeClassName="active-link" to="/about">About</NavLink>


    </div>
  );
}
