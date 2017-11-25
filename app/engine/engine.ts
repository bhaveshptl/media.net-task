import { WebSocketHelper } from "../websockethelper/websockethelper";
import { HOST_URL } from "../constants/constants";
import { StockTable } from "../stocktable/stocktable";

export class Engine {

    oStockTable: StockTable;    

    constructor() {
    }

    start() {
        let oEngine: Engine = this;
        
        oEngine.setData();        
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
        }

        oEngine.oStockTable.setData((<any>event).data);
    }

    onConnectionClose = (event: Event) => {
        console.log("Connection closed successfully");
    }
}