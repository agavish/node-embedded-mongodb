#  [![Build Status](https://secure.travis-ci.org/agavish/node-embedded-mongodb.png?branch=master)](http://travis-ci.org/agavish/node-embedded-mongodb)

> Node.js embedded mongoDb module


## Getting Started

Install the module with: `npm install node-embedded-mongodb`


```js
var embeddedMongoDB = require('node-embedded-mongodb');

var dbPath = '/path/to/data/db/';
var logPath = '/path/to/mongod.log';

embeddedMongoDB.start(dbPath, logPath, function(err) {

// mongodb://localhost:27017 is UP
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
