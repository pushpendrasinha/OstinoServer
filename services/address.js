var addressModel = require("../models/address");


module.exports = {
    addAddress: async (userId, address) => {
        try {
            var addressId = address._id;
            if(addressId) {
                delete address._id;
                console.log("userId: " + userId);
                console.log("addressId:" +  addressId);
                console.log("address: " + JSON.stringify(address));
                var result =  await addressModel.updateOne({userId: userId, _id: addressId}, address);
               // var result =  await addressModel.updateOne({state: "Haryana"}, address);
                return { success: true, msg: "address updated successfully"}
            } else {
                address.userId = userId;
                await new addressModel(address).save();
                return { success: true, msg: "address added successfully"}
            }
            } catch(e) {
            console.log("exception in add or update address is " + e);
            return { success: false, msg: `err in adding address ${e} `}
        }


    },
    updateAddress: async (userId, addressID, updatedaddress) => {
        try {

               var result =  await addressModel.updateOne({userId: userId, _id: addressID}, updatedaddress);
               // await address.updateOne({"name": "aasheesh"}, address);
            console.log("updateaddress result "  + JSON.stringify(result, null, 2));
                return { success: true, msg: "address updated successfully"}

        } catch(e) {
            console.log("exception in updateAddress is " + e);
            return { success: false, msg: `err in updating address ${e} `}

        }


    },
    deleteAddress: async (userId, addressId) => {
        try {
            console.log("addressId in delete address is " + addressId);
           var result =  await addressModel.deleteOne({_id: addressId, userId: userId});
            console.log("address deleted.." + JSON.stringify(result, null, 2));
            return { success: true, msg: "address deleted successfully"};
        } catch(e) {
            console.log("exception in deleteAddress is " + e);
            return { success: false, msg: `err in deleting address ${e} `}
        }

    },
    getAddresses: async (userId) => {
        try {
            var result =  await addressModel.find({userId: userId}, null, {sort: {_id: -1}});
           // console.log("address deleted.." + JSON.stringify(result, null, 2));
            return { success: true, addresses: result};
        } catch(e) {
            console.log("exception in getAddresses is " + e);
            return { success: false, msg: `err in fetching address ${e} `}
        }

    }
}