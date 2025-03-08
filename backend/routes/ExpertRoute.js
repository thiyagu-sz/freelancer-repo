import express from 'express';
import { loginDoctor, appointmentsDoctor, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, ExpertiseDashboard, ExpertiseProfile, updateExpertiseProfile } from '../controllers/ExpertController.js';
import authDoctor from '../middleware/authDoctor.js';
const ExpertRouter = express.Router();

ExpertRouter.post("/login", loginDoctor)
ExpertRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
ExpertRouter.get("/appointments", authDoctor, appointmentsDoctor)
ExpertRouter.get("/list", doctorList)
ExpertRouter.post("/change-availability", authDoctor, changeAvailablity)
ExpertRouter.post("/complete-appointment", authDoctor, appointmentComplete)
ExpertRouter.get("/dashboard", authDoctor, ExpertiseDashboard)
ExpertRouter.get("/profile", authDoctor, ExpertiseProfile)
ExpertRouter.post("/update-profile", authDoctor, updateExpertiseProfile)

export default ExpertRouter;