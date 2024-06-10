import React from "react";
import Search from "./search";
import Tags from "./tags";

const Header = () => {
  return (
    <header>
      <h1>YashDex</h1>
      <Search />
      <Tags />
    </header>
  );
};

export default Header;
