//steal/js hs/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('app/index.html',{indent_size: 1, indent_char: '\t'});
});
