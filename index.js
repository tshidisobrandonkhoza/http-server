const http = require('http');
const hostname = 'localhost';
const port = 2000;

//create server takes two values as parameters (req,res) 
const server = http.createServer((request, response) => {

    ////Request
    console.log(request.headers);


    ////Response
    //status line
    response.statusCode = 200;
    //headers
    response.setHeader('Content-Type', 'text/html');
    //body > data
    response.end('<html><body><h1>Hello, World</h1></body></html>');

});

//start the server listening (port, hostname, fuction to be executed when the server starts up)
server.listen(port, hostname, () => {
    console.log(`Server running at  http://${hostname}:${port}`);
})