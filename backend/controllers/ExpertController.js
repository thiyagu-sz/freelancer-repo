import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ExpertModel from "../models/ExpertModel.js";
import appointmentModel from "../models/appointmentModel.js";


import sendEmail from '../utils/email.js';
import { generateEmailTemplate } from '../utils/emailTemplates.js';

// ✅ Appointment Completed API
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

            res.json({ success: true, message: 'Appointment Completed and Email Sent' });

            const userEmail = appointmentData.userData.email;
            const ExpertName = appointmentData.docData.name;
            const slotDate = appointmentData.slotDate;
            const slotTime = appointmentData.slotTime;

            // ✅ Use the email template
            const emailHTML = generateEmailTemplate("confirm", ExpertName, slotDate, slotTime);

            sendEmail(userEmail, "Your Appointment is Confirmed!", emailHTML)
                .then(emailResponse => console.log("✅ Email sent:", emailResponse))
                .catch(error => console.error("❌ Email sending failed:", error.message));

            return;
        }

        return res.json({ success: false, message: 'Appointment Not Found or Already Completed' });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// ✅ Appointment Canceled API
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

            res.json({ success: true, message: 'Appointment Canceled and Email Sent' });

            const userEmail = appointmentData.userData.email;
            const ExpertName = appointmentData.docData.name;
            const slotDate = appointmentData.slotDate;
            const slotTime = appointmentData.slotTime;

            // ✅ Use the email template
            const emailHTML = generateEmailTemplate("cancel", ExpertName, slotDate, slotTime);

            sendEmail(userEmail, "Your Appointment is Canceled", emailHTML)
                .then(emailResponse => console.log("✅ Email sent:", emailResponse))
                .catch(error => console.error("❌ Email sending failed:", error.message));

            return;
        }

        return res.json({ success: false, message: 'Appointment Not Found or Already Canceled' });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// ✅ API for doctor Login
const loginExpert = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await ExpertModel.findOne({ email });

        if (!user) return res.json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to get doctor appointments for doctor panel
const appointmentsExpert = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to cancel appointment for doctor panel
// const appointmentCancel = async (req, res) => {
//     try {
//         const { docId, appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if (appointmentData && appointmentData.docId === docId) {
//             await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
//             return res.json({ success: true, message: 'Appointment Cancelled' });
//         }
//         res.json({ success: false, message: 'Appointment Not Found or Already Cancelled' });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // ✅ API to mark appointment completed for doctor panel
// const appointmentComplete = async (req, res) => {
//     try {
//         const { docId, appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if (appointmentData && appointmentData.docId === docId) {
//             await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
//             return res.json({ success: true, message: 'Appointment Completed' });
//         }
//         res.json({ success: false, message: 'Appointment Not Found or Already Completed' });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// ✅ API to get all doctors list for Frontend
const expertList = async (req, res) => {
    try {
        const experts = await ExpertModel.find({}).select(['-password', '-email']);
        res.json({ success: true, experts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to change doctor availability for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await ExpertModel.findById(docId);
        await ExpertModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to get doctor profile for Doctor Panel
const ExpertiseProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await ExpertModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to update doctor profile data from Doctor Panel
const updateExpertiseProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await ExpertModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: 'Profile Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ API to get dashboard data for doctor panel
const ExpertiseDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        let patients = new Set();

        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) earnings += item.amount;
            patients.add(item.userId);
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.size,
            latestAppointments: appointments.slice(-5).reverse() // Last 5 appointments
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Export All APIs
export {
    loginExpert,
    appointmentsExpert,
    appointmentCancel,
    appointmentComplete,
    expertList,
    changeAvailablity,
    ExpertiseDashboard,
    ExpertiseProfile,
    updateExpertiseProfile
};
