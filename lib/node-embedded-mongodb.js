/*
 * 
 * https://github.com/agavish/node-embedded-mongodb
 *
 * Copyright (c) 2015 Adam Gavish
 * Licensed under the MIT license.
 */

"use strict";

require('shelljs/global');
var path = require('path');

var localMongoDbLogPath = path.join(process.cwd(), 'embeddedMongoDb', 'log');
var localMongoDbPath = path.join(process.cwd(), 'embeddedMongoDb', 'data', 'db');


var embeddedMongodb = {

    start: function (dbPath, logPath, callback) {
        if (!which('mongod')) {
            return callback(new Error('Error: this module requires mongod installed'), null);
        }

        if (logPath == null) {
            mkdir('-p', localMongoDbLogPath);
            logPath = path.join(localMongoDbLogPath, 'log');
        }

        if (dbPath == null) {
            mkdir('-p', localMongoDbPath);
            dbPath = localMongoDbPath;
        }

        logPath = path.normalize(logPath);
        dbPath = path.normalize(dbPath);

        var mongodStartCmd = 'mongod --dbpath ' + dbPath + ' --fork' + ' --logpath ' + logPath;

        echo('Executing: ' + mongodStartCmd);

        if (exec(mongodStartCmd).code != 0) {
            return callback(new Error('mongod start failed'), null);
        }

        return callback(null, { status: 'OK'});
    },

    stop: function (callback) {
        if (!which('mongod')) {
            return callback(new Error('Error: this module requires mongod installed'), null);
        }

        var mongodStopCmd = 'mongo --eval ' +  '"' + 'db.getSiblingDB(' + "'" + 'admin' +  "'" + ').shutdownServer()' + '"';

        echo('Executing: ' + mongodStopCmd);

        if (exec(mongodStopCmd).code != 0) {
            return callback(new Error('mongod stop failed'), null);
        }

        return callback(null, { status: 'OK'});
    }
};

module.exports = embeddedMongodb;