import express from 'express';
import { loginAdmin, BookingsAdmin, BookingCancel, addMuseum, allMuseums, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/MuseumController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-Museum", authAdmin, upload.single('image'), addMuseum)
adminRouter.get("/Bookings", authAdmin, BookingsAdmin)
adminRouter.post("/cancel-Booking", authAdmin, BookingCancel)
adminRouter.get("/all-Museums", authAdmin, allMuseums)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;