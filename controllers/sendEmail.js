import nodemailer from 'nodemailer'
import {MailgunTransport} from 'mailgun-nodemailer-transport'

// we are using Mailgun to send the email from the contact form
async function sendEmail(req, res, next) {
	const {formName, formEmail, formMessage} = req.body

	let transporter = await nodemailer.createTransport(new MailgunTransport({
		auth: {
	      domain: process.env.MAILGUN_DOMAIN,
	      apiKey: process.env.MAILGUN_API_KEY
    }
	}));
	function validateEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return re.test(email)
	}
	// checks for correct formatting
	if (formName === `` 
		|| formEmail === `` 
		|| formMessage === ``
		|| formMessage === `Your message`
	) {
		console.log(`Error: Please, fill out all the fields`)
		// res.status(400).json({msg: `Please, fill out all the fields`})
		res.redirect(`/contact-empty`)
		return
	}
	if (!validateEmail(formEmail)) {
		console.log(`Error: Invalid email`)
		// res.status(400).json({msg: `Invalid email`})
		res.redirect(`/contact-email-error`)
		return
	}
	//

	await transporter.sendMail({
		from: `email@example.com`,
		to: process.env.OWN_EMAIL,
		subject: `Contacto de mi website de diseño`,
		html: `
		<h3>Llegó un mensaje de ${formName}<br>
		Su mail es ${formEmail}.</h3>

		<h2>Mensaje:</h2>
		<h3>${formMessage}</h3>
		`
	}).then((info) => {
		console.log(`SUCCESS`)
		next()
	}).catch((err) => {
		console.log(`Something went wrong`, err)
		res.status(404).json({msg: `Something went wrong`})
	})
}

export default sendEmail