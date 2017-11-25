export class StockMap {
    name: string;
    price: string;
    constructor(strName: string, strPrice: string) {
        let oStockMap: StockMap = this;
        
        oStockMap.name = strName;
        oStockMap.price = strPrice;
    }
}