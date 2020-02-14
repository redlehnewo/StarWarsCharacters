import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

const SearchBox = props => {
  const { value = "", delay = 200, searchChanged = () => {} } = props;

  const [searchText, setSearchText] = useState(value);
  const debouncedSearchTerm = useDebounce(searchText, delay);

  useEffect(() => {
    searchChanged(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchChanged]);

  return (
    <div className="form-group">
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        placeholder="Search..."
        value={searchText}
        onChange={event => {
          setSearchText(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
