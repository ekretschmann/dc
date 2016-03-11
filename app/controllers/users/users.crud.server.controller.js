'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    console.log('bbbbb');
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};

exports.create = function(req, res) {
    var user = new User(req.body);
    user.provider = 'local';
    //article.user = req.user;
    //
    user.save(function(err) {
        console.log(err);
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(user);
        }
    });
};


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
