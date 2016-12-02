if (!window.dom) {
    throw "Dom.js is required";
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
        var loginButton = dom.create("input", {type: "submit", placeholder: "", name: "", text: "Register", "class": "material-button-small"});
        var form = dom.create("form", {action: dom.url() + "api/login", method: "POST" })
            /*.append(dom.create("h1", {text: "Login"}))*/
            .append(dom.create("input", {type: "text", required: "required", placeholder: "User ID", name: "user_id", "class": "material-input-small"}))
            .append(dom.create("input", {type: "password", required: "required", placeholder: "Password (psssstttt... it's red123)", name: "password", "class": "material-input-small"}))
            .append(loginButton)
            .append(dom.a("#/register", {text: "No Login Info? Sign Up Here"})).on("submit", function(ev) {
                ev.preventDefault();
                loginButton.attr({disabled: "disabled"});
                dom.ajax({
                    type: "POST",
                    url: form.attr("action"),
                    responseType: dom.ajax.RESPONSE_TYPES.JSON,
                    data: new FormData(this),
                    oncomplete: function(xhr, user) {
                        if (user.success) {
                            sessionStorage.setItem("user", JSON.stringify(user)); // save the response so we can get their name and all if we want to
                            dom.toast("Welcome back " + user.first_name + "!", "tag_faces");
                            window.setTimeout(function() {location.reload()}, 1000);
                        }
                        else {
                            dom.toast("Oops, " + user.message, "error_outline");
                        }
                        loginButton.removeAttr("disabled");
                    },
                    onerror: function(xhr) {
                        console.error("XHR failed for login", xhr);
                        window.logindata = xhr;
                        loginButton.removeAttr("disabled");
                    }
                });
                return false;
            });
        callback(form); 
    };
    northwind.registerPageHandler("Login", /^\/login\/?/i, login.load);
    return login;
}();