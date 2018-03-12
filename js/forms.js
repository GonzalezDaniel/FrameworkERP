"use strict";

function formPopulate(){
    
    clearMain();
    var main = document.getElementById("main");
    main.setAttribute("class", "container");
    createNavBar(main);
    

    var selectCont = document.createElement("div");
    selectCont.setAttribute("id", "selectContainer");
    main.appendChild(selectCont);

    var tableCont = document.createElement("div");
   // tableCont.setAttribute("class", "container");
    tableCont.setAttribute("id", "tableContainer");
    main.appendChild(tableCont);

    var formCont = document.createElement("div");
    //formCont.setAttribute("class", "container");
    formCont.setAttribute("id", "formContainer");
    main.appendChild(formCont);

    //showTiendasSelect(main);
    productTabPopulate();
    //tabs(main);
   // productTabPopulate();
   // shopTabPopulate();
    //categoryTabPopulate();
}

function productTabPopulate(){
    clearTabDiv();
    clearFormDiv();
    var main = document.getElementById("main");
    var shopSelect = document.getElementById("Tiendas");
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
    var nav = document.createElement("nav");
    nav.setAttribute("class", "navbar navbar-default navbar-inverse");
    parentNode.appendChild(nav);

    var div = document.createElement("div");
    nav.appendChild(div);

    var divNavHead = document.createElement("div");
    divNavHead.setAttribute("class", "navbar-header");
    div.appendChild(divNavHead);

    var icon = document.createElement("button");
    icon.setAttribute("class", "navbar-toggle button-custom");
    icon.setAttribute("data-toggle", "collapse");
    icon.setAttribute("data-target", "#myNavbarForm");
    divNavHead.appendChild(icon);

    var iconBar = document.createElement("span");
    iconBar.setAttribute("class", "icon-bar");
    icon.appendChild(iconBar);
    var iconBar = document.createElement("span");
    iconBar.setAttribute("class", "icon-bar");
    icon.appendChild(iconBar);
    var iconBar = document.createElement("span");
    iconBar.setAttribute("class", "icon-bar");
    icon.appendChild(iconBar);
    
    var divNavData = document.createElement("div");
    divNavData.setAttribute("id", "myNavbarForm");
    divNavData.setAttribute("class", "collapse navbar-collapse");
    div.appendChild(divNavData);

    var ul = document.createElement("ul");
    ul.setAttribute("class", "nav navbar-nav nav-center-custom");
    divNavData.appendChild(ul);

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.appendChild(document.createTextNode("Productos"));
    li.appendChild(a);
    li.addEventListener("click",productTabPopulate);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.appendChild(document.createTextNode("Tiendas"));
    li.appendChild(a);
    li.addEventListener("click",shopTabPopulate);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.appendChild(document.createTextNode("Categorias"));
    li.appendChild(a);
    li.addEventListener("click",categoryTabPopulate);
    ul.appendChild(li);
}

//Funciones de creacion de los distintos formularios

function showTiendasSelect(){
    var store=  StoreHouse.getInstance();
    var parentNode = document.getElementById("selectContainer");
    
    var iterableShop = store.shops;
    parentNode.appendChild(addSelect("Tiendas", iterableShop));

    var tiendas = document.getElementById("Tiendas");
    tiendas.setAttribute("onchange", "changeTableProdByShop()");
}

