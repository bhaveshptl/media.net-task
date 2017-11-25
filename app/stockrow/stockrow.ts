export class StockRow {

    name: string;
    price: string;

    previousPrice: string;
    updateTime: Date;

    constructor(strName: string, strPrice: string) {
        var oStockRow: StockRow = this;

        oStockRow.name = strName;
        oStockRow.price = strPrice;
        oStockRow.updateTime = new Date();        
    }    

    updateData(strName: string, strPrice: string): void {
        let oStockRow: StockRow = this;

        oStockRow.updateTime = new Date();
        oStockRow.previousPrice = oStockRow.price;
        oStockRow.price = strPrice;        
    }
    
}