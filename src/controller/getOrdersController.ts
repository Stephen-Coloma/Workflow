import { Request, Response } from "express"
import { database } from "../database/mysql"

/**Controller that manages retrieval of orders from the database */
const getOrdersController = async(req: Request, res: Response) => {
    req;
    const queryString = `
        SELECT * FROM orders;
    `

    try{
        const connection = await database.connect();
        const results = await database.processQuery(connection, queryString);

        (results.length > 0) ? res.status(200).json(results) : res.status(200).json({message: 'empty'})
    }catch(err: unknown){
        console.log(err);
        
        res.status(500).json({ message: "Order cannot be fetched. Try again later." });
    }
}

export default getOrdersController