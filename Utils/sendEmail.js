const NodeMailer = require('nodemailer');
const sendEmail = async (options) => {

    var transporter = NodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "mshaheer861@gmail.com",
            pass: "uwxcdzvxwucgysda"
        }
    });


    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    

    const mailOption = {
        from:"mshaheer861@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(mailOption)
}   


module.exports = sendEmail