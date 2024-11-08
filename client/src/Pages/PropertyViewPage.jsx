import React from 'react'
import ShimmerPage from './ShimmerPage';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyViewElement from '../components/PropertyViewElement';

const PropertyViewPage = () => {
  const [adminPropData, setAdminPropData] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    async function adminFetch() {
      await fetch(`http://localhost:8000/api/admins?uuid=${id}`).then(res=>{
        if(res.ok) {
          res.json().then(data=>{
            setAdminPropData(data.admin_data[0].properties);
          });
        }
      });
    }
    adminFetch();
  },[]);

  if(!adminPropData) {
    return <ShimmerPage/>
  }

  console.log(adminPropData);

  return (
    <div className='propViewPage'>
      <div className='propViewCont'>
        {
          adminPropData.map((x)=>{
            return <PropertyViewElement property={x}/>
          })
        }
      </div>
    </div>
  )
}

export default PropertyViewPage