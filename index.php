<?php session_start(); ?>
<!DOCTYPE html>
<html>
<?php include 'north_head.php';?>
<body>
    <style type="text/css">
        body {
            font-family: 'roboto', sans-serif;
        }
    #snackbar.show, .snackbar-show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }
        #snackbar {
            visibility: hidden;
            min-width: 250px;
            width: 80%;
            background-color: rgb(0, 188, 212);
            color: #fff;
            font-weight: bold;
            text-align: center;
            border-radius: 2px;
            padding: 16px;
            position: fixed;
            z-index: 1;
            right: 50%;
            transform: translateX(50%);
            bottom: 30px;
            transition: all 0.5s ease;
            /*-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;*/
        }
    @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;} 
        to {bottom: 30px; opacity: 1;}
    }

    @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
    }

    @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;} 
        to {bottom: 0; opacity: 0;}
    }

    @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
    }
        h1, input::-webkit-input-placeholder, button {
  font-family: 'roboto', sans-serif;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

form h1 {
  height: 100px;
  width: 100%;
  font-size: 18px;
  background: rgb(0, 188, 212);
  color: white;
  line-height: 150%;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
}

form {
  box-sizing: border-box;
  margin: 0 auto 0;
  padding-top: 1em;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  border-radius: 3px;
}
form h1 {
  box-sizing: border-box;
  padding: 20px;
}

form a {
  font-size: 15px;
  margin-left: 20%;
  text-decoration: none;
}

.material-input {
  margin: 40px 25px;
  width: 90%;
  display: block;
  border: none;
  padding: 10px 0;
  border-bottom: solid 1px rgb(0, 188, 212);
  -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, rgb(0, 188, 212) 4%);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, rgb(0, 188, 212) 4%);
  /*background-position: -300% 0;*/
  background-size: 0 100%;
  background-repeat: no-repeat;
  color: rgb(0, 188, 212);
}
.material-input:focus, .material-input:valid {
  box-shadow: none;
  outline: none;
  /*background-position: 0 0;*/
  background-size: 100% 100%;
}
.material-input:focus::-webkit-input-placeholder, .material-input:valid::-webkit-input-placeholder {
  color: rgb(0, 188, 212);
  font-size: 11px;
  -webkit-transform: translateY(-20px);
          transform: translateY(-20px);
  visibility: visible !important;
}

.material-input-small {
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 60%;
  display: block;
  border: none;
  padding: 10px 0;
  border-bottom: solid 1px rgb(0, 188, 212);
  -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, rgb(0, 188, 212) 4%);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, rgb(0, 188, 212) 4%);
  /*background-position: -300% 0;*/
  background-size: 0 100%;
  background-repeat: no-repeat;
  color: rgb(0, 188, 212);
}

.material-button {
  border: none;
  background: rgb(0, 188, 212);
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 90%;
  height: 3em;
  color: white;
  margin-left: 25px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}
.material-button:hover {
  -webkit-transform: translateY(-3px);
          transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
}

.material-button-small {
  border: none;
  background: rgb(0, 188, 212);
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 60%;
  height: 3em;
  color: white;
  margin-left: 50%;
  margin-bottom: 1%;
  margin-top: 1%;
  transform: translateX(-50%);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}

.material-button-load-button {
  border: none;
  background: rgb(0, 188, 212);
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 60%;
  height: 3em;
  color: white;
  position: absolute;
  margin-left: 50%;
  margin-bottom: 1%;
  margin-top: 1%;
  transform: translateX(-50%);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}

.flex-item {
  flex: .001;
  opacity: 0;
  -webkit-animation: flexGrow 500ms ease forwards 100ms;
  -o-animation: flexGrow 500ms ease forwards 100ms;
  animation: flexGrow 500ms ease forwards 100ms;
}

.flex-item.remove {
  flex: 13em;
  -webkit-animation: flexShrink 500ms ease forwards;
  -o-animation: flexShrink 500ms ease forwards;
  animation: flexShrink 500ms ease forwards;
}

@-webkit-keyframes flexGrow {
  to {
    flex: 13em;
    opacity: 1;
  }
}
@-o-keyframes flexGrow {
  to {
    flex: 13em;
    opacity: 1;
  }
}
@keyframes flexGrow {
  to {
    flex: 13em;
    opacity: 1;
  }
}

