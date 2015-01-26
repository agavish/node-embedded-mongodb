#  [![Build Status](https://secure.travis-ci.org/agavish/node-embedded-mongodb.png?branch=master)](http://travis-ci.org/agavish/node-embedded-mongodb)

> Node.js embedded mongoDb module

This is a simple module which start/stop an already installed, existing, localhost mongod server.

This module is very useful for running mongodb as part of a Gulp/Grunt testing task.

## Getting Started

Install [mongodb](https://www.mongodb.org/downloads)
 
Install the module with: `npm install node-embedded-mongodb`

Then, use it:

```js
var embeddedMongoDB = require('node-embedded-mongodb');

var dbPath = '/path/to/data/db/';
var logPath = '/path/to/mongod.log';

embeddedMongoDB.start(dbPath, logPath, function(err) {

// mongodb://localhost:27017 is UP
)};

OR

embeddedMongoDB.start(null, null, function(err) {

// mongodb://localhost:27017 is UP
// created a local embedded/data/db folder and a local embedded/log file
)};

embeddedMongoDB.stop(function(err) {

// mongodb://localhost:27017 is DOWN
)};
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com).


## License

Copyright (c) 2015 Adam Gavish  
Licensed under the MIT license.
