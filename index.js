
//import the http module
const http = require('http');
//import the file system - deprecated ; 

const fs = require('fs');
//import the path
const path = require('path');

const hostname = 'localhost';
const port = 2000;



//create server takes two values as parameters (req,res) 
const server = http.createServer((request, response) => {

    ////Request
    console.log(`Request URL - ${request.url}`);

    if (request.method == 'GET') {
        let fileUrl;

        //if request doesnt receive a filename > must default to index       
        if (request.url == '/') fileUrl = '/index.html';
        else fileUrl = request.url;
        //resolve the file path
        // let filePath = path.resolve('./public' + fileUrl);
        let filePath = path.resolve('./' + fileUrl);
        let fileExt = path.extname(filePath);
        //check to see if file exist buy using > fs
        if (fileExt == '.html') {

            if (!fs.existsSync(filePath)) {
                response.statusCode = 404
                response.setHeader('Content-Type', 'text/html');
                response.end(`<html><body><h1>Error ${response.statusCode} Page Not Found </h1></body></html>`);
                return;
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html');
            //convert the file path to stream of bytes and pipe it to the response 
            fs.createReadStream(filePath).pipe(response)
        } else {
            response.statusCode = 404
            response.setHeader('Content-Type', 'text/html');
            response.end(`<html><body><h1>Error ${response.statusCode} File Url not Html file </h1></body></html>`);
            return;
        }

    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html');
        response.end(`<html><body><h1>Error ${response.method} Method Not Supported </h1></body></html>`);
        return;

    }

});

//start the server listening (port, hostname, fuction to be executed when the server starts up)
server.listen(port, hostname, () => {
    console.log(`Server running at  http://${hostname}:${port}`);
})