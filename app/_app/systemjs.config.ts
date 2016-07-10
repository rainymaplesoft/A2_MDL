(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'node_modules/rxjs',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        '@angular': 'node_modules/@angular',
        '@vaadin': 'node_modules/@vaadin/angular2-polymer/src',
        '@angular2-material':'node_modules/@angular2-material'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        'angular2-in-memory-web-api': {defaultExtension: 'js'},
        '@vaadin': {defaultExtension: 'js'}
    };

    var packageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages['@angular/'+pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    /** angular material **/
    // put the names of any of your Material components here
    const materialPkgs:string[] = [
        'core',
        'button',
        'card',
        'input',
        'list',
        'slide-toggle'
    ];

    materialPkgs.forEach((pkg) => {
        packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);