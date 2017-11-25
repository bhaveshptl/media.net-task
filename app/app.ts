import { Engine } from "./engine/engine";

export class Application {
    constructor() {
        var oEngine = new Engine();
        document.getElementById("app").appendChild(oEngine.start());
    }
}
window.onload = function () {
    var a = new Application();
}