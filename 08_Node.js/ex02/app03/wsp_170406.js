"use strict"

var http = require('http'),
    path = require('path'),
    url = require('url'),
    fs = require('fs');

var server = http.createServer(function(req, res) {
    var reqPath = url.parse(req.url).pathname;
    if(reqPath=="/") {
        reqPath = "2012104133_3.html";
    }
    var fullPath = path.join(process.cwd(), reqPath);
    fs.readFile(fullPath, "binary", function(err, file) {
        if(err) {
            if(err.code == "ENOENT") {
        res.writeHeader(404, {"Content-Type": "text/html"});
        res.write("<h1>Not found</h1>");
        res.end();
            }
            else{
            res.writeHeader(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
            }
        }
            else{
                console.log("SEND 200 for " + req.url);
                res.writeHeader(200);
                res.write(file, "binary");
                res.end();
            }
    });
});

server.listen(3030, function() {
    console.log("Server listening on http://localhost:3030");
});
