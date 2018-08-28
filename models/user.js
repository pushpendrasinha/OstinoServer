var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    gender: {type: String, required: true},
    verified: {type: Boolean, required: false, default: false},
    createdAt: { type: Date, required: false, default: Date.now }
}, {collection: 'User', versionKey: false});


/*module.exports = mongoose.model('user',schema);*/
schema.pre('save', function (next) {
    var self = this;
    module.exports.find({email : self.email},  (err, docs) => {
        if (!docs.length){
            if(!this.isModified("password")) {
                return next();
            }
            bcrypt.hash(this.password, 10, (err, hash) => {
                if(err) {
                    next(err);
                    return;
                }
                this.password = hash;
                next();
            })
        }else{
            next(new Error("Email already registered"));
        }
    });
}) ;

schema.methods.passwordIsValid = function (password)  {
    /*bcrypt.compare(password, this.password, (err, results) => {
        if(err) {
            callback(false);
            return;
        }
        callback(null, results);
    })*/
    console.log("password " + password);
    console.log("this.password " + this.password);
   var isValid =  bcrypt.compareSync(password, this.password);
   return isValid;
}
module.exports = mongoose.model('user',schema);