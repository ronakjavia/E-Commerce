import config from "../config/index.js"
import transporter from "../config/transporter_config.js"

const mailHelper = async (option) => {
    const message = {
        from: config.SMTP_SENDER_EMAIL,
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    await transporter.send(message)
}

export default mailHelper