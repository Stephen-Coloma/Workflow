import request from "supertest";
import express from "express";
import postOrdersController from "../src/controller/postOrdersController";
import { database } from "../src/database/mysql";
import mysql2 from 'mysql2';

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

const app = express();
app.use(express.json());
app.post("/orders", postOrdersController);

describe("POST /orders", () => {
    const mockOrder = {
        symbol: "AAPL",
        price: 150,
        quantity: 10,
        orderType: "BUY",
    };

    beforeEach(() => {
        (database.connect as jest.Mock).mockClear();
        (database.processQuery as jest.Mock).mockClear();
    });

    it("should create an order successfully", async () => {
        (database.connect as jest.Mock).mockResolvedValue({} as mysql2.PoolConnection);
        (database.processQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const res = await request(app).post("/orders").send(mockOrder);

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ message: "Order created successfully." });
    });

    it("should return 400 when order creation fails", async () => {
        (database.connect as jest.Mock).mockResolvedValue({} as mysql2.PoolConnection);
        (database.processQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const res = await request(app).post("/orders").send(mockOrder);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "Failed to create order." });
    });

    it("should return 500 on database error", async () => {
        (database.connect as jest.Mock).mockResolvedValue({} as mysql2.PoolConnection);
        (database.processQuery as jest.Mock).mockRejectedValue(new Error("DB error"));

        const res = await request(app).post("/orders").send(mockOrder);

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: "Order cannot be placed. Try again later." });
    });
});