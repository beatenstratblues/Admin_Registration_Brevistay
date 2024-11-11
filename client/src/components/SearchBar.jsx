import React from "react";

const SearchBar = ({ queryFunction, byName, byEmail, byTele }) => {
  return (
    <div className="searchBar" style={{ marginBottom: 15 }}>
      <input
        type="text"
        placeholder="Search Admin"
        style={{ width: 500 }}
        value={queryFunction.searchQuery}
        onChange={(e) => {
          queryFunction.setSearchQuery(e.target.value);
        }}
      />
      &nbsp; &nbsp;
      <div
        className="EditButton"
        onClick={() => {
          byName.setByName(true);
        }}
      >
        Name
      </div>
      &nbsp; &nbsp;
      <div
        className="EditButton"
        onClick={() => {
          byEmail.setByEmail(true);
        }}
      >
        Email
      </div>
      &nbsp; &nbsp;
      <div
        className="EditButton"
        onClick={() => {
          byTele.setByTele(true);
        }}
      >
        Tele
      </div>
    </div>
  );
};

export default SearchBar;
