import { Request, Response } from "express";
import getOrdersController from "../src/controller/getOrdersController";
import { database } from "../src/database/mysql";
import mysql2 from 'mysql2';

// Mock the entire database module
jest.mock("../src/database/mysql", () => {
    const mockConnect = jest.fn();
    const mockProcessQuery = jest.fn();
    return {
        database: {
            connect: mockConnect,
            processQuery: mockProcessQuery,
        },
    };
});

describe("GET /orders", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        (database.connect as jest.Mock).mockClear();
        (database.processQuery as jest.Mock).mockClear();
    });

    it("should return orders when database has data", async () => {
        (database.connect as jest.Mock).mockResolvedValue({} as mysql2.PoolConnection);
        (database.processQuery as jest.Mock).mockResolvedValue([
            { id: 1, symbol: "AAPL", price: 150, quantity: 10, order_type: "BUY" },
        ]);

        await getOrdersController(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { id: 1, symbol: "AAPL", price: 150, quantity: 10, order_type: "BUY" },
        ]);
    });

    it("should return empty message when no orders exist", async () => {
        (database.connect as jest.Mock).mockResolvedValue({} as mysql2.PoolConnection);
        (database.processQuery as jest.Mock).mockResolvedValue([]);

        await getOrdersController(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "empty" });
    });

    it("should return 500 on database error", async () => {
        (database.connect as jest.Mock).mockRejectedValue(new Error("Database error"));

        await getOrdersController(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Order cannot be placed. Try again later." });
    });
});