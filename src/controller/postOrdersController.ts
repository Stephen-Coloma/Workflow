import { Request, Response } from "express"
import { Order } from "../dto/order"
import { database } from "../database/mysql"

/**Controller that manages creating a new order entry on the database. */
const postOrdersController = async(req: Request<{},{}, Order>, res: Response) => {
    const order: Order = {
        symbol: req.body.symbol.toUpperCase(),
        price : req.body.price,
        quantity : req.body.quantity,
        order_type: req.body.order_type
    }

    const queryString =`
        INSERT INTO orders (symbol, price, quantity, order_type)
        VALUES (?,?,?,?);
    `

    const values = Object.values(order);

    try{
        const connection = await database.connect();
        const results = await database.processQuery(connection, queryString, values);

        if (results.affectedRows > 0) {
            res.status(201).json({ message: "Order created successfully." });
        } else {
            res.status(400).json({ message: "Failed to create order." });
        }
        return;
    }catch(err: unknown){
        console.log(err);
        
        res.status(500).json({ message: "Order cannot be placed. Try again later." });
    };
}
export default postOrdersController