function showTableProduct(shop){
    var store=  StoreHouse.getInstance();
    var parentNode = document.getElementById("tableContainer");
    if(shop === 'undefined' || shop == null){
        var iterableProd = store.products;
        shop=store.defaultShop;
    }
    else{
        var iterableProd = store.getShopProducts(shop);
    }

    /*var iterableShop = store.shops;
    parentNode.appendChild(addSelect("Tiendas", iterableShop));

    var tiendas = document.getElementById("Tiendas");
    tiendas.setAttribute("onchange", "changeTableProdByShop()");*/

    var table = document.createElement("table");
    table.setAttribute("id", "Productos");
    table.setAttribute("class", "table table-bordered tableCrud");
    parentNode.appendChild(table);

    //Creamos la cabecera de la 
    var thead = document.createElement("thead");
    table.appendChild(thead);
    var tr = document.createElement("tr");
    thead.appendChild(tr);

    tr.appendChild(createTableElem("th","Nombre", "class", "tdName"));
    tr.appendChild(createTableElem("th","Descripcion", "class", "tdDesc"));
    tr.appendChild(createTableElem("th","Precio", "class", "tdPrice"));
    tr.appendChild(createTableElem("th","Categoria", "class", "tdCategory"));
    tr.appendChild(createTableElem("th","Accion", "class", "tdButton"));

    //Creamos el cuerpo de la tabla
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

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

        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        tr.appendChild(createTableElem("td",item.name, "class", "tdName"));
        //Desc
        var descDiv= document.createElement("div");
        descDiv.setAttribute("class", "divDesc");
        descDiv.appendChild(document.createTextNode(item.description));

        var tdDes= document.createElement("td");
        tdDes.setAttribute("class", "tdDesc");
        tdDes.appendChild(descDiv);

        tr.appendChild(tdDes);
        tr.appendChild(createTableElem("td",item.price, "class", "tdPrice"));
        tr.appendChild(createTableElem("td",catTotal, "class", "tdCategory"));
        var tdButton = document.createElement("td");
        tdButton.setAttribute("class", "tdButton");
        tr.appendChild(tdButton);
        
        /*var opt = document.createElement("option");
        if(item instanceof Category){
            opt.setAttribute("id", item.title);
            opt.appendChild(document.createTextNode(item.title));
        }
        else/*(item instanceof Shop || item instanceof Product)*///{
           // console.log(item.value);
           /* opt.setAttribute("value", item.serialNumber);
            opt.appendChild(document.createTextNode(item.name));
        }

        input.appendChild(opt);*/
     // var edit = document.createElement("button");
        //edit.setAttribute("onclick", "createFunctionEditProductForm();");
        /*edit.addEventListener("click",createFunctionEditProductForm(item, stock, shop));
        edit.appendChild(document.createTextNode("Editar"));
        tdButton.appendChild(edit);*/

        tdButton.appendChild(createButton(createFunctionEditProductForm(item, stock, shop),"Editar"));

        var remove = document.createElement("button");
        remove.setAttribute("onclick", "editProduct();");
        remove.appendChild(document.createTextNode("Eliminar"));
        tdButton.appendChild(remove);

		items = iterableProd.next();
	}

    /*var add = document.createElement("button");
    add.setAttribute("onclick", "productForm();");
    add.appendChild(document.createTextNode("Añadir Producto"));
    parentNode.appendChild(add);*/
    parentNode.appendChild(createButton(productForm, "Añadir Producto"));
   
}

function showTableShop(){
    var store=  StoreHouse.getInstance();

    var iterableShop = store.shops;

    var parentNode = document.getElementById("tableContainer");
    var table = document.createElement("table");
    table.setAttribute("id", "Tiendas");
    table.setAttribute("class", "table table-bordered tableCrud");
    parentNode.appendChild(table);

    //Creamos la cabecera de la 
    var thead = document.createElement("thead");
    table.appendChild(thead);
    var tr = document.createElement("tr");
    thead.appendChild(tr);

    tr.appendChild(createTableElem("th","Nombre", "class", "tdName"));
    tr.appendChild(createTableElem("th","Direccion", "class", "tdAddress"));
    tr.appendChild(createTableElem("th","Telefono", "class", "tdTel"));
    tr.appendChild(createTableElem("th","Coordenadas", "class", "tdCoords"));
    tr.appendChild(createTableElem("th","Accion", "class", "tdButton"));

    //Creamos el cuerpo de la tabla
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var items = iterableShop.next();
   

    while(!items.done){
        var item = items.value;

        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        tr.appendChild(createTableElem("td",item.name, "class", "tdName"));
        tr.appendChild(createTableElem("td",item.address, "class", "tdAddress"));
        tr.appendChild(createTableElem("td",item.tel, "class", "tdTel"));
        tr.appendChild(createTableElem("td",item.coords, "class", "tdCoords"));
        var tdButton = document.createElement("td");
        tdButton.setAttribute("class", "tdButton");
        tr.appendChild(tdButton);
        
        tdButton.appendChild(createButton(createFunctionEditShopForm(item),"Editar"));

        var remove = document.createElement("button");
        remove.setAttribute("onclick", "editProduct();");
        remove.appendChild(document.createTextNode("Eliminar"));
        tdButton.appendChild(remove);

		items = iterableShop.next();
	}

    var add = document.createElement("button");
    add.setAttribute("onclick", "shopForm();");
    add.appendChild(document.createTextNode("Añadir Tienda"));
    parentNode.appendChild(add);
   
}

