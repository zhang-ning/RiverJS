
var cwd = process.cwd()
  , dir = __dirname
  , fs = require('fs')
  , package = require('../package')
  , path = require('path')
  , config = path.join(cwd,'/river.json')
  , app = path.basename(process.argv[3]);


exports.get = function (){
  return fs.existsSync(config) ? read() : write()
}  


function read(){
  var data = JSON.parse(fs.readFileSync(config,'utf8'));
  if(data.version !== package.version){
    return write();
  }else{
    return data;
  }
}


function write(){
  var defaultConfig = {
    version:package.version,
    dist : app + '/build',
    alias : {
      'river.grammer' : path.join(app,'grammar').replace(/\//,'.')
    },
    sourcemap : false,
    minify : false
  };
  fs.writeFile(config,JSON.stringify(defaultConfig,null," "),function(err){
    if(err) throw err;
  });
  return defaultConfig;
}
