
//Node JS Configuration
var nconf = require('nconf');
var environment = process.env.NODE_ENV || 'development';


function nodeConfig() {
    console.log("ENV:: "+environment);
    // First consider commandline arguments and environment variables, respectively.
   // nconf.argv().env();
    //nconf.file(environment, '../config/' + environment.toLowerCase() + '.json');
    nconf.argv()
        .env()
        .file({ file: './config/'+environment.toLowerCase() + '.json' });
    //nconf.file('default', './config/default.json');
}

nodeConfig.prototype.get = function(key) {
    return nconf.get(key);
};

//Export Modules
module.exports.nodeConfig = new nodeConfig();
