var commonService = require("../services/common");
module.exports = {


    submitFeedback: async (req, res) => {
          var result = await commonService.submitFeedback(req.body);
          console.log("result in controller " + result);
          res.status(200).send(result);
    },
}