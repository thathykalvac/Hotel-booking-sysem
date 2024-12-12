const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use any email service like Gmail, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER, // Add your email address in .env
        pass: process.env.EMAIL_PASS, // Add your email password in .env
      },
    });

    const mailOptions = {
      from: `"Hotel Booking System" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;