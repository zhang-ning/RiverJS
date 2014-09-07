var fs = require("fs"),
    path = require("path");
module.exports = new Function("return" + fs.readFileSync(path.join(__dirname,"dist/river.js"),"utf-8"));
