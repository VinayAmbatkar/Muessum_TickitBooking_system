import express from 'express';
import { loginMuseum, BookingsMuseum, BookingCancel, MuseumList, changeAvailablity, BookingComplete, MuseumDashboard, MuseumProfile, updateMuseumProfile } from '../controllers/MuseumController.js';
import authMuseum from '../middleware/authMuseum.js';
const MuseumRouter = express.Router();

MuseumRouter.post("/login", loginMuseum)
MuseumRouter.post("/cancel-Booking", authMuseum, BookingCancel)
MuseumRouter.get("/Bookings", authMuseum, BookingsMuseum)
MuseumRouter.get("/list", MuseumList)
MuseumRouter.post("/change-availability", authMuseum, changeAvailablity)
MuseumRouter.post("/complete-Booking", authMuseum, BookingComplete)
MuseumRouter.get("/dashboard", authMuseum, MuseumDashboard)
MuseumRouter.get("/profile", authMuseum, MuseumProfile)
MuseumRouter.post("/update-profile", authMuseum, updateMuseumProfile)

export default MuseumRouter;