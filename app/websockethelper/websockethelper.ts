export class WebSocketHelper {

    public static instance: WebSocketHelper;
    private oWebSocket: WebSocket;

    private constructor() {
    }

    public static getInstance(): WebSocketHelper {
        if (!WebSocketHelper.instance) {
            WebSocketHelper.instance = new WebSocketHelper();
        }
        return WebSocketHelper.instance;
    }

    public create(url: string): WebSocket {
        var oWebSocketHelper: WebSocketHelper = this;

        oWebSocketHelper.oWebSocket = new WebSocket(url);        
        return oWebSocketHelper.oWebSocket;
    }

    public registerEvents(options: any) {
        var oWebSocketHelper: WebSocketHelper = this;

        if (options["onConnectionOpen"]) {
            oWebSocketHelper.oWebSocket.onopen = options["onConnectionOpen"];
        }

        if (options["onConnectionMessage"]) {
            oWebSocketHelper.oWebSocket.onmessage = options["onConnectionMessage"];
        }

        if (options["onConnectionClose"]) {
            oWebSocketHelper.oWebSocket.onclose = options["onConnectionClose"];
        }

        if (options["onConnectionError"]) {
            oWebSocketHelper.oWebSocket.onerror = options["onConnectionError"];
        }
    }
}