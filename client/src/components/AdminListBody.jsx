import React, { useEffect, useState } from "react";
import ListElement from "./ListElement";
import SearchBar from "./SearchBar";
import ShimmerPage from "../Pages/ShimmerPage";

const AdminListBody = () => {
  const [adminData, setAdminData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [byName, setByName] = useState(false);
  const [byEmail, setByEmail] = useState(false);
  const [byTele, setByTele] = useState(false);

  useEffect(() => {
    async function fetchAllAdmins() {
      await fetch("http://localhost:8000/api/admins?uuid=all").then((res) => {
        res.json().then((data) => setAdminData(data.admin_data));
      });
    }

    fetchAllAdmins();
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    async function searchAdmins() {
      let searchType;
      if (byName) searchType = "byName";
      else if (byEmail) searchType = "byEmail";
      else if (byTele) searchType = "byContact";

      const url = `http://localhost:8000/api/admins/search?searchType=${searchType}&searchQuery=${searchQuery}`;

      await fetch(url)
        .then((res) => res.json())
        .then((data) => setAdminData(data.admin_Data || []));
    }

    searchAdmins();
  }, [searchQuery, byName, byEmail, byTele]);

  if (!adminData) {
    return <ShimmerPage />;
  }

  return (
    <div className="mainContent">
      <SearchBar
        queryFunction={{ searchQuery, setSearchQuery }}
        byName={{ byName, setByName }}
        byEmail={{ byEmail, setByEmail }}
        byTele={{ byTele, setByTele }}
      />
      <div>
        {adminData.map((ele) => {
          return <ListElement elementData={ele} key={ele.uuid} />;
        })}
      </div>
    </div>
  );
};

export default AdminListBody;
