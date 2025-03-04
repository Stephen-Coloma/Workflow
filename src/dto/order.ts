export type Order = {
    symbol: string,
    price: number,
    quantity: number,
    orderType: 'BUY' | 'SELL',
}