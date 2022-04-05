import React from "react";
import shovel from "../assets/shovel.png";

function Navbar({ account }) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap shadow">
      <div className="navbar-brand col-sm-3 col-md-2 mr-0">
        <img
          src={shovel}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        &nbsp; Token Farm
      </div>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <span className="text-secondary">{account}</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
