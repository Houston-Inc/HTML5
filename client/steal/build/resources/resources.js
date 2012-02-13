steal('steal/build').then(function( steal ) {

	/**
	 * Copies resources to out
	 */
	var resources = (steal.build.builders.resources = function( opener, options ) {
		steal.print("\nCOPYING RESOURCES --------------- ");
		//where we are putting stuff
		var folder = options.to.substr(0, options.to.length - 1),
            currentFolder = steal.File.cwd();

        for (var rsc in options.resources) {
            var fileInfo = options.resources[rsc];
            if (!fileInfo.file) continue;
            var path = steal.File(currentFolder).join(fileInfo.file);
            var file = new steal.File(path);
            var tp = steal.File(folder).join(fileInfo.to);
            var dst = new java.io.File(tp.substr(0,tp.lastIndexOf("/")));
            dst.mkdirs();
            if (fileInfo.replace) {
                var content = readFile(path);
                for (var r in fileInfo.replace) {
                    content = content.replace(fileInfo.replace[r].regexp, fileInfo.replace[r].replaceWith);
                }
                steal.print("-save "+path+" ("+content.length+")");
                steal.File(tp).save(content);
            } else {
                steal.print("-copy "+path);
                file.copyTo(steal.File(folder).join(fileInfo.to), ".svn .cvs .DS_store");
            }
        }
	});

});
