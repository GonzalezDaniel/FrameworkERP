"use strict";

function recursive(){
    var toor = document.getElementById("ejer");
    var temp = [];
    var div = document.createElement("div");
   
    function iterate(current){
        var li2 = document.createElement("li");
        var ul = document.createElement("ul");
        
        var children = current.childNodes;
        for(var i =0, len = children.length; i < len; i++){
           var li = document.createElement("li");
           var txt = "";
           if(children[i].hasAttributes){
               txt += ": { ";
            for (var j = 0; j < children[i].attributes.length; j++) {
                    txt = txt + children[i].attributes[j].name + ", ";
                }
                txt += "}";
            }
           li.innerHTML = children[i].tagName + txt;
            var chul = iterate(children[i]);
            if(children[i].nodeType === 1){
                li.appendChild(chul);
                ul.appendChild(li);
            }
        }
        return ul;
    } 
        div.appendChild(iterate(document.body));
        div.normalize();
        document.body.appendChild(div);
}