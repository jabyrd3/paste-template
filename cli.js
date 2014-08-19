'use strict';

var path = require('path');

var program = require('commander'),
	paster = require('copy-paste');

var split = require('./split');

program
	.version('0.2.1')
	.usage('[options] <file ...>')
	.parse(process.argv);

split(path.join(__dirname, program.args[0]), function (err, output) {
	paster.copy(output, function () {
		console.log('Copied to clipboard');
	});
});