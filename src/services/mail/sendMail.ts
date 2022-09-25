import { transporter } from "./transporter";

// Instacing the send mail function.
async function sendMail(target : string, subject : string, text : string, html : string) {
	
	// Sending the e-mail.
	const info = await transporter.sendMail({
		from: `"${process.env.DEFAULT_EMAIL_SENDER_NAME}" <${process.env.DEFAULT_EMAIL_SENDER}>`,
		to: target,
		subject: subject,
		text: text,
		html: html,
	});

	// Returning the e-mail response content.
	return info;

}

// Exporting the send mail function.
export { sendMail };