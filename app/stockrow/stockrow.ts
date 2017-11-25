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
        oStockRow.elmLastUpdate.className = "last-updated";

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
                //oStockRow.elmLastUpdate.innerHTML = "00:" + (parseInt((time / 60).toFixed(0)) < 10 ? "0" + (time / 60).toFixed(0) : (time / 60).toFixed(0));
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
        }, 1000);
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

        oStockRow.updateTime = new Date();
        oStockRow.previousPrice = oStockRow.price;
        oStockRow.price = strPrice;

        oStockRow.setHistory(oStockRow.price, oStockRow.updateTime);
    }

    renderStockData(strName: string, strPrice: string, strLastUpdatedTime: string): void {
        let oStockRow: StockRow = this;

        oStockRow.elmName.innerHTML = strName;
        oStockRow.elmPrice.innerHTML = parseFloat(strPrice).toFixed(2);
        oStockRow.elmLastUpdate.innerHTML = parseInt(strLastUpdatedTime) < 60 ? "A few Seconds Ago" : strLastUpdatedTime;
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