@-webkit-keyframes flexShrink {
  to {
    flex: .001;
    opacity: 0;
  }
}
@-o-keyframes flexShrink {
  to {
    flex: .001;
    opacity: 0;
  }
}
@keyframes flexShrink {
  to {
    flex: .001;
    opacity: 0;
  }
}
    .drop {
      position: relative;
    }
    .drop ul {
        margin:0;
        z-index:3;
        -webkit-padding-start:0;
        text-decoration: none;
        position: absolute;
      top:3.5em;
        background-color:#fff;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      -webkit-transform: scale(0);
              transform: scale(0);
      -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 8px 0 rgba(0, 0, 0, 0.12);
    }
        .drop:not(.right) ul {
            left: 1em;
        }
        .drop.right ul {
            right: 1em;
            -webkit-transform-origin: 100% 0;
              transform-origin: 100% 0;
        }
    .drop ul > li {
      display: block;
      width: 100%;
        z-index: 3;
    }
    .drop ul > li > a {
        z-index: 3;
      width: 100%;
      padding: 1em 18px;
      display: inline-block;
      white-space: pre;
      box-sizing: border-box;
        text-decoration: none;
        color:rgb(0, 188, 212);
    }
    .drop ul > li > a:hover {
      background: #ebebeb;
    }
    .drop:hover ul, .drop:focus ul {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
    .sidenav {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #fff;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
        -webkit-box-shadow: 5px 0px 5px -2px rgba(0,0,0,0.32);
        -moz-box-shadow: 5px 0px 5px -2px rgba(0,0,0,0.32);
        box-shadow: 5px 0px 5px -2px rgba(0,0,0,0.32);
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s
    }

    .sidenav a:hover, .offcanvas a:focus{
        color: rgb(0, 188, 212);
        background-color:#ebebeb;
    }

    .sidenav > .close {
        position: absolute;
        top: .1em;
        right: .1em;
        font-size: 36px;
        cursor: pointer;
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    }
        .sidenav > .close:hover {
            color: rgb(0, 188, 212);
        }

    #app {
        transition: margin-left .5s;
    }

    @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
    }
    .blur {

         /* Any browser which supports CSS3 */
        filter: blur(1px);

        /* Webkit */
        -webkit-filter: blur(1px);

        /* Opera */
        -o-filter: blur(2px);
    }
    </style>
    <div class="sidenav" id="drawer">

    </div>
    <main id="app">
        <div style="color: rgba(0, 0, 0, 0.870588); background-color: rgb(0, 188, 212); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; box-sizing: border-box; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; border-radius: 0px; position: relative; z-index: 1100; width: 100%; display: flex; padding-left: 24px; padding-right: 24px;">
            <div style="margin-top: 8px; margin-right: 8px; margin-left: -16px;">
                <button tabindex="0" type="button" style="border: 10px; box-sizing: border-box; display: inline-block; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: pointer; text-decoration: none; margin: 0px; padding: 12px; outline: none; font-size: 0px; font-weight: inherit; transform: translate(0px, 0px); position: relative; overflow: visible; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; width: 48px; height: 48px; background: none;" id="opennav">
                    <div>
                        <span style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; overflow: hidden;"></span>
                        <svg viewBox="0 0 24 24" style="display: inline-block; color: rgb(255, 255, 255); fill: rgb(255, 255, 255); height: 24px; width: 24px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; user-select: none;">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <h1 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0px; padding-top: 0px; letter-spacing: 0px; font-size: 24px; font-weight: 400; color: rgb(255, 255, 255); height: 64px; line-height: 64px; flex: 1 1 0%;" id="page-title">Welcome to Northwind Traders</h1>
            <div style="margin-top: 8px; margin-right: -16px; margin-left: auto;">
                <div style="display: inline-block; position: relative;">
                    <button tabindex="0" type="button" class="drop right" style="color:white;border: 10px; box-sizing: border-box; display: inline-block; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: pointer; text-decoration: none; margin:0; outline: none; font-weight: inherit; transform: translate(0px, 0px); position: relative; overflow: visible; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; width: 48px; height: 48px; background: none;">
                                            <ul>
                      <li><a href="#/register">Register</a></li>
                      <li><a href="#/login">Login</a></li>
                      <li><a href="#/logout">Logout</a></li>
                    </ul>
                        <div>
                            <i class="material-icons" style="font-size:48px;height:48px;width:48px;">account_circle</i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div id="page">
        </div>
    </main>
    <?php include 'north_foot.php';?>
    <script id="sidescript" type="text/javascript">
        var app = dom("#app");
        var
        close = function() {
            dom("#drawer").style({width: 0});
            app.style({"margin-left": 0}); //.removeClass("blur").off("click", click);
        }, 
        open = function() {
           app.style({"margin-left": "250px"}); //.addClass("blur")
            dom("#drawer").style({width: "250px"});
        };
        dom("#drawer").append(dom.icon("close").addClass("close").on("click", close))
            .append(dom.a("#/items", {text: "Shop"}))
            .append(dom.a("#/cart", {text: "Cart"}))
            .append(dom.a("#/orders", {text: "Order History"}));
        dom("#opennav").on("click", open);
    </script>
</body>
</html>