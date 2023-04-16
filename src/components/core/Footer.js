import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <p>Copyright 2023 - John Ipson</p>
      <NavLink activeClassName="active-link" to="/contact">Contact</NavLink>

    </div>
  );
}