function showTableCategory(){
    var store=  StoreHouse.getInstance();

    var iterableCategory = store.categories;

    var parentNode = document.getElementById("tableContainer");
    var table = document.createElement("table");
    table.setAttribute("id", "Categorias");
    table.setAttribute("class", "table table-bordered tableCrud");
    parentNode.appendChild(table);

    //Creamos la cabecera de la 
    var thead = document.createElement("thead");
    table.appendChild(thead);
    var tr = document.createElement("tr");
    thead.appendChild(tr);

    tr.appendChild(createTableElem("th","Nombre", "class", "tdTitle"));
    tr.appendChild(createTableElem("th","Descripcion", "class", "tdCatDesc"));
    tr.appendChild(createTableElem("th","Accion", "class", "tdButton"));
    

    //Creamos el cuerpo de la tabla
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var items = iterableCategory.next();
   

    while(!items.done){
        var item = items.value;

        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        tr.appendChild(createTableElem("td",item.title, "class", "tdTitle"));
        tr.appendChild(createTableElem("td",item.description, "class", "tdCatDesc"));

        var tdButton = document.createElement("td");
        tdButton.setAttribute("class", "tdButton");
        tr.appendChild(tdButton);
        
        var edit = document.createElement("button");
        //edit.setAttribute("onclick", "createFunctionEditProductForm();");
        edit.addEventListener("click",createFunctionEditCategoryForm(item));
        edit.appendChild(document.createTextNode("Editar"));
        tdButton.appendChild(edit);

        var remove = document.createElement("button");
        remove.setAttribute("onclick", "editProduct();");
        remove.appendChild(document.createTextNode("Eliminar"));
        tdButton.appendChild(remove);

		items = iterableCategory.next();
	}

    var add = document.createElement("button");
    add.setAttribute("onclick", "categoryForm();");
    add.appendChild(document.createTextNode("Añadir Categoria"));
    parentNode.appendChild(add);
   
}

function createTableElem(elem,name,attribute, value){
    var element = document.createElement(elem);
    element.appendChild(document.createTextNode(name));
    if(attribute !="" && value !=""){
        element.setAttribute(attribute, value);
    }
    return element;
}

//Muestro productos en la tabla segun la tienda seleccionada

function changeTableProdByShop(){
    var store=  StoreHouse.getInstance();
    var shopList = document.getElementById("Tiendas");
    
    var shopSelected = shopList.options[shopList.selectedIndex].value;

    var shop = store.getShopByCif(shopSelected);
    var parentNode = document.getElementById("tableContainer");
    while(parentNode.hasChildNodes()){
		parentNode.removeChild(parentNode.firstChild);
    }
    showTableProduct(shop);
}

/*
function crudProduct(parentNode){
    var store=  StoreHouse.getInstance();
    var form = document.createElement("form");
    form.setAttribute("id", "Productos");
    parentNode.appendChild(form);

    var fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    var legend = document.createElement("legend");
    legend.appendChild(document.createTextNode("Productos"));
    fieldset.appendChild(legend);

    var iterableProd = store.products;
    fieldset.appendChild(addSelect("Productos", iterableProd));

    var submit = document.createElement("button");
    submit.setAttribute("onclick", "editProduct();");
    submit.appendChild(document.createTextNode("Editar"));
    fieldset.appendChild(submit);
}
*/

