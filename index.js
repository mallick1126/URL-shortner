import express from 'express';
import dotenv from 'dotenv';
import urlShortener from './routes/urlshortener.js';
import {connectDB} from './db/dbconfig.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 9600;


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/', urlShortener);
connectDB();


app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})