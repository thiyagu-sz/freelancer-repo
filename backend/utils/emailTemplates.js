export const generateEmailTemplate = (type, doctorName, slotDate, slotTime) => {
    const title = type === "confirm" ? "Appointment Confirmed" : "Appointment Canceled";
    const message =
        type === "confirm"
            ? `Your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong> has been successfully confirmed.`
            : `We regret to inform you that your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong> has been canceled.`;

    // ✅ Choose icon based on type (✔ for confirm, ❌ for cancel)
    const iconUrl = type === "confirm"
        ? "https://cdn-icons-png.flaticon.com/512/845/845646.png" // Green tick icon
        : "https://cdn-icons-png.flaticon.com/512/190/190406.png"; // Red cross icon

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <div style="text-align: center;">
                <img src="${iconUrl}" alt="${title}" width="80" />
                <h2 style="color: ${type === "confirm" ? "#28a745" : "#ff4d4d"};">${title}</h2>
            </div>
            <p>Hello,</p>
            <p>${message}</p>
            <p>If you need to reschedule, please visit our booking portal.</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://yourwebsite.com/reschedule" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reschedule Appointment</a>
            </div>
            <hr style="margin-top: 20px;">
            <p style="font-size: 12px; text-align: center; color: #888;">If you have any questions, contact us at <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a></p>
        </div>
    `;
};
