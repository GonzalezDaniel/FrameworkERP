
function loginPopulate(){
    clearMain();
    var main = document.getElementById("main");
    main.setAttribute("class", "container");
    loginForm(main);
}

function loginForm(parentNode){
    var form = document.createElement("form");
    form.setAttribute("id", "loginForm");
    parentNode.appendChild(form);

    var fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    var legend = document.createElement("legend");
    legend.appendChild(document.createTextNode("Iniciar Sesión"));
    fieldset.appendChild(legend);

    fieldset.appendChild(addInput("text","Usuario"));
    fieldset.appendChild(addInput("password","Contraseña"));

    var p = document.createElement("p");
    p.setAttribute("id","validationP");
    fieldset.appendChild(p);

    fieldset.appendChild(createButton(validateLogin,"Enviar"));
    
}

function validateLogin(){
    var usu = document.forms["loginForm"]["Usuario"].value;
    var pass = document.forms["loginForm"]["Contraseña"].value;

    if(usu == "prueba" && pass == "prueba"){
        setCookie("username", usu, 30);
        setCookie("password", pass, 30);
        initPopulate();
        checkCookie();
    }else{
        document.getElementById("validationP").innerHTML = "Credendiales incorrectas.";
    }
}

function logOut(){
    deleteCookie("username");
    deleteCookie("password");
    initPopulate();
    checkCookie();
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    var pass=getCookie("password");
    if (user != "") {
        document.getElementById("formButton").style.display="inline-block";
        document.getElementById("login").style.display="none";
        document.getElementById("userSpan").style.display = "inline-block";
        document.getElementById("userSpan").innerHTML = "Bienvenido: "+ user;
        document.getElementById("logout").style.display="inline-block";
    } else {
        document.getElementById("formButton").style.display="none";
        document.getElementById("login").style.display="inline-block";
        document.getElementById("userSpan").style.display = "none";
        document.getElementById("logout").style.display="none";
    }
}

function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};



