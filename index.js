var http = require('http');
var pdf = require('html-pdf');

var options = { format: 'Letter' };

const PORT = 9050;

var server = http.createServer(function(req,res) {
	var html = '';
	req.on('data', function(chunk) {
		html += chunk.toString();
	});

	req.on('end', function() {
		pdf.create(html).toStream(function(err,stream) {
			stream.pipe(res);
		});
	});
});

server.listen(PORT,'0.0.0.0');