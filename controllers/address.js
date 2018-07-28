
var addressService = require("../services/address");
module.exports = {
    addAddress: async (req, res) => {
        var userId = req.userId;
        var address = req.body;

       var result = await addressService.addAddress(userId, address);
       res.status(200).send(result);

    },
    updateAddress: async (req, res) => {
       var userId = req.userId;
       var addressId = req.body.addressId;
        var address = req.body.address;
        var result = await addressService.updateAddress(userId, addressId, address);
        res.status(200).send(result);


    },
    deleteAddress: async (req, res) => {
        var userId = req.userId;
        var addressId = req.query.addressId;
        var result = await addressService.deleteAddress(userId, addressId);
        console.log("result from dekete address " + JSON.stringify(result, null, 2));
        res.status(200).send(result);
    },
    getAddresses: async (req, res) => {
        var userId = req.userId;

        var result = await addressService.getAddresses(userId);
        console.log("result from get address " + JSON.stringify(result, null, 2));
        res.status(200).send(result);
    },

}