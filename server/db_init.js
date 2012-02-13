var sechash = require('sechash');

var salt = 'hseh#23a4!';
var hash1 = sechash.strongHashSync('md5', "okra", salt, 2000);
console.log(hash1);