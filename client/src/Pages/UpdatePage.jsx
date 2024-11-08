import React, {useState,useEffect}from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { useParams } from 'react-router-dom';
import ShimmerPage from './ShimmerPage';

const UpdatePage = () => {
    const [adminData, setAdminData] = useState([]);
    const {id} = useParams();
    const [name,setName] = useState("Jatin Singh");
    const [email,setEmail] = useState("singh.jatin609@gmail.com");
    const [contact,setContact] = useState("9871221870");


    useEffect(()=>{
      async function adminFetch() {
        await fetch(`http://localhost:8000/api/admins?uuid=${id}`).then(res=>{
          if(res.ok) {
            res.json().then(data=>{
              setName(data.admin_data[0].Name);
              setEmail(data.admin_data[0].email);
              setContact(data.admin_data[0].contact);
            });
          }
        });
      }
      adminFetch();
    },[]);
  
    if(!adminData) {
      return <ShimmerPage/>
    }

    return (
        <div className='regis-page'>
                <form className='regisForm'>
                    <center><h1>Update Admin Data</h1></center>
                    <input type='text' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    <input type='text' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    <input type='tel' placeholder='Contact' value={contact} onChange={(e)=>{setContact(e.target.value)}} required/>
                    <Multiselect isObject={false} />
                    <button type='submit'>Register Admin</button>
                </form>
        </div>
    )
}

export default UpdatePage