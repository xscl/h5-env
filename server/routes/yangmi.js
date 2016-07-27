var express = require('express');
var router = express.Router();
var assemble = require('../assemble');
assemble.assemble2(router, 'yangmi');
module.exports = router;
