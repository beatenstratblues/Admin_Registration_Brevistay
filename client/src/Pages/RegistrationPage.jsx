import React, { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import ShimmerPage from './ShimmerPage';

const RegistrationPage = () => {
  const [hotelData, setHotelData] = useState();
  const [Name,setName] = useState();
  const [email,setEmail] = useState();
  const [contact,setContact] = useState();

  const [assignProp,setAssignProp] = useState();

  async function handleRegistration(ev) {
    ev.preventDefault();
    await fetch("http://localhost:8000/api/admins", {
      method: "POST",
      body: JSON.stringify({ Name,email,contact,assignedProperties: assignProp}),
      headers: { "Content-Type": "application/json" },
    }).then((res)=>{
      console.log(res);
    })
  }

  useEffect(()=>{
    async function hotelPropertyDataFetch() {
      await fetch("http://localhost:8000/api/properties/unadmin").then((response)=>{
        if(response.ok) {
          response.json().then((data)=>{
            setHotelData(data.properties_data);
          })
        }
      });
    }
    hotelPropertyDataFetch();
  },[]);

  if(!hotelData) {
    return <ShimmerPage/>
  }

  const hotelOptions = hotelData.map(hotel => hotel.name);

  return (
    <div className='regis-page'>
        <form className='regisForm' onSubmit={handleRegistration}>
            <center><h1>Register Admin</h1></center>
            <input type='text' placeholder='Name' value={Name} onChange={(e)=>{setName(e.target.value)}}required/>
            <input type='text' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}required/>
            <input type='tel' placeholder='Contact' value={contact} onChange={(e)=>{setContact(e.target.value)}}required/>
            <Multiselect options={hotelOptions} isObject={false} onSelect={(e)=>{setAssignProp(e)}} onRemove={(e)=>{setAssignProp(e)}}/>
            <button type='submit'>Register Admin</button>
        </form>
    </div>
  )
}

export default RegistrationPage