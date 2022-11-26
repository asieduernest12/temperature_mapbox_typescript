import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

const dataInMemory: {}[] = [];

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World From the Typescript Server!</h1>");
});

const port = process.env.PORT || 8000;

app.post("/upload-file", (req: Request, res: Response) => {
  // const formData: FileInputs = req.body;

  // console.log(formData);

  // if (!formData) {
  //   return res.status(404).send("File Not Found!");
  // }

  // return res.status(200).json(formData);

  //read file
  // add fil entris to dataInMemory
  //jsofile contents is json
  // const fileContents = req.body
  const fileContents = JSON.parse(req.files.exampleData.data.toString("utf8"));
  console.log({ fileContents });
  dataInMemory.append(JSON.parse(fileContents));
  return res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
