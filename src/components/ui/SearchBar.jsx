import { useState } from "react";
import { SearchIcon } from "assets/icons/SearchIcon.jsx";

export const SearchBar = ({ className, text }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className={`relative group`}>
        <SearchIcon
          style={`absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-[#bbb] \
          group-hover:text-[#1a1a1d] duration-500`}
        />
        <input
          type="text"
          id={`search-bar`}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className={className}
          placeholder={text}
        />
      </div>
    </>
  );
};
