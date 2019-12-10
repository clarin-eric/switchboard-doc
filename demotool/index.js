const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));


function return_tokenized_text(res, file) {
	res.writeHead(200, {'content-type': 'text/plain'});
	fs.readFile(file.path, function (err, data) {
		const text = data
			.toString()
			.split(/\s+/)
			.join("\n");
        res.end(text);
	});
}





// app.get('/switchboard', (req, res) => {
// 	const https = require('https');
// 	const fileurl = req.query.input;
// 	const file = fs.createWriteStream("tmp.txt");
// 	const request = https.get(fileurl, response => {
// 		response.pipe(file);
// 		return_tokenized_text(res, file);
// 	});
// });

