var http = require('http');
var Controller = require('./controller');

http.createServer(function (req, res) {
	console.log('url: ', req.url);
	var url = req.url;
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	switch(url) {
		case '/create':
			Controller.create(req, res);
			break;
		case '/retrieve':
			Controller.retrieve(req, res);
			break;
		case '/update':
			Controller.update(req, res);
			break;
		case '/delete':	
			Controller.delete(req, res);
			break;
		default:
			console.log("Nada a fazer");
	}
	
}).listen(3000);

console.log('Server running at http://localhost:3000/');
