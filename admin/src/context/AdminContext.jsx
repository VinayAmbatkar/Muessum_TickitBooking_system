import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [Bookings, setBookings] = useState([])
    const [Museums, setMuseums] = useState([])
    const [dashData, setDashData] = useState(false)

    // Getting all Museums data from Database using API
    const getAllMuseums = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-Museums', { headers: { aToken } })
            if (data.success) {
                setMuseums(data.Museums)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change Museum availablity using API
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllMuseums()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all Booking data from Database using API
    const getAllBookings = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/Bookings', { headers: { aToken } })
            if (data.success) {
                setBookings(data.Bookings.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel Booking using API
    const cancelBooking = async (BookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-Booking', { BookingId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllBookings()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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
        aToken, setAToken,
        Museums,
        getAllMuseums,
        changeAvailability,
        Bookings,
        getAllBookings,
        getDashData,
        cancelBooking,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider