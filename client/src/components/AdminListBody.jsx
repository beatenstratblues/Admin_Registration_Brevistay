import React, { useEffect, useState } from "react";
import ListElement from "./ListElement";
import SearchBar from "./SearchBar";
import ShimmerPage from "../Pages/ShimmerPage";

const AdminListBody = () => {
  const [adminData, setAdminData] = useState([]);

  useEffect(()=>{
    async function adminFetch() {
      await fetch("http://localhost:8000/api/admins").then(res=>{
        if(res.ok) {
          res.json().then(data=>{
            setAdminData(data.admin_data);
          });
        }
      });
    }
    adminFetch();
  },[]);


  if(!adminData) {
    return <ShimmerPage/>
  }


  return <div className="mainContent">
    <SearchBar/>
    <div>
      {
        adminData.map((ele)=>{
          return <ListElement elementData={ele} key={ele.uuid}/>
        })
      }
    </div>
  </div>;
};

export default AdminListBody;
