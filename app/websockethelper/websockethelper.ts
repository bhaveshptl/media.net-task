/// Create singlton class to send websocket request.
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

    /// It will create websocket connection.
    public create(url: string): WebSocket {
        var oWebSocketHelper: WebSocketHelper = this;

        oWebSocketHelper.oWebSocket = new WebSocket(url);        
        return oWebSocketHelper.oWebSocket;
    }

    /// It will register websocket events according to given option in form of JSON.
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