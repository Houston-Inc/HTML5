//steal/js sipoo/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/styles','steal/build/scripts','steal/build/resources',function(){
	steal.build('app/scripts/build.html', {
        to: 'out/app',
        resources: [
            {file: 'app/index.html', to: 'index.html', replace: [
                {regexp: /steal\.js\?app,development/mgi, replaceWith: 'steal.production.js?app'},
                {regexp: /<!--prodcss-->/mgi, replaceWith: '<link rel="stylesheet" href="production.css">'}
            ]},
            {file: 'out/app/production.css', to: 'production.css', replace: [
                {regexp: /url\([^\)]*\/images\//g, replaceWith: 'url(images/'},
                {regexp: /url\([^\)]*\/ellipsis\//g, replaceWith: 'url(bindings.xml#ellipsis'}
            ]},
            {file: 'out/app/production.js', to: 'production.js', replace: [
                {regexp: /out\/app\/production\.css/mgi, replaceWith: './production.css'}
            ]},
            {file: 'steal/steal.production.js', to: '../steal/steal.production.js'},
            {file: 'app/images', to: 'images/'}
        ]
    })
});
