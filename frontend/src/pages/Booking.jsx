import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedMuseums from '../components/RelatedMuseums'
import axios from 'axios'
import { toast } from 'react-toastify'

const Booking = () => {

    const { docId } = useParams()
    const { Museums, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [numCandidates, setNumCandidates] = useState(1) // New state to track number of candidates
    const [totalFees, setTotalFees] = useState(0) // New state to track total fees

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = Museums.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
        if (docInfo) {
            setTotalFees(docInfo.fees) // Initialize total fees
        }
    }

    const getAvailableSolts = async () => {
        setDocSlots([])

        let today = new Date()
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const handleNumCandidatesChange = (e) => {
        const candidates = parseInt(e.target.value)
        setNumCandidates(candidates)

        // Recalculate total fees based on the number of candidates
        if (docInfo && docInfo.fees) {
            setTotalFees(docInfo.fees * candidates)
        }
    }

    const bookBooking = async () => {
        if (!token) {
            toast.warning('Login to book Ticket')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-Booking', {
                docId,
                slotDate,
                slotTime,
                numCandidates, // Pass number of candidates
                totalFees // Pass the calculated total fees
            }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-Bookings')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (Museums.length > 0) {
            fetchDocInfo()
        }
    }, [Museums, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>Booking fee: <span className='text-gray-800'>{currencySymbol}{totalFees}</span> </p>
                    <div className='mt-4'>
                        <label htmlFor="candidates" className='text-gray-700'>Number of candidates:</label>
                        <input id="candidates" type="number" value={numCandidates} onChange={handleNumCandidatesChange} min="1" className='border border-gray-300 rounded-md p-2 ml-2' />
                    </div>
                </div>
            </div>

            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <button onClick={() => setSlotTime(item.time)} key={index} className={`text-center px-5 py-3 rounded-full border ${slotTime === item.time ? 'bg-primary text-white' : 'border-[#DDDDDD]'}`}>
                            {item.time}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex justify-center sm:justify-start gap-6 sm:ml-72 sm:pl-4 mt-10'>
                <button onClick={bookBooking} className='bg-primary text-white px-20 py-3 rounded-full font-medium'>
                    Book Slot
                </button>
            </div>

            <RelatedMuseums />
        </div>
    ) : null
}

export default Booking
