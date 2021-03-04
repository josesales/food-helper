const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRIP_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'salesbass@gmail.com',
        subject: 'Thanks for joining!',
        text: `Hey ${name}. Thank you for joining. Let me know how you get along with the Food Helper App.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'salesbass@gmail.com',
        subject: 'Hope to have you back with us',
        text: `Hey ${name}. I hope to have you back with us any time soon. Please tell us how we can improve our services.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
