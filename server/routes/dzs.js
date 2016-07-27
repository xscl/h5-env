var express = require('express');
var router = express.Router();
var assemble = require('../assemble');
assemble.assemble(router, 'dzs');
module.exports = router;
