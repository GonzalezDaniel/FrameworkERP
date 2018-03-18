"use strict";

function formPopulate(){
    
    clearMain();
    var main = $("#main").attr("class", "container");
    createNavBar(main);
    
    var selectCont = $("<div></div>").attr("id", "selectContainer");
    main.append(selectCont);

    var tableCont = $("<div></div>").attr("id", "tableContainer");
    main.append(tableCont);

    var formCont = $("<div></div>").attr("id", "formContainer");
    main.append(formCont);

    productTabPopulate();
}

function productTabPopulate(){
    clearTabDiv();
    clearFormDiv();
    var main = $("#main");
    var shopSelect = $("#Tiendas");
    if(shopSelect == null){
        showTiendasSelect(main);
    }
    showTableProduct();
}

function shopTabPopulate(){
    clearTabDiv();
    clearFormDiv();
    clearSelectDiv();
    showTableShop();
}

function categoryTabPopulate(){
    clearTabDiv();
    clearFormDiv();
    clearSelectDiv();
    showTableCategory();
}

function createNavBar(parentNode){
    var nav = $("<nav></nav>").attr("class", "navbar navbar-default navbar-inverse");
    parentNode.append(nav);

    var div = $("<div></div>");
    nav.append(div);

    var divNavHead = $("<div></div>").attr("class", "navbar-header");
    div.append(divNavHead);

    var icon = $("<button></button>").attr("class", "navbar-toggle button-custom");
    icon.attr("data-toggle", "collapse");
    icon.attr("data-target", "#myNavbarForm");
    divNavHead.append(icon);

    var iconBar = $("<span></span>").attr("class", "icon-bar");
    icon.append(iconBar);
    var iconBar = $("<span></span>").attr("class", "icon-bar");
    icon.append(iconBar);
    var iconBar = $("<span></span>").attr("class", "icon-bar");
    icon.append(iconBar);
    
    var divNavData = $("<div></div>");
    divNavData.attr("id", "myNavbarForm");
    divNavData.attr("class", "collapse navbar-collapse");
    div.append(divNavData);

    var ul = $("<ul></ul>").attr("class", "nav navbar-nav nav-center-custom");
    divNavData.append(ul);

    var li = $("<li></li>");
    var a = $("<a></a>").text("Productos");
    li.append(a);
    li.click(productTabPopulate);
    ul.append(li);

    var li = $("<li></li>");
    var a = $("<a></a>");
    a.text("Tiendas");
    li.append(a);
    li.click(shopTabPopulate);
    ul.append(li);

    var li = $("<li></li>");
    var a = $("<a></a>");
    a.text("Categorias");
    li.append(a);
    li.click(categoryTabPopulate);
    ul.append(li);
}

//Funciones de creacion de los distintos formularios

function showTiendasSelect(){
    var store=  StoreHouse.getInstance();
    var parentNode = $("#selectContainer");
    
    var iterableShop = store.shops;
    parentNode.append(addSelect("Tiendas", iterableShop));

    var tiendas = $("#Tiendas").attr("onchange", "changeTableProdByShop()");
}

