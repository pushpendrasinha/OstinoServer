var feedbackModel = require("../models/feedback");
var mailSender = require("../util/sendEmail");

module.exports = {
    submitFeedback: async (data) => {
        console.log("data in submitFeedback is " + JSON.stringify(data, null, 2));
        var msg = `<p>Name: ${data.name}</p> <br> <p> Email: ${data.email}</p> <br>
<p>Feedback: ${data.message}</p>`
       await mailSender.sendMail(msg);
       return {"msg": "mail sent successfully.."};

    },
   Feedback: async (data) => {
        return new Promise((resolve, reject) => {
                var result = new feedbackModel(data).save(function(err, data) {
                    if(err) {
                        reject(err);
                    } else {
                        console.log("in feedback success");
                        resolve({"msg": "Thanks for your feedback"});
                    }
                })
            }
        )

    }
}