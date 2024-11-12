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
          byEmail.setByEmail(false);
          byTele.setByTele(false);
        }}
      >
        Name
      </div>
      &nbsp; &nbsp;
      <div
        className="EditButton"
        onClick={() => {
          byName.setByName(false);
          byEmail.setByEmail(true);
          byTele.setByTele(false);
        }}
      >
        Email
      </div>
      &nbsp; &nbsp;
      <div
        className="EditButton"
        onClick={() => {
          byName.setByName(false);
          byEmail.setByEmail(false);
          byTele.setByTele(true);
        }}
      >
        Tele
      </div>
    </div>
  );
};

export default SearchBar;