function productForm(parentNode){
    var parentNode = document.getElementById("formContainer");
    if(parentNode.hasChildNodes()){
        return;
    }
    var store=  StoreHouse.getInstance();
    var form = document.createElement("form");
    form.setAttribute("id", "productForm");
    parentNode.appendChild(form);

    var fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    var legend = document.createElement("legend");
    legend.appendChild(document.createTextNode("Añadir Producto"));
    fieldset.appendChild(legend);

    //Campo oculto para el id del producto
    var idInput = document.createElement("input");
    idInput.setAttribute("type", "hidden");
    idInput.setAttribute("id","productId");
    fieldset.appendChild(idInput);

    var shopCif = document.createElement("input");
    shopCif.setAttribute("type", "hidden");
    shopCif.setAttribute("id","shopCif");
    fieldset.appendChild(shopCif);

    fieldset.appendChild(addInput("text","Nombre"));
    fieldset.appendChild(addInput("text","Precio"));
    fieldset.appendChild(addInput("text","Stock"));
    fieldset.appendChild(addTextarea("Descripcion"));
    var iterableCat = store.categories;
    fieldset.appendChild(addSelect("Categorias", iterableCat));

    fieldset.appendChild(createButton(insertProduct,"Añadir"));
    fieldset.appendChild(createButton(updateProduct,"Modificar"));
    fieldset.appendChild(createButton(insertProduct,"Eliminar"));

    /*var insertButton = document.createElement("button");
    insertButton.setAttribute("id", "insert");
    insertButton.setAttribute("onclick", "manageProduct();");
    insertButton.appendChild(document.createTextNode("Añadir"));
    fieldset.appendChild(insertButton);

    var updateButton = document.createElement("button");
    updateButton.setAttribute("id", "update");
    updateButton.setAttribute("onclick", "updateProduct();");
    updateButton.appendChild(document.createTextNode("Modificar"));
    fieldset.appendChild(updateButton);

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "update");
    deleteButton.setAttribute("onclick", "manageProduct();");
    deleteButton.appendChild(document.createTextNode("Eliminar"));
    fieldset.appendChild(deleteButton);*/

}

function shopForm(){
    var parentNode = document.getElementById("formContainer");
    if(parentNode.hasChildNodes()){
        return;
    }
    var store=  StoreHouse.getInstance();
    var form = document.createElement("form");
    form.setAttribute("id", "shopForm");
    parentNode.appendChild(form);

    var fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    var legend = document.createElement("legend");
    legend.appendChild(document.createTextNode("Añadir Tienda"));
    fieldset.appendChild(legend);

    fieldset.appendChild(addInput("text","shopCif"));
    fieldset.appendChild(addInput("text","Nombre"));
    fieldset.appendChild(addInput("text","Direccion"));
    fieldset.appendChild(addInput("text","Telefono"));
    fieldset.appendChild(addInput("text","Coordenadas"));

    fieldset.appendChild(createButton(insertShop,"Añadir"));
    fieldset.appendChild(createButton(updateShop,"Modificar"));
    fieldset.appendChild(createButton(insertProduct,"Eliminar"));
}

function categoryForm(){
    var parentNode = document.getElementById("formContainer");
    if(parentNode.hasChildNodes()){
        return;
    }
    var store=  StoreHouse.getInstance();
    var form = document.createElement("form");
    form.setAttribute("id", "categoryForm");
    parentNode.appendChild(form);

    var fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    var legend = document.createElement("legend");
    legend.appendChild(document.createTextNode("Añadir Categoria"));
    fieldset.appendChild(legend);

    var categoryOriginalName = document.createElement("input");
    categoryOriginalName.setAttribute("type", "hidden");
    categoryOriginalName.setAttribute("id","catOriginName");
    fieldset.appendChild(categoryOriginalName);

    fieldset.appendChild(addInput("text","Nombre"));
    fieldset.appendChild(addInput("text","Descripcion"));

    fieldset.appendChild(createButton(insertCategory,"Añadir"));
    fieldset.appendChild(createButton(updateCategory,"Modificar"));
    fieldset.appendChild(createButton(insertProduct,"Eliminar"));
}

