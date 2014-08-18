'use strict';

var fs = require('fs');

module.exports = function (filePath, output_callback) {
	fs.readFile(filePath, 'utf-8', function (err, data) {
		if (err) { return output_callback(err); }

		var spilt = data.split('\n'),
			finish = [];

		for (var i = 0; i < spilt.length; i++) {
			var stringent = spilt[i];
			//console.log(stringent.length);
			if (stringent.length !== 1 && stringent.length !== 0) {
				stringent = stringent.trim();
				stringent = stringent.replace(/(\r\n|\n|\r)/gm, '');
				stringent = stringent.replace(/'/g, '\\\'');
				stringent = '\'' + stringent + '\\\'';
				if (i !== spilt.length - 1) {
					stringent = stringent + ' + ';
				}
				finish.push(stringent);
			}
		}

		finish[finish.length - 1] = finish[finish.length - 1].replace(/\+/, ';');
		finish = finish.join('\n');

		return output_callback(null, finish);
	});
};
