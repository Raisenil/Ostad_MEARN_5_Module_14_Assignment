import nodemailer from 'nodemailer';

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
	const transporter = nodemailer.createTransport({
		host: 'sandbox.smtp.mailtrap.io',
		port: 2525,
		secure: false,
		auth: {
			user: '1cf314cc595dd7',
			pass: '49b4f3b9fca93f',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const mailOptions = {
		from: 'Task Manager Dev raisulislamniloy47@gmail.com',
		to: EmailTo,
		subject: EmailSubject,
		text: EmailText,
	};

	try {
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export default EmailSend;