function createButton( onClickFunc, text){
    var button = document.createElement("button");
    //button.setAttribute("id", id);
   // button.setAttribute("onclick", onClickFunc);
    button.addEventListener("click",onClickFunc);
    button.appendChild(document.createTextNode(text));
    return button;
}

function editProductForm(prod, stockVal, shop){
    
    var parentNode = document.getElementById("formContainer");
    if(!parentNode.hasChildNodes()){
        productForm();
    }

    var form = document.getElementById("productForm");
    //var prod = form.elements.namedItem("Productos").value;
    //var name = document.getElementById("Nombre");
    //var name = document.getElementById("Nombre");
    var id = form.elements.namedItem("productId");
    var cif = form.elements.namedItem("shopCif");
    var name = form.elements.namedItem("Nombre");
    var price = form.elements.namedItem("Precio");
    var stock = form.elements.namedItem("Stock");
    var desc = form.elements.namedItem("Descripcion");
    //name.disabled=true;
    
    id.value = prod.serialNumber;
    cif.value = shop.cif;
    name.value = prod.name;
    price.value = prod.price;
    stock.value = stockVal;
    desc.value = prod.description;

   // name.appendChild(document.createTextNode(prodId.name));
}

function editShopForm(shop){
    var parentNode = document.getElementById("formContainer");
    if(!parentNode.hasChildNodes()){
        shopForm();
    }

    var form = document.getElementById("shopForm");
    var cif = form.elements.namedItem("shopCif");
    var name = form.elements.namedItem("Nombre");
    var address = form.elements.namedItem("Direccion");
    var tel = form.elements.namedItem("Telefono");
    var coord = form.elements.namedItem("Coordenadas");
 
    cif.value = shop.cif;
    name.value = shop.name;
    address.value = shop.address;
    tel.value = shop.tel;
    coord.value = shop.coords;
}

function editCategoryForm(category){
    var parentNode = document.getElementById("formContainer");
    if(!parentNode.hasChildNodes()){
        categoryForm(category);
    }

    var form = document.getElementById("categoryForm");
    var catOriginName = form.elements.namedItem("catOriginName");
    var name = form.elements.namedItem("Nombre");
    var desc = form.elements.namedItem("Descripcion");
 
    catOriginName.value = category.title;
    name.value = category.title;
    desc.value = category.description;
}

function insertProduct(){
    var store=  StoreHouse.getInstance();
    var form = document.getElementById("productForm");

    var name = form.elements.namedItem("Nombre").value;
    var price = form.elements.namedItem("Precio").value;
    var desc = form.elements.namedItem("Descripcion").value;
    var cat = form.elements.namedItem("Categorias").value;
    var cat2 = getCat(cat);

    var prod = new Smartphone(name, price, desc);
	//s1.images="xiaomi.jpg";
    
    store.addProduct(prod,cat2);

}

function insertShop(){
    var store=  StoreHouse.getInstance();
    var form = document.getElementById("shopForm");

    var cif = form.elements.namedItem("shopCif").value;
    var name = form.elements.namedItem("Nombre").value;
    var address = form.elements.namedItem("Direccion").value;
    var tel = form.elements.namedItem("Telefono").value;
    var coord = form.elements.namedItem("Coordenadas").value;

    var shop = new Shop(cif,name, address, tel, coord);
    
    store.addShop(shop);
}

function insertCategory(){
    var store=  StoreHouse.getInstance();
    var form = document.getElementById("categoryForm");

    var name = form.elements.namedItem("Nombre").value;
    var desc = form.elements.namedItem("Descripcion").value;

    var cat = new Category(name,desc);
    
    store.addCategory(cat);
}

