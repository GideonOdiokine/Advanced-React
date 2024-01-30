import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";

const Navbar = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResult movies={movies} />
    </nav>
  );
};

export default Navbar;
