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
    host: process.env.SERVER_HOST || '0.0.0.0',
}

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log("DOCKERHUB_USERNAME:", process.env.DOCKERHUB_USERNAME || "Not Set");
    console.log("SERVER_HOST:", process.env.SERVER_HOST || "Not Set");
    console.log("SERVER_PORT:", process.env.SERVER_PORT || "Not Set");
    console.log("MYSQL_HOST:", process.env.MYSQL_HOST || "Not Set");
    console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE || "Not Set");
    console.log("MYSQL_USER:", process.env.MYSQL_USER || "Not Set");
    console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD || "Not Set");
    console.log("MYSQL_ROOT_PASSWORD:", process.env.MYSQL_ROOT_PASSWORD || "Not Set");
    console.log(`Server listening on host ${serverConfig.host} and port ${serverConfig.port}`);
})
