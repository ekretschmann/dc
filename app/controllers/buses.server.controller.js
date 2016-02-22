'use strict';

var http = require('http');
var https = require('https');
var q = require('q');

var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var getBuslines = function () {
    var deferred = q.defer();
    var linesOptions = {
        host: 'mk.ods-live.co.uk',
        path: '/api/1/bus/services.json'
    };

    var httpReq = http.get(linesOptions, function (response) {

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        response.on('data', function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function () {
            var body = JSON.parse(Buffer.concat(bodyChunks));
            // ...and/or process the entire body here.
            var services = body.Root.Services;
            var serviceIds = [];
            for (var i = 0; i < body.Root.Services.length; i++) {
                var serviceId = body.Root.Services[i].Id;
                if (serviceIds.indexOf(serviceId) === -1) {
                    serviceIds.push(serviceId);
                }
            }
            deferred.resolve(serviceIds);
        });
    });

    httpReq.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
    return deferred.promise;
};

var getBusstops = function (lineId) {


    var deferred = q.defer();

    var serviceOptions = {
        host: 'mk.ods-live.co.uk',
        path: '/api/1/bus/locations.json?service=' + lineId
    };

    var serviceHttpReq = http.get(serviceOptions, function (serviceResponse) {

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        serviceResponse.on('data', function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function () {
            var body = JSON.parse(Buffer.concat(bodyChunks));

            deferred.resolve(body.Root.Locations);
        });
    });

    serviceHttpReq.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });

    return deferred.promise;
};

var getAllBusstops = function(lineIds) {
    var deferred = q.defer();
    var received = 0;
    var busstops = [];

    for (var i=0; i<lineIds.length; i++) {
        var allStops = getBusstops(lineIds[i]);

        //allStops.then(function(stops) {
        //
        //    busstops.push(stops);
        //    received++;
        //    if (received === lineIds.length) {
        //        deferred.resolve(busstops);
        //    }
        //});
    }
    return deferred.promise;
};

exports.importBusstops = function (req, res) {

    var busstopIds = [];
    var busstops = [];
    getBuslines().then(
        function (lineIds) {
            getAllBusstops(lineIds).then(function(stops) {

                for (var i=0; i<stops.length; i++) {
                 //   console.log(stops[i].length);
                    for (var j=0; j<stops[i].length; j++) {
                        var busstop = stops[i][j];
                   //     console.log(busstop);
                        if (busstopIds.indexOf(busstop.Id) === -1) {
                            busstopIds.push(busstop.Id);
                            busstops.push(busstop);
                        }
                    }
                }

  for (var k = 0; k<busstops.length; k++) {
                    var stop = busstops[k];
                    //console.log(stop);
                    //console.log(stop.Services);
                    var services = [];
                    if (stop.Services) {
                        services = stop.Services.split('/');
                    }
                    var location = new Location({
                        type: 'busstop',
                        name: stop.Name,
                        labels: ['import-20-02-16'],
                        lat: stop.Latitude,
                        lng: stop.Longitude,
                        info: services
                    });

                    console.log(location);

                    location.save();

                    //console.log(location.name);
                    //console.log(location.lat);
                    //console.log(location.lng);
                    //console.log(location.info);

                    //location.save(function(err, x) {
                    //
                    //    console.log('saving ',x.name);
                    //
                    //    if (err) {
                    //        console.log(err);
                    //    }
                    //});
                }
            });

        }
    );


    //res.jsonp(services);

    //var httpReq = http.get(linesOptions, function(response) {
    //    //console.log('STATUS: ' + response.statusCode);
    //    //console.log('HEADERS: ' + JSON.stringify(response.headers));
    //
    //    // Buffer the body entirely for processing as a whole.
    //    var bodyChunks = [];
    //    response.on('data', function(chunk) {
    //        // You can process streamed parts here...
    //        bodyChunks.push(chunk);
    //    }).on('end', function() {
    //        //console.log(Buffer.concat(bodyChunks));
    //        var body = JSON.parse(Buffer.concat(bodyChunks));
    //        //console.log('BODY: ' + body.toString());
    //        // ...and/or process the entire body here.
    //        var services = body.Root.Services;
    //        var serviceIds = [];
    //        for (var i=0; i<body.Root.Services.length; i++) {
    //            var serviceId = body.Root.Services[i].Id
    //            if (serviceIds.indexOf(serviceId) === -1) {
    //                serviceIds.push(serviceId);
    //            }
    //        }
    //
    //        var busstops = {};
    //        for (i=0; i<1; i++) {
    //
    //        }
    //    });
    //});
    //
    //httpReq.on('error', function(e) {
    //    console.log('ERROR: ' + e.message);
    //});

    res.jsonp('ok');
};

exports.dropBusstops = function(req, res) {
    console.log('dropping');
    console.log(req.params.label);

    Location.find({labels: req.params.label}).sort('-created').exec(function(err, locations) {
        for (var i=0; i<locations.length; i++) {
            locations[i].remove();
        }
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.jsonp('ok');
        }
    });
};


/**
 * List of Buses
 */
exports.busservices = function (req, res) {


    var options = {
        //http://mk.ods-live.co.uk/api/1/bus/locations.json?service='+id
        host: 'mk.ods-live.co.uk',
        path: '/api/1/bus/services.json'
    };

    //res.jsonp(services);

    var httpReq = http.get(options, function (response) {
        //console.log('STATUS: ' + response.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(response.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        response.on('data', function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function () {
            //console.log(Buffer.concat(bodyChunks));
            var body = JSON.parse(Buffer.concat(bodyChunks));
            //console.log('BODY: ' + body.toString());
            // ...and/or process the entire body here.
            res.jsonp(body);
        });
    });

    httpReq.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });

};

exports.busservice = function (req, res) {


    var options = {
        //http://mk.ods-live.co.uk/api/1/bus/locations.json?service='+id
        host: 'mk.ods-live.co.uk',
        path: '/api/1/bus/locations.json?service=' + req.params.busId
    };

    //res.jsonp(line5);

    var httpReq = http.get(options, function (response) {
        //console.log('STATUS: ' + response.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(response.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        response.on('data', function (chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function () {
            var body = JSON.parse(Buffer.concat(bodyChunks));
            console.log(body);
            // ...and/or process the entire body here.
            res.jsonp(body);
        });
    });

    httpReq.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });

};

