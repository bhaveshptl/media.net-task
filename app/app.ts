import { Engine } from "./engine/engine";

export class Application {
    constructor() {
        /// It will create Engine object and append that to application in dom.
        var oEngine = new Engine();
        document.getElementById("app").appendChild(oEngine.start());
    }
}

window.onload = function () {    
    var a = new Application();  /// Application starts from here.
}