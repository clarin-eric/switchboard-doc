const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));

app.post('/splitter', (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error('Error', err);
			throw err;
		}
		const file = files.document;
		return_tokenized_text(res, file);
	})
});

function return_tokenized_text(res, file) {
	fs.readFile(file.path, (err, data) => {
		const text = data
			.toString()
			.split(/\s+/)
			.join("\n");
		res.writeHead(200, {'content-type': 'text/plain'});
        res.end(text);
	});
}




// app.get('/switchboard', (req, res) => {
// 	const http = require('https');
// 	const fileurl = req.query.input;
// 	const file = fs.createWriteStream("tmp.txt");
// 	const request = http.get(fileurl, response => {
// 		response.pipe(file);
// 		return_tokenized_text(res, file);
// 	});
// });
