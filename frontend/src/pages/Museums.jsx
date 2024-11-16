import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Museums = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { Museums } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(Museums.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(Museums)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [Museums, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the Museums specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Art Museum' ? navigate('/Museums') : navigate('/Museums/Art Museum')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Art Museum' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Art Museum</p>
          <p onClick={() => speciality === 'History Muesum' ? navigate('/Museums') : navigate('/Museums/History Muesum')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'History Muesum' ? 'bg-[#E2E5FF] text-black ' : ''}`}>History Muesum</p>
          <p onClick={() => speciality === 'Science Museum' ? navigate('/Museums') : navigate('/Museums/Science Museum')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Science Museum' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Science Museum</p>
          <p onClick={() => speciality === 'Natural History Museum' ? navigate('/Museums') : navigate('/Museums/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Natural History Museum' ? 'bg-[#E2E5FF] text-black' : ''}`}>Natural History Museum</p>
          <p onClick={() => speciality === 'Cultural Museum' ? navigate('/Museums') : navigate('/Museums/Cultural Museum')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Cultural Museum' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Cultural Museum</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/Booking/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Museums