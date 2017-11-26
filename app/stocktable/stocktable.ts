import { StockMap } from "./stockmap";
import { StockRow } from "../stockrow/stockrow";

export class StockTable {

    stockMap: Array<StockMap> = new Array();

    stockRow: Array<StockRow> = new Array();
    element: HTMLElement = document.createElement("div");

    elmHeader: HTMLElement = document.createElement("div");
    elmHeaderName: HTMLElement = document.createElement("span");
    elmHeaderPrice: HTMLElement = document.createElement("span");
    elmHeaderLastUpdate: HTMLElement = document.createElement("span");

    constructor() {
        let oStockTable: StockTable = this;

        oStockTable.element.className = "stock-table";

        oStockTable.element.appendChild(oStockTable.createTableHeader());
    }

    createTableHeader(): HTMLElement {
        let oStockTable: StockTable = this;        

        let elmHeader = document.createElement("div");
        elmHeader.className = "stock-row-header";

        oStockTable.elmHeaderName.innerText = "Ticker";
        oStockTable.elmHeaderPrice.innerText = "Price";
        oStockTable.elmHeaderLastUpdate.innerText = "Last Update";
        
        oStockTable.elmHeaderName.className = "stock-ticker";
        oStockTable.elmHeaderPrice.className = "stock-price";
        oStockTable.elmHeaderLastUpdate.className = "stock-last-update";

        elmHeader.appendChild(oStockTable.elmHeaderName);
        elmHeader.appendChild(oStockTable.elmHeaderPrice);
        elmHeader.appendChild(oStockTable.elmHeaderLastUpdate);

        return elmHeader;
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
                oStockTable.element.appendChild(oStockTable.stockRow[oStockTable.stockRow.length - 1].element);
            }
        }
    }
}