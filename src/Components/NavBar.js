import React from "react";
import "./Styles/NavBar.css";

import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			Logo
			<ul className="nav-links">
				<NavLink className="nav-link" to="/search">
					Search
				</NavLink>
				<NavLink className="nav-link" to="/">
					Home
				</NavLink>
				<NavLink className="nav-link" to="/favorites">
					Favorites
				</NavLink>
			</ul>
		</nav>
	);
};

export default NavBar;
