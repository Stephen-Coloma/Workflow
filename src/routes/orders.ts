import { Router } from "express";
import getOrdersController from "../controller/getOrdersController";
import postOrdersController from "../controller/postOrdersController";

export const ordersRouter = Router();

/**GET REQUEST */
ordersRouter.get('/orders', getOrdersController);

/**POST REQUEST */
ordersRouter.post('/orders', postOrdersController);