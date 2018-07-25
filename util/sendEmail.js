
let nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require("./config-util");




var transporter = nodemailer.createTransport(smtpTransport({
    host:  config.nodeConfig.get('smtpserver:host'), //'email-smtp.us-east-1.amazonaws.com',
    port:  config.nodeConfig.get('smtpserver:port'), //2587,
    auth: {
        user: config.nodeConfig.get('smtpserver:user'),
        pass: config.nodeConfig.get('smtpserver:pass')
    }
}));

function sendMail(message) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: 'medthatheals@gmail.com',
            to: 'surajitbanerjee@ostinohealth.com',
            subject: 'Feedback',
            html: message

        }, function (error, response) {
            if (error) {
                console.log('Inside error');
                console.log(error);
                reject(err);
            } else {
                console.log(' success in sendmail');
                console.log('mail sent');
                console.log('Response is ' + JSON.stringify(response));
                resolve(response);
            }
        });
    })

}
module.exports.sendMail = sendMail;


