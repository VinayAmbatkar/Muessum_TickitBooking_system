import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import MuseumModel from "../models/MuseumModel.js";
import BookingModel from "../models/BookingModel.js";

// API for Museum Login 
const loginMuseum = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await MuseumModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get Museum Bookings for Museum panel
const BookingsMuseum = async (req, res) => {
    try {

        const { docId } = req.body
        const Bookings = await BookingModel.find({ docId })

        res.json({ success: true, Bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel Booking for Museum panel
const BookingCancel = async (req, res) => {
    try {

        const { docId, BookingId } = req.body

        const BookingData = await BookingModel.findById(BookingId)
        if (BookingData && BookingData.docId === docId) {
            await BookingModel.findByIdAndUpdate(BookingId, { cancelled: true })
            return res.json({ success: true, message: 'Booking Cancelled' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark Booking completed for Museum panel
const BookingComplete = async (req, res) => {
    try {

        const { docId, BookingId } = req.body

        const BookingData = await BookingModel.findById(BookingId)
        if (BookingData && BookingData.docId === docId) {
            await BookingModel.findByIdAndUpdate(BookingId, { isCompleted: true })
            return res.json({ success: true, message: 'Booking Completed' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all Museums list for Frontend
const MuseumList = async (req, res) => {
    try {

        const Museums = await MuseumModel.find({}).select(['-password', '-email'])
        res.json({ success: true, Museums })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change Museum availablity for Admin and Museum Panel
const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await MuseumModel.findById(docId)
        await MuseumModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get Museum profile for  Museum Panel
const MuseumProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await MuseumModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update Museum profile data from  Museum Panel
const updateMuseumProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await MuseumModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for Museum panel
const MuseumDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const Bookings = await BookingModel.find({ docId })

        let earnings = 0

        Bookings.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        Bookings.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            Bookings: Bookings.length,
            patients: patients.length,
            latestBookings: Bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginMuseum,
    BookingsMuseum,
    BookingCancel,
    MuseumList,
    changeAvailablity,
    BookingComplete,
    MuseumDashboard,
    MuseumProfile,
    updateMuseumProfile
}