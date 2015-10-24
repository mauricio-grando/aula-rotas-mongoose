var http = require('http');
// importação do módulo model.js
var Model = require('./model');

var msg = "";
var Controller = {
	create: function(req, res) {
	var dados = {
			name: 'Skol',
			description: 'Mijo de rato',
			alcohol: 4.5,
			price: 3.0,
			category: 'pilsen'
		};

		var model = new Model(dados);

		model.save(function (err, data) {
			if(err) {
				console.log("Erro: ", err);
				msg = "Erro: " + err;
			} else {
				console.log("Cerveja inserida.", data);
				msg = "Cerveja inserida. " + data;
			}
			res.end(msg);
		});
	},
	retrieve: function(req, res) {
		var query = {};
		Model.find(query, function(err, data) {
			if(err) {
				console.log("Erro: ", err);
				msg = "Erro: " + err;
			} else {
				console.log("listagem: ", data);
				msg = "Listagem: " + data;
			}
			res.end(msg);
		});
	},
	update: function(req, res) {
		var query = {name: /Skol/i};
		var mod = {
			name: 'Brahma',
			alcohol: 4,
			price: 6,
			category: 'pilsen'
		};
		Model.update(query, mod, function(err, data) {
			if(err) {
				console.log("Erro: ", err);
				msg = "Erro: " + err;
			} else {
				console.log("Cervejas atualizadas com sucesso: ", data);
				msg = "Cervejas atualizadas com sucesso: " + data;
			}
			res.end(msg);
		});
	},
	delete: function(req, res) {
		var query = {name: /brahma/i};
		Model.remove(query, function(err, data) {
			if(err) {
				console.log("Erro: ", err);
				msg = "Erro: " + err;
			} else {
				console.log("Cerveja deletada com sucesso, quantidade: ", data.result);
				msg = "Cerveja deletada com sucesso, quantidade: " + data.result;
			}
			res.end(msg);
		});
	}
}

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
