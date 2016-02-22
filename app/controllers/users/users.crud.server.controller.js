'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.list = function (req, res) {

    //if (req.query && req.query.text) {
    //    var search = req.query.text.split(' ');
    //
    //    if (search.length === 1) {
    //        User.find({$or: [{'firstName': {$regex: '^' + search[0]}}, {'lastName': {$regex: '^' + search[0]}}]}).limit(25).exec(function (err, users) {
    //            if (err) {
    //                return res.send(400, {
    //                    message: getErrorMessage(err)
    //                });
    //            } else {
    //                res.jsonp(users);
    //            }
    //        });
    //    } else if (search.length === 2) {
    //        User.find({$and: [{'firstName': {$regex: '^' + search[0]}}, {'lastName': {$regex: '^' + search[1]}}]}).limit(25).exec(function (err, users) {
    //            if (err) {
    //                return res.send(400, {
    //                    message: getErrorMessage(err)
    //                });
    //            } else {
    //                res.jsonp(users);
    //            }
    //        });
    //    } else {
    //        res.jsonp([]);
    //    }
    //} else {

        User.find({}, '-salt -password -__v -provider').sort('-created').exec(function (err, users) {

            if (err) {
                return res.send(400, {
                    message: err
                });
            } else {
                res.jsonp(users);
            }
        });
    //}
};
