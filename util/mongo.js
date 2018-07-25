
//var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var userModel = require("../models/user");
const url = 'mongodb://localhost:27017/Ostinohealth';
mongoose.connect(url);
module.exports = {


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

    createRecord : (document)=>{
        return new Promise((resolve, reject) => {
         var User = new userModel(document);
         User.save();
         return {"msg": "record created"};
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