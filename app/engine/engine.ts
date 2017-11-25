import { WebSocketHelper } from "../websockethelper/websockethelper";
import { HOST_URL } from "../constants/constants";
import { StockTable } from "../stocktable/stocktable";

export class Engine {

    oStockTable: StockTable;

    element: HTMLElement = document.createElement("div");

    constructor() {
    }

    start(): Element {
        let oEngine: Engine = this;
        
        oEngine.setData();

        return oEngine.element;
    }

    setData(): void {
        let oEngine: Engine = this;

        WebSocketHelper.getInstance().create(HOST_URL);
        WebSocketHelper.getInstance().registerEvents({
            "onConnectionOpen": oEngine.onConnectionOpen,
            "onConnectionMessage": oEngine.onConnectionMessage,
            "onConnectionClose": oEngine.onConnectionClose
        });
    }

    onConnectionOpen = (event: Event) => {
        console.log("Connection established successfully");
    }

    onConnectionMessage = (event: Event) => {
        let oEngine: Engine = this;
        
        if (!oEngine.oStockTable) {
            oEngine.oStockTable = new StockTable();
            oEngine.element.appendChild(oEngine.oStockTable.element);
        }

        oEngine.oStockTable.setData((<any>event).data);
    }

    onConnectionClose = (event: Event) => {
        console.log("Connection closed successfully");
    }
}