const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(
  cors({
    origin: ["https://teha-portfolio1.netlify.app"], // Allow your frontend domain
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// POST route for contact form
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Configure Nodemailer with your email credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, // Sender's email
    to: "tehaabdurahman99@gmail.com", // Your email
    subject: "New Contact Form Message",
    text: `You have received a new message from the contact form!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending message:", error);
      return res.status(500).json({ message: "Error sending message", error });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Message sent successfully" });
    }
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
