/*
 * module dependence
 */
var $      = require('uglify-js')
  , has    = {}
  , hasNot = {}
  , fs = require('fs');

exports.sourcemap = function(need){
  return need ? has : hasNot
}

has.parse = function(code,distname,root,path,ast){
  /*
  var ast = $.parse(code);
  var compressor = $.Compressor();
  ast.figure_out_scope();
  ast = ast.transform(compressor);
  return  ast.print_to_string();
  */
  return $.minify(code,{fromString: true}).code;
}

hasNot.parse = function(code,path,map){
  var distname = 'app.js';
  var sourcemap = $.SourceMap({
    file:distname,
    root:'..'
  });
  var stream = $.OutputStream({ 
    //beautify:true,
    //indent_level:2,
    source_map : sourcemap
  });
  map.ast = $.parse(code,{filename:path,toplevel:map.ast});
  var compressor = $.Compressor();
  map.ast.figure_out_scope();
  map.ast = map.ast.transform(compressor);
  map.ast.print(stream);
  map.value = sourcemap.toString();
  return stream.toString() + '\n';
}

exports.minify = function(source,file,ast){
  var result = $.minify(source,{
    fromString: true,
    outSourceMap: "app.map"
  });
}
