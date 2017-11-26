import { WebSocketHelper } from "../websockethelper/websockethelper";
import { HOST_URL, NODE_SERVER_URL } from "../constants/constants";
import { StockTable } from "../stocktable/stocktable";

export class Engine {

    oStockTable: StockTable;

    element: HTMLElement = document.createElement("div");
    elmAppTitle: HTMLElement = document.createElement("h1");

    bAppLoaded: boolean = false;

    constructor() {
        let oEngine: Engine = this;

        oEngine.element.style.display = "none";
        oEngine.render();
    }

    /// It will create app title.
    render(): void {
        let oEngine: Engine = this;

        oEngine.elmAppTitle.className = "app-title";
        oEngine.elmAppTitle.innerText = "(Live) Stocks App";
        oEngine.element.appendChild(oEngine.elmAppTitle);
    }

    /// It will call setdata and return engine element.
    start(): Element {
        let oEngine: Engine = this;

        oEngine.setData();

        return oEngine.element;
    }

    /// It will request to websocket for stock proce.
    setData(): void {
        let oEngine: Engine = this;

        WebSocketHelper.getInstance().create(HOST_URL);
        WebSocketHelper.getInstance().registerEvents({
            "onConnectionOpen": oEngine.onConnectionOpen,
            "onConnectionMessage": oEngine.onConnectionMessage,
            "onConnectionClose": oEngine.onConnectionClose,
            "onConnectionError": oEngine.onConnectionError,
        });
    }

    /// Handler to handle connection open.
    onConnectionOpen = (event: Event) => {
        console.log("Connection established successfully");
    }

    showApplication(): void {
        let oEngine: Engine = this;
        if (!oEngine.bAppLoaded) {
            oEngine.element.style.display = "";
            oEngine.bAppLoaded = true;
            document.getElementById("app-loader").style.display = "none";
        }
    }

    /// Handler will execute each time websocket send message.
    onConnectionMessage = (event: Event) => {
        let oEngine: Engine = this;

        oEngine.showApplication();
        if (!oEngine.oStockTable) {
            oEngine.oStockTable = new StockTable();
            oEngine.element.appendChild(oEngine.oStockTable.element);
        }

        oEngine.oStockTable.setData((<any>event).data);
    }

    /// Handler to handle connection close.
    onConnectionClose = (event: Event) => {
        console.log("Connection closed successfully");
    }

    /// Handler to handle connection errors.
    onConnectionError = (event: Event) => {
        alert("Problem connecting to server");
    }
}