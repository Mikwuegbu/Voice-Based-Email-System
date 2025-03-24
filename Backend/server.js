require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Email sending route
app.post('/send-email', async (req, res) => {
	const { to, subject, text } = req.body;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL,
		to,
		subject,
		text,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.json({ success: true, message: 'Email sent successfully!' });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

app.listen(5000, () => console.log('Server running on port 5000'));
