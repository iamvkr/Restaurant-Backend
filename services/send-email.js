import { createTransport } from 'nodemailer';
import formatDateTime from '../utils/date.js';

// Create a transporter using SMTP details
const transporter = createTransport({
    host: 'smtp.hostinger.com', // Hostinger SMTP server
    port: 465,  // You can use 465 for SSL or 587 for TLS
    secure: true,  // Use true for SSL (port 465), false for TLS (port 587)
    auth: {
        user: process.env.SMTP_EMAIL,  // Your Hostinger email
        pass: process.env.SMTP_PASSWORD,        // Your email password
    },
});

export const sendEmail = ({ to, subject, content },cb) => {
    const { type, data } = content;
    // Email options
    const mailOptions = {
        from: process.env.SMTP_EMAIL,  // Sender address
        to,
        subject,
    };
    if (type === "text") {
        mailOptions.text = data;
    }
    if (type === "html") {
        mailOptions.html = data;
    }
    
    

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // console.log('Error occurred: ' + error.message);
            cb(false)
        } else {
            // console.log('Email sent successfully: ' + info.response);
            cb(true)
        }
    });
}

export const generateEmailData = (user,restaurant,reservation)=>{
    return `Dear ${user.username},

Thank you for choosing ${restaurant.name}! We are excited to confirm your reservation details:

Reservation Details:

Date: ${formatDateTime(reservation.dateTime)}

Location: ${restaurant.location}

Number of Guests: ${reservation.guests}

We look forward to welcoming you to ${restaurant.name} for an unforgettable dining experience.

If you need to make any changes to your reservation, please feel free to contact us.

Best regards,
${restaurant.name}
${restaurant.location}
`
}

export const generateCancelEmailData = (user,restaurant,reservation)=>{
    return `Dear ${user.username},

Your reservation at ${restaurant.name} for ${formatDateTime(reservation.dateTime)} at ${formatDateTime(reservation.dateTime)} has been canceled.

If you need assistance or would like to reschedule, please don’t hesitate to reach out.

We hope to welcome you another time soon!

Best regards,
${restaurant.name}
${restaurant.location}
`
}