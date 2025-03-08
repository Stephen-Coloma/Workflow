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

app.use('/api', ordersRouter);

const serverConfig = {
    port: parseInt(process.env.SERVER_PORT!) || 3000,
    host: process.env.SERVER_HOST || 'localhost',
}

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server listening on port ${serverConfig.port}`);
})
