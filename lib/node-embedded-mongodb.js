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
var sleep = require('sleep');
var net = require('net');

var localMongoDbLogPath = path.join(process.cwd(), 'embeddedMongoDb', 'log');
var localMongoDbPath = path.join(process.cwd(), 'embeddedMongoDb', 'data', 'db');

var localhost = '127.0.0.1';
var maxConnectionAttempts = 1000;
var embeddedMongodb = {
    isSilentMode: false,

    log: function() {
        if (this.isSilentMode) {
            return;
        }
        echo.apply(this, [].slice.call(arguments, 0));
    },

    silentMode: function(yesno) {
        this.isSilentMode = yesno;
        config.silent = true; // shelljs fall be silent.
    },

    start: function (dbPath, logPath, dbPort, callback) {
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
        if(dbPort) {
          mongodStartCmd += ' --port ' + dbPort;
        }
        this.log('Executing: ' + mongodStartCmd);

        let connectionAttempts = 0;
        function awaitListeningPort() {

            var client = new net.Socket();
            client.on('error', function(error) {
                console.log('=========== Connection attempts=' + connectionAttempts + ', error=' + JSON.stringify(error));
                client.destroy();
                if (connectionAttempts < maxConnectionAttempts) {
                    setTimeout(function () {
                        awaitListeningPort();
                    }, 50)
                } else {
                    console.error("Mongod port not available after connection tests, giving up, number of attempts: " + maxConnectionAttempts)
                    callback(new Error('failed to connect giving up'), null);
                }
            });

            connectionAttempts++;
            client.connect(dbPort, localhost, function() {
                console.log('######### Connected OK, attempts=' + connectionAttempts);
                client.destroy();
                callback(null, { status: 'OK'});
            });
        }


        if (exec(mongodStartCmd).code != 0) {
            awaitListeningPort();
            return callback(new Error('mongod start failed'), null);
        }

    },

    stop: function (callback) {
        if (!which('mongod')) {
            return callback(new Error('Error: this module requires mongod installed'), null);
        }

        var mongodStopCmd = 'mongo --eval ' +  '"' + 'db.getSiblingDB(' + "'" + 'admin' +  "'" + ').shutdownServer()' + '"';

        this.log('Executing: ' + mongodStopCmd);

        if (exec(mongodStopCmd).code != 0) {
            return callback(new Error('mongod stop failed'), null);
        }

        return callback(null, { status: 'OK'});
    }
};

module.exports = embeddedMongodb;
