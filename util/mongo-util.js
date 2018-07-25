
var mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Ostinohealth';

module.exports = {
    createDatabase : (dbName,custName)=>{
        var url = url + dbName;
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    console.log(error)
                    reject(error);
                }else{
                    var doc = { message: "New Database for Customer - "+custName};
                    db.collection("ReadMe").insertOne(doc, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve("success");
                        }
                    });
                }
            });
        });
    },

    createUser : (dbName,user,password)=>{
        var url = url + dbName;
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    console.log(error)
                    reject(error);
                }else{
                   // var adminDb = db.admin();
                    var doc = {
                        roles: [{
                            role : "userAdmin",
                            db : dbName
                        },{
                            role : "readWrite",
                            db : dbName
                        }]
                    };
                    db.addUser(user,password,doc, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve("success");
                        }
                    });
                }
            });
        });
    },

    createCollection : (collection)=>{
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    reject(error);
                }else{
                    db.createCollection(collection, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    },

    createRecord : (collection,document)=>{
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    reject(error);
                }else{
                    db.collection(collection).insertOne(document, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    },

    findRecord : (collection,query)=>{
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    reject(error);
                }else{
                    db.collection(collection).find(query).toArray(function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    },
    findOne : (collection,query)=>{
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    reject(error);
                }else{
                    db.collection(collection).findOne(query).toArray(function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    },
    deleteRecord : (collection,query)=>{
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    reject(error);
                }else{
                    db.collection(collection).deleteOne(query, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            db.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    },

    updateRecord : (collection,query,values)=>{
        return new Promise((resolve, reject) => {
            mongoClient.connect(url, function(error, db) {
                if (error){
                    reject(error);
                }else{
                    db.collection(collection).updateOne(query,values, function(err, res) {
                        if (err){
                            reject(err);
                        } else{
                            console.log(res);
                            db.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    }
}