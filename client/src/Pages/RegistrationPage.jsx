import React from 'react'

const RegistrationPage = () => {
  return (
    <div className='regis-page'>
        <form className='regisForm'>
            <center><h1>Register Admin</h1></center>
            <input type='text' placeholder='Name' required/>
            <input type='text' placeholder='Email' required/>
            <input type='tel' placeholder='Contact' required/>
            <button type='submit'>Register Admin</button>
        </form>
    </div>
  )
}

export default RegistrationPage