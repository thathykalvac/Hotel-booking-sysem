const nodemailer = require("nodemailer");

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: "tcharan241@gmail.com", // Your email
    pass: "vqyh rkyx mhvz rqar", // Your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"Your App Name" <your-email@gmail.com>',
      to,
      subject,
      text,
      html, // HTML content for rich formatting
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;
