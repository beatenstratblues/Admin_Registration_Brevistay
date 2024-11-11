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
    async function adminFetch() {
      await fetch("http://localhost:8000/api/admins?uuid=all").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAdminData(data.admin_data);
          });
        }
      });
    }
    adminFetch();
  }, []);

  useEffect(() => {
    async function searchByName() {
      await fetch(`http://localhost:8000/api/admins/search?searchType=byname&searchQuery=${searchQuery}`).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAdminData(data.admin_data);
          });
        }
      });
    }
    searchByName();
  },[byName])

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
