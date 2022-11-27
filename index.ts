import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
const multer = require('multer');
const upload = multer(); // v1.0.5/ for parsing multipart/form-data

const dataInMemory: {}[] = [];

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Hello World From the Typescript Server!</h1>');
});

app.get('/test', (req, res) => res.send('working'));

app.post('/upload-file', upload.array(), (req, res) => {
	try {
		// const fileContents = JSON.parse(req.files.exampleData.data.toString('utf8'));
		const { file = [] } = req.body;
		const fileJson = JSON.parse(file);
		dataInMemory.push(...fileJson);
		return res.json({ contents: fileJson.length });
	} catch (error) {
		console.trace(error);
		res.status(500).send(error);
	}
});

app.get('/points', (req, res) => {
	return res.json(dataInMemory);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
