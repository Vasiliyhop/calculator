requirejs.config({
    "baseUrl": "js/lib",            // all libraries
    "paths": {
        "app": "../app"
    },
    "shim" : {
        "bootstrap" :
            { "deps" : ['jquery'] }
    }
});
define(["jquery", "backbone", "bootstrap"], function($, Backbone) {
    requirejs(['js/app/main.js']);  // main calculator file
});
