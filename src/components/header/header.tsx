import React from "react";
import Search from "./search";
import Tags from "./tags";

const Header = () => {
  return (
    <header className="flex flex-col justify-between items-center pt-12 space-y-4">
      <h1 className="text-2xl font-semibold">YashDex</h1>
      <Search />
      <Tags />
    </header>
  );
};

export default Header;
