import jwt from "jsonwebtoken";
import BookingModel from "../models/BookingModel.js";
import MuseumModel from "../models/MuseumModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all Bookings list
const BookingsAdmin = async (req, res) => {
    try {

        const Bookings = await BookingModel.find({})
        res.json({ success: true, Bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for Booking cancellation
const BookingCancel = async (req, res) => {
    try {

        const { BookingId } = req.body
        await BookingModel.findByIdAndUpdate(BookingId, { cancelled: true })

        res.json({ success: true, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Museum
const addMuseum = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add Museum
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const MuseumData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newMuseum = new MuseumModel(MuseumData)
        await newMuseum.save()
        res.json({ success: true, message: 'Museum Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all Museums list for admin panel
const allMuseums = async (req, res) => {
    try {

        const Museums = await MuseumModel.find({}).select('-password')
        res.json({ success: true, Museums })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const Museums = await MuseumModel.find({})
        const users = await userModel.find({})
        const Bookings = await BookingModel.find({})

        const dashData = {
            Museums: Museums.length,
            Bookings: Bookings.length,
            patients: users.length,
            latestBookings: Bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    BookingsAdmin,
    BookingCancel,
    addMuseum,
    allMuseums,
    adminDashboard
}