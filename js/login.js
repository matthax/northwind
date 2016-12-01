if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.login) {
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
        var form = dom.create("form", {action: dom.url() + "api/login", method: "POST" })
            /*.append(dom.create("h1", {text: "Login"}))*/
            .append(dom.create("input", {type: "text", required: "required", placeholder: "User ID", name: "user_id", "class": "material-input-small"}))
            .append(dom.create("input", {type: "password", required: "required", placeholder: "Password (psssstttt... it's red123)", name: "password", "class": "material-input-small"}))
            .append(dom.create("input", {type: "submit", placeholder: "", name: "", text: "Register", "class": "material-button-small"}))
            .append(dom.a("#/register", {text: "No Login Info? Sign Up Here"}));
        callback(form); 
    };
    northwind.registerPageHandler("Login", /^\/login\/?/i, login.load);
    return login;
}();