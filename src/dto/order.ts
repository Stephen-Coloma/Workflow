export type Order = {
    symbol: string,
    price: number,
    quantity: number,
    order_type: 'BUY' | 'SELL',
}