function showTableProduct(shop){
    var store = StoreHouse.getInstance();
    var parentNode = $("#tableContainer");
    if(shop === 'undefined' || shop == null){
        var iterableProd = store.products;
        shop=store.defaultShop;
    }
    else{
        var iterableProd = store.getShopProducts(shop);
    }

    var table = $("<table></table>").attr("id", "Productos");
    table.attr("class", "table table-bordered tableCrud");
    parentNode.append(table);

    //Creamos la cabecera de la tabla
    var thead = $("<thead></thead>");
    table.append(thead);
    var tr = $("<tr></tr>");
    thead.append(tr);

    tr.append(createTableElem("<th></th>","Nombre", "class", "tdName"));
    tr.append(createTableElem("<th></th>","Descripcion", "class", "tdDesc"));
    tr.append(createTableElem("<th></th>","Precio", "class", "tdPrice"));
    tr.append(createTableElem("<th></th>","Categoria", "class", "tdCategory"));
    tr.append(createTableElem("<th></th>","Accion", "class", "tdButton"));

    //Creamos el cuerpo de la tabla
    var tbody = $("<tbody></tbody>");
    table.append(tbody);

    var items = iterableProd.next();

    while(!items.done){
        var item = items.value;
        if(items.valStock === 'undefined' || items.valStock == null){
            var stock = store.getTotalStock(item);
        }
        else{
            var stock = items.valStock;
        }
        var catTotal="";
        var iterableCat = store.getProductsCategory(item);
        var cats = iterableCat.next();
            while(!cats.done){
                var cat = cats.value;
                catTotal+=cat.title + ", ";
                cats = iterableCat.next();
            }

        var tr = $("<tr></tr>");
        tbody.append(tr);

        tr.append(createTableElem("<td></td>",item.name, "class", "tdName"));
        var descDiv= $("<div></div>").attr("class", "divDesc").text(item.description);

        var tdDes= $("<td></td>").attr("class", "tdDesc");
        tdDes.append(descDiv);

        tr.append(tdDes);
        tr.append(createTableElem("<td></td>",item.price, "class", "tdPrice"));
        tr.append(createTableElem("<td></td>",catTotal, "class", "tdCategory"));
        var tdButton = $("<td></td>").attr("class", "tdButton");
        tr.append(tdButton);

        tdButton.append(createButton(createFunctionEditProductForm(item, stock, shop),"Editar"));

		items = iterableProd.next();
	}

    parentNode.append(createButton(productForm, "Añadir Producto"));
}

function showTableShop(){
    var store=  StoreHouse.getInstance();

    var iterableShop = store.shops;

    var parentNode = $("#tableContainer");
    var table = $("<table></table>").attr("id", "Tiendas");
    table.attr("class", "table table-bordered tableCrud");
    parentNode.append(table);

    //Creamos la cabecera de la tabla
    var thead = $("<thead></thead>");
    table.append(thead);
    var tr = $("<tr></tr>");
    thead.append(tr);

    tr.append(createTableElem("<th></th>","Nombre", "class", "tdName"));
    tr.append(createTableElem("<th></th>","Direccion", "class", "tdAddress"));
    tr.append(createTableElem("<th></th>","Telefono", "class", "tdTel"));
    tr.append(createTableElem("<th></th>","Coordenadas", "class", "tdCoords"));
    tr.append(createTableElem("<th></th>","Accion", "class", "tdButton"));

    //Creamos el cuerpo de la tabla
    var tbody = $("<tbody></tbody>");
    table.append(tbody);

    var items = iterableShop.next();
   
    while(!items.done){
        var item = items.value;
        if(item.coords != undefined){
            var coords = item.coords.latitude+","+item.coords.longitude;
            
        }
        
        var tr = $("<tr></tr>");
        tbody.append(tr);

        tr.append(createTableElem("<td></td>",item.name, "class", "tdName"));
        tr.append(createTableElem("<td></td>",item.address, "class", "tdAddress"));
        tr.append(createTableElem("<td></td>",item.tel, "class", "tdTel"));
        tr.append(createTableElem("<td></td>",coords, "class", "tdCoords"));
        var tdButton = $("<td></td>").attr("class", "tdButton");
        tr.append(tdButton);
        
        tdButton.append(createButton(createFunctionEditShopForm(item),"Editar"));

		items = iterableShop.next();
	}

    var add = $("<button></button>").attr("onclick", "shopForm();");
    add.text("Añadir Tienda");
    parentNode.append(add);   
}

function showTableCategory(){
    var store=  StoreHouse.getInstance();

    var iterableCategory = store.categories;

    var parentNode = $("#tableContainer");
    var table = $("<table></table>");
    table.attr("id", "Categorias");
    table.attr("class", "table table-bordered tableCrud");
    parentNode.append(table);

    //Creamos la cabecera de la tabla
    var thead = $("<thead></thead>");
    table.append(thead);
    var tr = $("<tr></tr>");
    thead.append(tr);

    tr.append(createTableElem("<th></th>","Nombre", "class", "tdTitle"));
    tr.append(createTableElem("<th></th>","Descripcion", "class", "tdCatDesc"));
    tr.append(createTableElem("<th></th>","Accion", "class", "tdButton"));
    
    //Creamos el cuerpo de la tabla
    var tbody = $("<tbody></tbody>");
    table.append(tbody);

    var items = iterableCategory.next();
   
    while(!items.done){
        var item = items.value;

        var tr = $("<tr></tr>");
        tbody.append(tr);

        tr.append(createTableElem("<td></td>",item.title, "class", "tdTitle"));
        tr.append(createTableElem("<td></td>",item.description, "class", "tdCatDesc"));

        var tdButton = $("<td></td>");
        tdButton.attr("class", "tdButton");
        tr.append(tdButton);
        
        var edit = $("<button></button>");
        edit.click(createFunctionEditCategoryForm(item));
        edit.text("Editar");
        tdButton.append(edit);

		items = iterableCategory.next();
	}

    var add = $("<button></button>").attr("onclick", "categoryForm();");
    add.text("Añadir Categoria");
    parentNode.append(add); 
}

