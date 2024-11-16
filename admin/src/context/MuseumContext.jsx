import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const MuseumContext = createContext()

const MuseumContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [Bookings, setBookings] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // Getting Museum Booking data from Database using API
    const getBookings = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/Museum/Bookings', { headers: { dToken } })

            if (data.success) {
                setBookings(data.Bookings.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting Museum profile data from Database using API
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/Museum/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel Museum Booking using API
    const cancelBooking = async (BookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/Museum/cancel-Booking', { BookingId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getBookings()
                // after creating dashboard
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to Mark Booking completed using API
    const completeBooking = async (BookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/Museum/complete-Booking', { BookingId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getBookings()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Museum dashboard data using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/Museum/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        dToken, setDToken, backendUrl,
        Bookings,
        getBookings,
        cancelBooking,
        completeBooking,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <MuseumContext.Provider value={value}>
            {props.children}
        </MuseumContext.Provider>
    )


}

export default MuseumContextProvider