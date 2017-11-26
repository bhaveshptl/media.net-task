export class StockRow {

    name: string;
    price: string;

    previousPrice: string;
    updateTime: Date;

    public element: HTMLElement = document.createElement("div");
    elmName: HTMLElement = document.createElement("span");
    elmPrice: HTMLElement = document.createElement("span");
    elmLastUpdate: HTMLElement = document.createElement("span");

    lstHistory: (string | Date)[][] = new Array();

    lastUpdateTimer: number;

    constructor(strName: string, strPrice: string) {
        var oStockRow: StockRow = this;

        oStockRow.name = strName;
        oStockRow.price = strPrice;
        oStockRow.updateTime = new Date();

        oStockRow.addElements();
        oStockRow.setHistory(oStockRow.price, oStockRow.updateTime);
        oStockRow.renderStockData(oStockRow.name, oStockRow.price, oStockRow.getLastUpdatedTime());
        oStockRow.watchLastUpdate();
    }

    addElements(): void {
        var oStockRow: StockRow = this;

        oStockRow.element.className = "stock-row";

        oStockRow.elmName.className = "stock-name";
        oStockRow.elmPrice.className = "stock-price";
        oStockRow.elmLastUpdate.className = "stock-last-update";

        oStockRow.element.appendChild(oStockRow.elmName);
        oStockRow.element.appendChild(oStockRow.elmPrice);
        oStockRow.element.appendChild(oStockRow.elmLastUpdate);
    }

    watchLastUpdate(): void {
        var oStockRow: StockRow = this;

        oStockRow.lastUpdateTimer = window.setInterval(() => {
            var timeDiff: string = oStockRow.getLastUpdatedTime();
            let time: number = parseInt((parseInt(timeDiff) / 1000).toFixed(0));

            if (time / 60 < 1) {
                oStockRow.elmLastUpdate.innerHTML = "A few Seconds Ago";
            }
            else if (time / (60 * 60) < 1) {
                oStockRow.elmLastUpdate.innerHTML = parseInt((time / 60).toFixed(0)) + " minutes ago";
            }
            else if (time / (60 * 60 * 60) < 1) {
                if (oStockRow.isDateToday(oStockRow.updateTime)) {
                    oStockRow.elmLastUpdate.innerHTML = oStockRow.getTimeFromDate(oStockRow.updateTime, true);
                }
                else {
                    oStockRow.elmLastUpdate.innerHTML = oStockRow.getDayMonthFromDate(oStockRow.updateTime) + " " + oStockRow.getTimeFromDate(oStockRow.updateTime, true);
                }
            }
        }, 60000);
    }

    isDateToday(oDate: Date): boolean {
        if (new Date().getFullYear() == oDate.getFullYear()
            && new Date().getMonth() == oDate.getMonth()
            && new Date().getDay() == oDate.getDay()) {
            return true;
        }
        return false;
    }

    getTimeFromDate(oDate: Date, bIs12hr?: boolean): string {
        if (bIs12hr) {
            return oDate.toLocaleTimeString().split(":")[0] + ":"
                + oDate.toLocaleTimeString().split(":")[1] + " "
                + oDate.toLocaleTimeString().split(":")[2].split(" ")[1];
        }
        else {
            return oDate.toTimeString().split(":")[0] + ":"
                + oDate.toTimeString().split(":")[1];
        }
    }

    getDayMonthFromDate(oDate: Date): string {
        return oDate.toDateString().split(" ")[2] + " " + oDate.toDateString().split(" ")[1];
    }

    updateData(strName: string, strPrice: string): void {
        let oStockRow: StockRow = this;

        let a: boolean = Math.random() * 10 > 5;
        let pr:number = parseFloat(parseFloat(strPrice).toFixed(2));
        strPrice = a ? (pr += 0.1).toString() : (pr -= 0.1).toString();

        oStockRow.updateTime = new Date();
        oStockRow.price = strPrice;

        oStockRow.renderStockData(strName, strPrice, oStockRow.getLastUpdatedTime());
        oStockRow.setHistory(oStockRow.price, oStockRow.updateTime);

        oStockRow.previousPrice = oStockRow.price;
    }

    renderStockData(strName: string, strPrice: string, strLastUpdatedTime: string): void {
        let oStockRow: StockRow = this;

        oStockRow.elmName.innerHTML = strName;
        oStockRow.elmPrice.innerHTML = parseFloat(strPrice).toFixed(2);
        if (parseInt(strLastUpdatedTime) < 60) {
            oStockRow.elmLastUpdate.innerHTML = "A few Seconds Ago";
        }
        
        if (oStockRow.previousPrice) {
            if(parseFloat(strPrice).toFixed(2) != parseFloat(oStockRow.previousPrice).toFixed(2)){
                oStockRow.elmPrice.classList.remove("stock-price-increase");
                oStockRow.elmPrice.classList.remove("stock-price-decrease");
            }        
            if (parseFloat(strPrice).toFixed(2) > parseFloat(oStockRow.previousPrice).toFixed(2)) {
                oStockRow.elmPrice.classList.add("stock-price-increase");
            }
            else if (parseFloat(strPrice).toFixed(2) < parseFloat(oStockRow.previousPrice).toFixed(2)) {
                oStockRow.elmPrice.classList.add("stock-price-decrease");
            }
        }        
    }

    setHistory(strPrice: string, strTime: Date): void {
        let oStockRow: StockRow = this;

        if (!oStockRow.lstHistory[oStockRow.lstHistory.length - 1]
            || (oStockRow.lstHistory[oStockRow.lstHistory.length - 1]
                && oStockRow.lstHistory[oStockRow.lstHistory.length - 1][0] != oStockRow.price))
            oStockRow.lstHistory.push([oStockRow.price, oStockRow.updateTime]);
    }

    getLastUpdatedTime(): string {
        let oStockRow: StockRow = this;

        var timeDiff: number = new Date().getTime() - (<Date>oStockRow.lstHistory[oStockRow.lstHistory.length - 1][1]).getTime();

        return timeDiff.toString();
    }
}