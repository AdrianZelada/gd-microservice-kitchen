import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

import MysqlConnection from './repository/connection';

import {OrderModel} from './repository/orders';
import { OrderService } from './services/order.service';
import {QueueModel} from './repository/queue_order';
import { QUeueService } from './services/queue.service'

const orderModel = new OrderModel(MysqlConnection);
OrderService.configOrderService(orderModel);

const queueModel = new QueueModel(MysqlConnection);
QUeueService.configQueueService(queueModel);

import kitchen from './routes/kitchen.route';


const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.options('*', cors()) 
app.use(bodyParser.json());
app.use('/kitchen', kitchen(express.Router()));
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
}); 