import twilio from 'twilio';

export default function sendMessage(req, res) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, token);
    const { newChildName, newChildEmail, newChildPhone } = req.body;
    console.log(req.body)
    const message = `Hello ${newChildName}. Un parent t\'a inscrit sur Kinkred. Lien: http://localhost:3000/signup`;
    client.messages
        .create({
            body: message,
            from: '(251) 316-6901',
            to: newChildPhone,
        })
        .then((message) => {
            console.log(message)
            res.json({
                success: true,
            })
        }
        )
        .catch((error) => {
            console.log(error);
            res.json({
                success: false,
            });
        });
}
