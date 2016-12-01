if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.cart) {
    throw "Login.js is required";
}
if (!window.northwind) {
    throw "Northwind.js is required";
}
window.pages = window.pages || {};
window.pages.login = function () {
    var login = {};
    login.unload = function (container) {
        
    };
    login.load = function (hash, callback) {
        var form = dom.create("form", {action: dom.url + "/api/login", method: "POST" })
            /*.append(dom.create("h1", {text: "Login"}))*/
            .append(dom.create("input", {type: "text", required: "required", placeholder: "User ID", name: "user_id", "class": "material-input"}))
            .append(dom.create("input", {type: "password", required: "required", placeholder: "Password", name: "password", "class": "material-input"}))
            .append(dom.create("input", {type: "submit", placeholder: "", name: "", text: "Register", "class": "material-button"}));
        callback(form);
    };
    northwind.registerPageHandler("Login", /^\/login\/?/i, login.load);
    return login;
}();