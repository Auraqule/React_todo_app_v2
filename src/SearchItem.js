import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="search-label">
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        role="searchbox"
        placeholder="Enter search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
