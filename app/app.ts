import { Engine } from "./engine/engine";

export class Application {
    constructor() {
        var oEngine = new Engine();
        oEngine.start();
    }
}
window.onload = function () {
    var a = new Application();
}