function createTableElem(elem,name,attribute, value){
    var element = $(elem);
    element.text(name);
    if(attribute !="" && value !=""){
        element.attr(attribute, value);
    }
    return element;
}

//Muestro productos en la tabla segun la tienda seleccionada

function changeTableProdByShop(){
    var store=  StoreHouse.getInstance();
    var shopList = $("#Tiendas");
    
    var shopSelected = shopList.options[shopList.selectedIndex].value;

    var shop = store.getShopByCif(shopSelected);
    $("#tableContainer").empty();
    showTableProduct(shop);
}

function productForm(parentNode){
    var parentNode = $("#formContainer");
    if(parentNode.children().length >0){
        return;
    }
    var store=  StoreHouse.getInstance();
    var form = $("<form></form>").attr("id", "productForm");
    form.attr("action", "#");
    parentNode.append(form);

    var fieldset = $("<fieldset></fieldset>");
    form.append(fieldset);

    var legend = $("<legend></legend>");
    legend.text("Añadir Producto");
    fieldset.append(legend);

    //Campo oculto para el id del producto
    var idInput = $("<input>").attr("type", "hidden");
    idInput.attr("id","productId");
    fieldset.append(idInput);

    var shopCif = $("<input>").attr("type", "hidden");
    shopCif.attr("id","shopCif");
    fieldset.append(shopCif);

    fieldset.append(addInput("text","Nombre"));
    fieldset.append(addInput("text","Precio"));
    fieldset.append(addInput("text","Stock"));
    fieldset.append(addTextarea("Descripcion"));

    var iterableCat = store.categories;
    fieldset.append(addSelect("Categorias", iterableCat));

    fieldset.append(createButton(insertProduct,"Añadir"));
    fieldset.append(createButton(updateProduct,"Modificar"));
    fieldset.append(createButton(deleteProduct,"Eliminar"));

}

function shopForm(shop){
    var parentNode = $("#formContainer");
    if(parentNode.children().length >0){
        return;
    }
    var store=  StoreHouse.getInstance();
    var form = $("<form></form>").attr("id", "shopForm");
    form.attr("action", "#");
    parentNode.append(form);

    var fieldset = $("<fieldset></fieldset>");
    form.append(fieldset);

    var legend = $("<legend></legend>");
    legend.text("Añadir Tienda");
    fieldset.append(legend);

    fieldset.append(addInput("text","shopCif"));
    fieldset.append(addInput("text","Nombre"));
    fieldset.append(addInput("text","Direccion"));
    fieldset.append(addInput("text","Telefono"));

    var mapDiv = $("<div></div>").attr("id","googleMapForm");
	mapDiv.attr("style","width:50%;height:400px;");
    fieldset.append(mapDiv);
    mapForm(shop);
    
    fieldset.append(createButton(insertShop,"Añadir"));
    fieldset.append(createButton(updateShop,"Modificar"));
    fieldset.append(createButton(deleteShop,"Eliminar"));
}

var lat;
var lng;
function mapForm(shop){
    function getLocationForm() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPositionForm, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
        
    }
    
    function showPositionForm(position) {
    
        var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapCanvas = document.getElementById("googleMapForm");
        var mapOptions = {center: myCenter, zoom: 15};
        var map = new google.maps.Map(mapCanvas, mapOptions);
      
           if(shop != undefined && shop.coords != undefined){
            var contentString = shop.name;
            var mark = new google.maps.LatLng(parseFloat(shop.coords.latitude),parseFloat(shop.coords.longitude));
           }else{
            var contentString = " ";
            var mark = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
           }
               
                var marker = new google.maps.Marker({position:mark,draggable:true});
                marker.addListener('click', createFunctionInfowindow(map,marker, contentString));
                
                marker.setMap(map);
                google.maps.event.addListener(marker, "position_changed", function() {

                    lat = marker.getPosition().lat();
                    lng = marker.getPosition().lng();
                    
});
     
    }

    getLocationForm();
}
  

