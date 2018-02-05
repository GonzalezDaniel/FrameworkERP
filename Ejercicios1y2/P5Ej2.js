"use strict";
//var option =["op1","op2","op3"];
var menu = new Menu();

menu.addOption("opcion1");
menu.addOption("opcion2");
menu.addOption("opcion3");

menu.addSubOption("opcion1","subopcion1");
menu.addSubOption("opcion1","subopcion2");
menu.addSubOption("opcion3","subopcion3");

function writeMenu(){
    var nav = document.getElementsByTagName("nav")[0];
    nav.appendChild(menu.createMenu());
    showMenu();
}

function Menu(){
    
    var _options = [];

    this.addOption = function(opt){
        _options.push(
            {
                option: opt,
                subOption:[]
            }
        );
    }

    this.addSubOption = function(opt, subOpt){
        if(!(_options.every(elem => elem !== opt))){
            console.log("opcion introducida");
        }

        var pos = _options.findIndex(elem => elem.option === opt);

        _options[pos].subOption.push(subOpt);
    }

    this.createMenu = function(){
        var ul = document.createElement("ul");

        _options.forEach(function(element) {
            var subUl = document.createElement("ul");
            var subLi = document.createElement("li");
            element.subOption.forEach(function(elem){
                subUl.appendChild(item(elem,"#"));
            });
            ul.appendChild(item(element.option,"#")).appendChild(subUl);
        });
        return ul;
    }
    
    function item(title,link){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href",link);
        a.appendChild(document.createTextNode(title));
        li.appendChild(a);
        return li;
    }


}
Menu.prototype= {};
Menu.prototype.constructor = Menu;


function showMenu(){
    var menuOptions = document.getElementById("menu1").getElementsByTagName("ul")[0].childNodes;
    for(var i = 0; i<menuOptions.length; i++){
        menuOptions[i].onmouseenter = function(event){
            event.target.childNodes[1].style.display = "block";
        }
        menuOptions[i].onmouseleave = function(event){
            event.target.childNodes[1].style.display = "none";
        }
    }
}
