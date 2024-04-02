//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(__dirname, pathname);
    fs.stat(filepath, function (err, stats) {
        if (err) {
            console.log('404' + filepath);
            response.writeHead(404);
            response.end('404 Not Found');
            return;
        }
        if (stats.isFile()) {
            console.log('200' + filepath);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else if (stats.isDirectory()) {
            fs.readdir(filepath, function (err, files) {
                console.log('200' + filepath);
                response.writeHead(200);
                response.end(files.join(','));
            });
        }
    });
}).listen(8080);
console.log('Server running at http://google.com:8080/');