function categoryForm(){
    var parentNode = $("#formContainer");
    if(parentNode.children().length >0){
        return;
    }
    var store=  StoreHouse.getInstance();
    var form = $("<form></form>");
    form.attr("id", "categoryForm");
    form.attr("action", "#");
    parentNode.append(form);

    var fieldset = $("<fieldset></fieldset>");
    form.append(fieldset);

    var legend = $("<legend></legend>");
    legend.text("Añadir Categoria");
    fieldset.append(legend);

    var categoryOriginalName = $("<input>");
    categoryOriginalName.attr("type", "hidden");
    categoryOriginalName.attr("id","catOriginName");
    fieldset.append(categoryOriginalName);

    fieldset.append(addInput("text","Nombre"));
    fieldset.append(addInput("text","Descripcion"));

    fieldset.append(createButton(insertCategory,"Añadir"));
    fieldset.append(createButton(updateCategory,"Modificar"));
    fieldset.append(createButton(deleteCategory,"Eliminar"));
}

function createButton( onClickFunc, text){
    var button = $("<button></button>");
    button.attr("type","button");
    button.click(onClickFunc);
    button.text(text);
    return button;
}

function editProductForm(prod, stockVal, shop){
    
    var parentNode = $("#formContainer");
    if(!(parentNode.children().length >0)){
        productForm();
    }

   
    $("#productId").val(prod.serialNumber);
    $("#shopCif").val(shop.cif);
    $("#Nombre").val(prod.name);
    $("#Precio").val(prod.price);
    $("#Stock").val(stockVal);
    $("#Descripcion").val(prod.description);
 
}

function editShopForm(shop){
    var parentNode = $("#formContainer");
    if(!(parentNode.children().length >0)){
        shopForm(shop);
    }else{
        clearFormDiv();
        shopForm(shop);
    }


    $("#shopCif").val(shop.cif);
    $("#Nombre").val(shop.name);
    $("#Direccion").val(shop.address);
    $("#Telefono").val(shop.tel);
}

function editCategoryForm(category){
    var parentNode = $("#formContainer");
    if(!(parentNode.children().length >0)){
        categoryForm(category);
    }

    $("#catOriginName").val(category.title);
    $("#Nombre").val(category.title);
    $("#Descripcion").val(category.description);
}

function insertProduct(){
    var store=  StoreHouse.getInstance();

    var name = $("#Nombre").val();
    var price = $("#Precio").val();
    var desc = $("#Descripcion").val();
    var cat = $("#Categorias").val();
    var cat2 = getCat(cat);

    var prod = new Smartphone(name, price, desc);
    
    store.addProduct(prod,cat2);
    productTabPopulate();
}

function insertShop(){
    var store=  StoreHouse.getInstance();
    
    var cif = $("#shopCif").val();
    var name = $("#Nombre").val();
    var address = $("#Direccion").val();
    var tel = $("#Telefono").val();
   var coords = new Coords(lat,lng);
    var shop = new Shop(cif,name, address, tel, coords);
    
    store.addShop(shop);
    shopTabPopulate();
}

function insertCategory(){
    var store=  StoreHouse.getInstance();
   
    var name = $("#Nombre").val();
    var desc = $("#Descripcion").val();

    var cat = new Category(name,desc);
    
    store.addCategory(cat);

    categoryTabPopulate();
}

function updateProduct(){
    var store=  StoreHouse.getInstance();
   
    var prodId = $("#productId").val();
    var prod = store.getProdById(parseInt(prodId));
    var shopCif = $("#shopCif").val();
    var shop = store.getShopByCif(shopCif);

    var name = $("#Nombre").val();
    var price = $("#Precio").val();
    var stockString = $("#Stock").val();
    var stock = parseInt(stockString);
    var desc = $("#Descripcion").val();
    
    prod.name = name;
    prod.price = price;
    store.addQuantityProductInShop(prod,shop,stock);
    prod.description = desc;
    
    updateItem("products",prod.getObject(), prodId);

    productTabPopulate();
}

