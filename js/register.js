if (!window.dom) {
    throw "Dom.js is required";
}
if (!window.cart) {
    throw "Cart.js is required";
}
if (!window.northwind) {
    throw "Northwind.js is required";
}
window.pages = window.pages || {};
window.pages.register = function () {
    var register = {};
    register.unload = function (container) {
        
    };
    register.load = function (hash, callback) {
        var form = dom.create("form", {action: dom.url() + "api/register", method: "POST" })
            /*.append(dom.create("h1", {text: "Register"}))*/
            .append(dom.create("input", {type: "text", required: "required", placeholder: "First Name", name: "first_name", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Last Name", name: "last_name", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Company", name: "company", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Email Address", name: "email_address", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Job Title", name: "job_title", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Address", name: "address", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "City", name: "city", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "State", name: "state_province", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Zip Code", name: "zip_postal_code", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Country", name: "country_region", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Home Phone", name: "home_phone", "class": "material-input-small"}))
            .append(dom.create("input", {type: "submit", placeholder: "", name: "", text: "Register", "class": "material-button-small"}))
            .append(dom.a("#/login", {text: "Already Registered? Login In"}));
        callback(form);
    };
    northwind.registerPageHandler("Register", /^\/register\/?/i, register.load);
    return register;
}();