import { Router } from "express";
import postOrdersController from "../controller/postOrdersController";
import getOrdersController from "../controller/getOrdersController";

export const ordersRouter = Router();

/**GET REQUEST */
ordersRouter.get('/orders', getOrdersController);

/**POST REQUEST */
ordersRouter.post('/orders', postOrdersController)