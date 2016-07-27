/**
 * Created by tingkl on 16/7/24.
 */
var a = [];
for (var row = 0; row < 947; row++) {
	var srow = [];
	for (var col = 0; col < 586; col ++) {
		srow.push(0);
	}
	a.push(srow);
}
var fs = require('fs');
fs.writeFileSync('realMap.js' , JSON.stringify(a, false, 4));