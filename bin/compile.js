/*
 * module dependence
 */
var $  = require('uglify-js')
  , fs = require('fs');

exports.minify = function(code,path,map){
  map.ast = $.parse(code,{filename:path,toplevel:map.ast});
  var sourcemap = $.SourceMap({
    file:'app.js',
    root:'..'
  });
  var stream = $.OutputStream({ 
    source_map : sourcemap
  });
  map.ast.print(stream);

  var compressor = $.Compressor({warnings:false});
  map.ast.figure_out_scope();
  map.ast.compute_char_frequency();
  map.ast.mangle_names();
  map.ast = map.ast.transform(compressor);
  map.value = sourcemap + "";
  map.data = stream + "";
}

exports.parse = function(code,path,map){
  map.ast = $.parse(code,{filename:path,toplevel:map.ast});
  var sourcemap = $.SourceMap({
    file:'app.js',
    root:'..'
  });
  var stream = $.OutputStream({ 
    beautify:true,
    indent_level:2,
    source_map : sourcemap
  });
  map.ast.print(stream);

  map.value = sourcemap + "";
  map.data = stream + "";
}
