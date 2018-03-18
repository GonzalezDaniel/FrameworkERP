
function loginPopulate(){
    clearMain();
    var main = $("#main");
    //main.attr("class", "container");
    loginForm(main);
}

function loginForm(parentNode){
    var form = $("<form></form>");
    form.attr("id", "loginForm");
    form.attr("action", "#");
    parentNode.append(form);

    var fieldset = $("<fieldset></fieldset>");
    form.append(fieldset);

    var legend = $("<legend></legend>");
    legend.text("Iniciar Sesión");
    fieldset.append(legend);

    fieldset.append(addInput("text","Usuario"));
    fieldset.append(addInput("password","Contraseña"));

    var p = $("<p></p>");
    p.attr("id","validationP");
    fieldset.append(p);

    var button = $("<button></button>");
    button.attr("type","button");
    button.click(validateLogin);
    button.text("Enviar");

    fieldset.append(button);
    
}

function validateLogin(){
    var usu = $("#Usuario").val();
    var pass = $("#Contraseña").val();

    if(usu == "prueba" && pass == "prueba"){
        setCookie("username", usu, 30);
        setCookie("password", pass, 30);
        initPopulate();
        checkCookie();
    }else{
        $("#validationP").innerHTML = "Credendiales incorrectas.";
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
        $("#formButton").css("display","inline-block");
        $("#login").css("display","none");
        $("#userSpan").css("display","inline-block");
        $("#userSpan").text("Bienvenido: "+ user);
        $("#logout").css("display","inline-block");
        $("#createJson").css("display","inline-block");
    } else {
        $("#formButton").css("display","none");
        $("#login").css("display","inline-block");
        $("#userSpan").css("display", "none");
        $("#logout").css("display","none");
        $("#createJson").css("display","none");
    }
}

function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};