function updateShop(){
    var store=  StoreHouse.getInstance();
  
    var shopCif = $("#shopCif").val();
    var shop = store.getShopByCif(shopCif);

    var name = $("#Nombre").val();
    var address = $("#Direccion").val();
    var tel = $("#Telefono").val();
    var coords = new Coords(lat,lng);
    
    shop.name = name;
    shop.address = address;
    shop.tel = tel;
    shop.coords = coords;

    updateItem("shops",shop.getObject(), shopCif);

    shopTabPopulate();
}

function updateCategory(){
    var store=  StoreHouse.getInstance();
    
    var originName = $("#catOriginName").val();
    var category = store.getCategoryByTitle(originName);

    var name = $("#Nombre").val();
    var desc = $("#Descripcion").val();
    category.title = name;
    category.description = desc;

    updateItem("categories",category.getObject(), originName);

    categoryTabPopulate();
}

function deleteProduct(){
    var store=  StoreHouse.getInstance();
    var form = $("#productForm");
    var prodId = $("#productId").val();
    var prod = store.getProdById(parseInt(prodId));
   
    store.removeProduct(prod);
    
    deleteItem("products",parseInt(prodId));

    productTabPopulate();
}

function deleteShop(){
    var store=  StoreHouse.getInstance();
    var form = $("#shopForm");
    var shopCif = $("#shopCif").val();
    var shop = store.getShopByCif(shopCif);

    store.removeShop(shop);
    

    deleteItem("shops", shopCif);

    shopTabPopulate();
}

function deleteCategory(){
    var store=  StoreHouse.getInstance();
    var form = $("#categoryForm");
    var originName = $("#catOriginName").val();
    var category = store.getCategoryByTitle(originName);

    store.removeCategory(category);
    

    deleteItem("categories", originName);

    categoryTabPopulate();
}


//Funciones de creacion de elementos genericos de formularios en el DOM

function addInput(type, name, inputClass = "", disab = false){
    var group = $("<div></div>").attr("class", "form-group");
  
    var label = $("<label></label>");
    label.attr("for", name);
    label.text(name);
    group.append(label);
    
    var input = $("<input>");
    input.attr("type", type);
    input.attr("id", name);
    input.attr("class", "form-control");
    input.disabled = disab;
    group.append(input);

    return group;
}

function addTextarea(name, disab=false){
    var group = $("<div></div>").attr("class", "form-group");

    var label = $("<label></label>");
    label.attr("for", name);
    label.text(name);
    group.append(label);

    var input = $("<textarea>");
    input.attr("id", name);
    input.attr("class", "form-control");
    input.disabled = disab;
    group.append(input);

    return group;
}

function addSelect(name, iterable){
    var store=  StoreHouse.getInstance();
    var group = $("<div></div>").attr("class", "form-group");

    var label = $("<label></label>");
    label.attr("for", name);
    label.text(name);
    group.append(label);

    var input = $("<select></select>");
    input.attr("id", name);
    input.attr("class", "form-control");
    group.append(input);

    var items = iterable.next();

    while(!items.done){
        var item = items.value;
        
        var opt = $("<option></option>");
        if(item instanceof Category){
            opt.attr("id", item.title);
            opt.text(item.title);
        }
        else if(item instanceof Product){
            opt.attr("value", item.serialNumber);
            opt.text(item.name);
        }
        else if(item instanceof Shop){
            opt.attr("value", item.cif);
            opt.text(item.name);
        }

        input.append(opt);
        
		items = iterable.next();
	}

    return group;
}

//funciones adicionales

function getCat(catName){
    var store=  StoreHouse.getInstance();
    var iterableCat = store.categories;
    var items = iterableCat.next();
    var catTemp;

    while(!items.done){
        var item = items.value;
    
        if(item.title === catName){
            catTemp = item;
        }
        
		items = iterableCat.next();
    }
    return catTemp;
}

function createFunctionEditProductForm(product, stock,shop){
	return function(){
		return editProductForm(product, stock,shop);
	}
}

function createFunctionEditShopForm(shop){
	return function(){
		return editShopForm(shop);
	}
}

function createFunctionEditCategoryForm(category){
	return function(){
		return editCategoryForm(category);
	}
}

function clearTabDiv(){
	$("#tableContainer").empty();
}

function clearFormDiv(){
	$("#formContainer").empty();
}

function clearSelectDiv(){
	$("#selectContainer").empty();
}