#!/usr/bin/env node

var command = {}
  , fs = require('fs')
  , $path = require('path')
  , exclude = /node_modules/
  , targetfile = /\.js\s*$/
  , rootPath;

command.help = function(){
  console.log([
    "",
    "welcome to use riverjs build tool",
    "How to use ?",
    "Build ------------------ riverjs build [project path]",
    "Help ------------------- riverjs help",
    "Clean ------------------ riverjs clean [project path]",
    ""
  ].join('\n'));
};

command.clean = function () {
  clean(process.argv[3] + '/build');
}

command.build = function (){
  begin(process.argv[3]);
}
var bin = command[process.argv[2]]
if(typeof bin === 'function'){
  bin.call(null);
}else{
  command.help();
}



function begin(path) {
  if(!path) return command.help();
  path = path.replace(/\/\s*$/,'');
  rootPath = path;
  readPath(path);
  clean($path.join(path,'build'));
  //clean(path + '/build');
  buildFile($path.join(path,'build'));
  //buildFile(path+ '/build');
}

function readPath(path){
  fs.stat(path,function(err,value){
    if(err) throw err;
    if(value.isFile()) readFile(path);
    if(value.isDirectory()) readDirectory(path);
  });
}

function readFile(path){
  if(!targetfile.test(path)) return;
  fs.readFile(path,'utf8',function(err,value){
    var namespace = path.replace(/^\.\/|\.js$/g,'').replace(/\//g,'.');
    var data = header(namespace)  + '\n' + value + '\n' + footer() + '\n';
    appendToBuffer(data);
  });
}

function readDirectory(path){
  if(exclude.test(path)) return;
  fs.readdir(path,function(err,value){
    if(err) throw err;
    for (var i = 0, len = value.length; i < len; i++) {
      var childpath = path + '/' + value[i];
      readPath(childpath);
    }
  });
}

function clean(path){
  var stat; 
  try{
    stat = fs.statSync(path);
  }catch(err){
    return;
  }
  if(!stat) return;
  if(stat.isDirectory()){
    var subpath = fs.readdirSync(path);
    for (var i = 0, len = subpath.length; i < len; i++) {
      clean(path + '/' + subpath[i]);
    }
    fs.rmdir(path);
  }else if(stat.isFile()){
    fs.unlinkSync(path);
  }
}

function buildFile(path) {
  fs.mkdir(path,function(err){
    copyDist();
  });
}

function header(path) {
  return 'define("'+ path +'",function(exports,require,module){';
}

function footer() {
  return '});';
}


function appendToBuffer(data) {
  fs.appendFile(rootPath + '/build/app.js',data,function(err){
    if(err) throw err;
  });
}

/**
 * copy river.js river.min.js from dist folder
 * 
 */
function copyDist() {
  var src = ['river.js','river.min.js'];
  for (var i = 0, len = src.length; i < len; i++) {
    write(src[i]);
  }

  function write(name){
    fs.readFile($path.join(__dirname,'../dist',name),function(err,buf){
      fs.writeFile($path.join(rootPath,'build',name),buf);
    });
  }
}
