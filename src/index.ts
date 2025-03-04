import express from 'express';
import cors, { CorsOptions } from 'cors';
import env from 'dotenv'
import bodyParser from 'body-parser';
import { ordersRouter } from './routes/orders';


// environment variables 
env.config();

// cors options
const corsOption:CorsOptions = {
    origin: '*', //all origin
    methods: "GET,POST",
}

const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());

app.get('/api', ordersRouter)