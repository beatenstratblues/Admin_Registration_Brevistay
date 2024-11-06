import React, { useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';

const RegistrationPage = () => {
  const [hotelOptions, setHotelOptions] = useState(['hotel1','hotel2','hotel3','hotel4','hotel5']);
  return (
    <div className='regis-page'>
        <form className='regisForm'>
            <center><h1>Register Admin</h1></center>
            <input type='text' placeholder='Name' required/>
            <input type='text' placeholder='Email' required/>
            <input type='tel' placeholder='Contact' required/>
            <Multiselect options={hotelOptions} isObject={false}/>
            <button type='submit'>Register Admin</button>
        </form>
    </div>
  )
}

export default RegistrationPage