require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Twilio Credentials (from .env file)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

// API Route to Send OTP
app.post('/send-otp', async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const message = await client.messages.create({
            body: `Your OTP Code is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        res.json({ success: true, messageSid: message.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
