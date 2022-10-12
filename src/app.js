import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import dotenv from 'dotenv';
//dotenv
dotenv.config();
class App {
    constructor() {
        this.server = express();
        this.database();
        this.middleware();
        this.routes();
    }
    middleware(){
       this.server.use(express.json())
    }
    database() {
        mongoose.connect(process.env.HOST_DB , {
            useNewUrlParser: true,
        });
    }
    routes() {
        this.server.use(routes)
    }
}

export default new App().server;