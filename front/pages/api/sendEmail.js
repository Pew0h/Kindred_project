export default function (req, res) {
    const PASSWORD = process.env.SMTP_PASSWORD;
    const USER = process.env.SMTP_USER;
    const HOST = process.env.SMTP_HOST;
    const PORT = process.env.SMTP_PORT;
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: PORT,
        host: HOST,
        auth: {
            user: USER,
            pass: PASSWORD,
        },
        secure: true,
    })
    const mailData = {
        from: 'esgi_kankred@theoboudier.fr',
        to: req.body.newChildEmail,
        subject: `[Kinkred] Un parent t'a inscrit à Kinkred`,
        text: 'Valide ton inscription',
        html: `<div>
            Valide ton inscription en cliquant sur ce lien: <a href="http://localhost:3000/signup?email=${req.body.newChildEmail}&name=${req.body.newChildName}&phone=${req.body.newChildPhone}">Valider mon inscription</a>
        </div>`
    }

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info)
    })
}