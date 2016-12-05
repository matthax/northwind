if (!window.dom) {
    throw "Dom.js is required";
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
        var registerButton = dom.create("input", {type: "submit", placeholder: "", name: "", text: "Register", "class": "material-button-small"});
        var form = dom.create("form", {action: dom.url() + "api/register", method: "POST" })
            /*.append(dom.create("h1", {text: "Register"}))*/
            .append(dom.create("input", {type: "text", required: "required", placeholder: "First Name", name: "first_name", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Last Name", name: "last_name", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "Company", name: "company", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", required: "required", placeholder: "Email Address", name: "email_address", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "Job Title", name: "job_title", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "Address", name: "address", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "City", name: "city", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "State", name: "state_province", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "Zip Code", name: "zip_postal_code", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "Country", name: "country_region", "class": "material-input-small"}))
            .append(dom.create("input", {type: "text", placeholder: "Home Phone", name: "home_phone", "class": "material-input-small"}))
            .append(registerButton)
            .append(dom.a("#/login", {text: "Already Registered? Log In"})).on("submit", function(ev) {
                ev.preventDefault();
                registerButton.attr({disabled: "disabled"});
                dom.ajax({
                    type: "POST",
                    url: form.attr("action"),
                    responseType: dom.ajax.RESPONSE_TYPES.JSON,
                    data: new FormData(this),
                    oncomplete: function(xhr, user) {
                        if (user.success) {
                            window.user.fire("login", user);
                            sessionStorage.setItem("user", JSON.stringify(user)); // save the response so we can get their name and all if we want to
                            dom.toast("Hello " + user.first_name + "! Your user ID is " + user.user_id, "tag_faces");
                            window.location.hash = "/items";
                        }
                        else {
                            dom.toast("Oops, " + user.message, "error_outline");
                        }
                        registerButton.removeAttr("disabled");
                    },
                    onerror: function(xhr) {
                        console.error("XHR failed for login", xhr);
                        window.registerdata = xhr;
                        registerButton.removeAttr("disabled");
                    }
                });
                return false;
            });
        callback(form);
    };
    northwind.registerPageHandler("Register", /^\/register\/?/i, register.load);
    return register;
}();