function updateProduct(){
    var store=  StoreHouse.getInstance();
    var form = document.getElementById("productForm");
    var prodId = form.elements.namedItem("productId").value;
    var prod = store.getProdById(parseInt(prodId));
    var shopCif = form.elements.namedItem("shopCif").value;
    var shop = store.getShopByCif(shopCif);

    var name = form.elements.namedItem("Nombre").value;
    var price = form.elements.namedItem("Precio").value;
    var stockString = form.elements.namedItem("Stock").value;
    var stock = parseInt(stockString);
    var desc = form.elements.namedItem("Descripcion").value;
    //var cat = form.elements.namedItem("Categorias").value;
    //var cat2 = getCat(cat);
    prod.name = name;
    prod.price = price;
    store.addQuantityProductInShop(prod,shop,stock);
    prod.description = desc;
	//s1.images="xiaomi.jpg";
    
    //store.addProduct(prod,cat2);

}

function updateShop(){
    var store=  StoreHouse.getInstance();
    var form = document.getElementById("shopForm");
    var shopCif = form.elements.namedItem("shopCif").value;
    var shop = store.getShopByCif(shopCif);

    var name = form.elements.namedItem("Nombre").value;
    var address = form.elements.namedItem("Direccion").value;
    var tel = form.elements.namedItem("Telefono").value;
    var coords = form.elements.namedItem("Coordenadas").value;
    
    shop.name = name;
    shop.address = address;
    shop.tel = tel;
    shop.coords = coords;
}

function updateCategory(){
    var store=  StoreHouse.getInstance();
    var form = document.getElementById("categoryForm");
    var originName = form.elements.namedItem("catOriginName").value;
    var category = store.getCategoryByTitle(originName);

    var name = form.elements.namedItem("Nombre").value;
    var desc = form.elements.namedItem("Descripcion").value;
    
    category.title = name;
    category.description = desc;
}

//Funciones de creacion de elementos genericos de formularios en el DOM

function addInput(type, name, inputClass = "", disab = false){
    var group = document.createElement("div");
    group.setAttribute("class", "form-group");
  
    var label = document.createElement("label");
    label.setAttribute("for", name);
    label.appendChild(document.createTextNode(name));
    group.appendChild(label);
    
    var input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("id", name);
    input.setAttribute("class", "form-control");
    input.disabled = disab;
    group.appendChild(input);

    return group;
}

function addTextarea(name, disab=false){
    var group = document.createElement("div");
    group.setAttribute("class", "form-group");

    var label = document.createElement("label");
    label.setAttribute("for", name);
    label.appendChild(document.createTextNode(name));
    group.appendChild(label);

    var input = document.createElement("textarea");
    input.setAttribute("id", name);
    input.setAttribute("class", "form-control");
    input.disabled = disab;
    group.appendChild(input);

    return group;
}

function addSelect(name, iterable){
    var store=  StoreHouse.getInstance();
    var group = document.createElement("div");
    group.setAttribute("class", "form-group");

    var label = document.createElement("label");
    label.setAttribute("for", name);
    label.appendChild(document.createTextNode(name));
    group.appendChild(label);

    var input = document.createElement("select");
    input.setAttribute("id", name);
    input.setAttribute("class", "form-control");
    group.appendChild(input);

    var items = iterable.next();

    while(!items.done){
        var item = items.value;
        
        var opt = document.createElement("option");
        if(item instanceof Category){
            opt.setAttribute("id", item.title);
            opt.appendChild(document.createTextNode(item.title));
        }
        else if(item instanceof Product){
           // console.log(item.value);
            opt.setAttribute("value", item.serialNumber);
            opt.appendChild(document.createTextNode(item.name));
        }
        else if(item instanceof Shop){
            opt.setAttribute("value", item.cif);
            opt.appendChild(document.createTextNode(item.name));
        }

        input.appendChild(opt);
        
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
	var tableDiv = document.getElementById("tableContainer");
	while(tableDiv.hasChildNodes()){
		tableDiv.removeChild(tableDiv.firstChild);
	}
}

function clearFormDiv(){
	var formDiv = document.getElementById("formContainer");
	while(formDiv.hasChildNodes()){
		formDiv.removeChild(formDiv.firstChild);
	}
}

function clearSelectDiv(){
	var selectDiv = document.getElementById("selectContainer");
	while(selectDiv.hasChildNodes()){
		selectDiv.removeChild(selectDiv.firstChild);
	}
}