import React, { useContext } from 'react'
import { MuseumContext } from './context/MuseumContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddMuseum from './pages/Admin/AddMuseum';
import MuseumsList from './pages/Admin/MuseumsList';
import Login from './pages/Login';
import MuseumBookings from './pages/Museum/MuseumBookings';
import MuseumDashboard from './pages/Museum/MuseumDashboard';
import MuseumProfile from './pages/Museum/MuseumProfile';

const App = () => {

  const { dToken } = useContext(MuseumContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-Bookings' element={<AllBookings />} />
          <Route path='/add-Museum' element={<AddMuseum />} />
          <Route path='/Museum-list' element={<MuseumsList />} />
          <Route path='/Museum-dashboard' element={<MuseumDashboard />} />
          <Route path='/Museum-Bookings' element={<MuseumBookings />} />
          <Route path='/Museum-profile' element={<MuseumProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App