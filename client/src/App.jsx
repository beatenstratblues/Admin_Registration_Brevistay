import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutPage from './Pages/LayoutPage'
import RegistrationPage from './Pages/RegistrationPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LayoutPage/>}/>
      <Route path='/register' element={<RegistrationPage/>}/>
    </Routes>
  )
}

export default App
