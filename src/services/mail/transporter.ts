import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT as unknown as number,
	secure: (process.env.MAIL_SECURE as string == "true" ? true : false) as boolean,
	auth: {
	  user: process.env.MAIL_USERNAME,
	  pass: process.env.MAIL_PASSWORD
	}
});

export { transporter };