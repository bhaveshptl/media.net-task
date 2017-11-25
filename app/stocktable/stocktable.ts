import { StockMap } from "./stockmap";
import { StockRow } from "../stockrow/stockrow";

export class StockTable {

    stockMap: Array<StockMap> = new Array();

    stockRow: Array<StockRow> = new Array();    

    constructor() {
    }

    setData(stockRate: string): void {
        let oStockTable: StockTable = this;
        let lstStockRate = JSON.parse(stockRate);

        lstStockRate.forEach((element: any, index: number) => {
            if (oStockTable.stockMap.filter(stock => stock.name == element[0]).length == 0) {
                oStockTable.stockMap.push(new StockMap(element[0], element[1]));
            }
        });

        for (let i = 0; i < oStockTable.stockMap.length; i++) {
            var bFound: boolean = false;
            for (let j = 0; j < oStockTable.stockRow.length; j++) {
                if (oStockTable.stockMap[i].name == oStockTable.stockRow[j].name) {
                    bFound = true;
                    oStockTable.stockRow[j].updateData(oStockTable.stockMap[i].name, oStockTable.stockMap[i].price);
                    break;
                }
            }

            if (!bFound) {
                oStockTable.stockRow.push(new StockRow(oStockTable.stockMap[i].name, oStockTable.stockMap[i].price));                
            }
        }
    }
}