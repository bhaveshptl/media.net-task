export class Application {
    constructor() {        
        document.getElementById("app").innerHTML = "HelloWorld!!";
    }
}
window.onload = function () {
    var a = new Application();
}