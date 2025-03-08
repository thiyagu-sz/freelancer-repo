import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.HOSTINGER.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: "innovationmateTeam@innovationmate.site",
      pass: "your-new-generated-smtp-key",
    },
  });
  

const sendTestEmail = async () => {
  try {
    await transporter.sendMail({
      from: '"InnovationMate" <innovationmateTeam@innovationmate.site>',
      to: "your-email@gmail.com", // Change this to your email
      subject: "SMTP Connection Test",
      text: "Hello, this is a test email from InnovationMate!",
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

sendTestEmail();
