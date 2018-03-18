 "use strict";


/*Testeo del StoreHouse en DOM*/
let ventana;
var windowArray = [];
function init(){
	//createObjects();
	initPopulate();
	checkCookie();
}

function initPopulate(){
	clearMain();
	changeJumbo("ERP", "Ejemplo de implementación del ERP con DOM.", "images/jumbo/defaultshop");
	var main = $("#main");
	var idDiv =  $("<div></div>").attr("id","shops");
	main.append(idDiv);

	var containerDiv =  $("<div></div>").attr("class", "container");
	idDiv.append(containerDiv);

	var h2 = $("<h2></h2>").text("Tiendas");
	containerDiv.append (h2);

	var rowDiv =  $("<div></div>").attr("class", "row");
	containerDiv.append(rowDiv);

	var store =  StoreHouse.getInstance();
	var iterableShops = store.shops;
	var shops = iterableShops.next();

	while(!shops.done){
		var shop = shops.value;
		
		var thumbTitle = shop.name;
		var thumbText = shop.cif;
		var thumbImg = "images/shops/"+shop.name+".jpg";
		if(shop.name == "Default shop"){
			thumbTitle = "Todos los productos";
		}

		var colDiv =  $("<div></div>").attr("class", "col-md-3");
		rowDiv.append(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		thumbnailDiv.attr("class", "thumbnail thumb-custom thumb-shop-custom");
		colDiv.append(thumbnailDiv);

		thumbnailDiv.click(createFunctionShowShop(shop));	

		shops = iterableShops.next();

	}

	var mapDiv =  $("<div></div>").attr("id","googleMap");
	mapDiv.attr("style","width:50%;height:400px;");
	main.append(mapDiv);
	//setMap();

	//creamos el script aqui en lugar de ponerlo en el html directamente por que, al cargar el script antes que el populate,
	// da error al no estar creado el div que va a contener el mapa en ese momento
	var mapScript = $("<script></script>");
	mapScript.attr("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyB_wFijwSjP7b22C_aeX0ENSu86S-dS1oE&callback=getLocation");
	$("body").append(mapScript);



}


function shopPopulate(shop){
	var store =  StoreHouse.getInstance();

	clearMain();
	var urlJumbo = "images/jumbo/"+shop.name;
	if(shop.name == "Default shop"){urlJumbo = "images/jumbo/defaultshop"}
	changeJumbo(shop.name, "Welcome!", urlJumbo);

	var idDiv =$("<div></div>").attr("id","products");
	$("#main").append(idDiv);

	var containerDiv = $("<div></div>").attr("class", "container");
	idDiv.append(containerDiv);

	//Para el menu
	var rowParent =  $("<div></div>").attr("class", "row");
	containerDiv.append(rowParent);

	var colMenu =  $("<div></div>").attr("class", "col-md-3");
	rowParent.append(colMenu);

	var iterableShops = store.shops;
	sideMenuTiendas(colMenu, iterableShops, "Tiendas");

	//categorias
	var iterableCat = store.getCategoriesInShop(shop);
	sideMenuTiendas(colMenu, iterableCat, "Categorias", shop);



	var colContent =  $("<div></div>").attr({"id": "colDerecha","class": "col-md-9"});
	rowParent.append(colContent);

	var h2 =$("<h2></h2>").text("Tiendas").text("Productos:");
	colContent.append (h2);

	var rowDiv =  $("<div></div>").attr("class", "row");
	colContent.append(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getShopProducts(shop);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var thumbTitle = prod.name;
		var thumbText = prod.price+" €";
		var thumbImg = "images/products/"+prod.images;

		var colDiv =$("<div></div>").attr("class", "col-md-4");
		//rowDiv.append(colDiv);
		colDiv.appendTo(rowDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		thumbnailDiv.attr({"id": prod.serialNumber,
		"draggable":"true",
		"ondragstart":"drag(event)"});
	
		colDiv.append(thumbnailDiv);

		thumbnailDiv.click(createFunctionShowProduct(prod, prods.valStock));
		prods = iterableProd.next();

	}

	var user=getCookie("username");
    var pass=getCookie("password");
    if (user != "") {
        var dragDiv =  $("<div></div>");
		dragDiv.attr({"id":"dragDiv",
		"ondrop":"drop(event)",
		"ondragover":"allowDrop(event)"});

		colMenu.append(dragDiv);
    } 
	

}

function abrirVentana(prod, stock){
	ventana = window.open("nuevaVentana.html",prod.name,"toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=1000,height=900");
	windowArray.push(ventana);
	ventana.focus();
	setTimeout(function() {
		var winNode = ventana.document.getElementById("main");
		productPopulate(prod, stock ,winNode);
	}, 100);
	           
}

function cerrarVentanas(){
	windowArray.forEach(ventana => {
		ventana.close();
	});
}

function productsCategoryShopPopulate(category, shop){
	var store =  StoreHouse.getInstance();

	var colDerecha = $("#colDerecha");
	colDerecha.empty();
	
	var h2 = $("<h2></h2>").text("Productos:");
	colDerecha.append (h2);

	var rowDiv =  $("<div></div>").attr("class", "row");
	colDerecha.append(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getProductsInShopCategory(shop, category);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var thumbTitle = prod.name;
		var thumbText = prod.price
		var thumbImg = "images/products/"+prod.images;

		var colDiv =  $("<div></div>").attr("class", "col-md-4");
		rowDiv.append(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		colDiv.append(thumbnailDiv);

		thumbnailDiv.click(createFunctionShowProduct(prod, prods.valStock))	

		prods = iterableProd.next();

	}
}

function productPopulate(prod, stock, parentNode){
	var rowDiv1 =  $("<div></div>");
	
	if(parentNode != " " && typeof parentNode != 'undefined'){
		rowDiv1.attr("class", "row");
		rowDiv1.appendTo(parentNode);
	}else{
		var parentNode = $("#colDerecha");

		parentNode.empty();

		rowDiv1.attr("class", "row");
		rowDiv1.appendTo(parentNode);
	}

	var store = StoreHouse.getInstance();

	//Columna1: imagen
	var colDiv1 =  $("<div></div>").attr("class", "col-md-6");
		rowDiv1.append(colDiv1);

		var thumbnailDiv =  $("<div></div>").attr("class", "thumbnail prod-thumb-custom");
		colDiv1.append(thumbnailDiv);
		
		var img = $("<img>");
		img.attr({"src": "images/products/"+prod.images+"",
		"class": "prod-img-thumb"});
		
		thumbnailDiv.append(img);

	//Columna 2: datos
	var colDiv2 =  $("<div></div>").attr("class", "col-md-6 prod-data-container-custom");
		rowDiv1.append(colDiv2);

		var dataContainer =  $("<div></div>").attr("class", "data-container-div");
		colDiv2.append(dataContainer);

		var titleDiv =  $("<div></div>").attr("class", "prod-data-div prod-data-title");
		dataContainer.append(titleDiv);

		var h3 = $("<h3></h3>").attr("class", "prod-title-custom").text(prod.name);
		titleDiv.append(h3);

		var stockDiv =  $("<div></div>").attr("class", "prod-data-div");
		dataContainer.append(stockDiv);

		var p = $("<p></p>").text("Stock: "+stock);
		stockDiv.append(p);
		
		var priceDiv =  $("<div></div>").attr("class", "prod-data-div");
		dataContainer.append(priceDiv);

		var p = $("<p></p>").attr("class", "price-custom").text(prod.price+"€");
		priceDiv.append(p);

		var buttonDiv =  $("<div></div>").attr("class", " prod-data-button");
		colDiv2.append(buttonDiv);

		var button = $("<button></button>").attr({
			"type": "button",
			"class": "btn"
		});
		button.text("Comprar");
		buttonDiv.append(button);

		//Botón que abrirá la ventana con  la informacion general del producto
		var button2 = $("<button></button>").attr({
			"type": "button",
			"class": "btn"
		});
		button2.text("Informacion general");
		buttonDiv.append(button2);
		var totalStock = store.getTotalStock(prod);
		button2.click(createFunctionAbrirVentana(prod, totalStock));

		var divTab = $("<div></div>");
		divTab.appendTo(parentNode);
		createProductTab(divTab, prod);

}

function clearMain(){
	$("#main").empty();
}

function changeJumbo(title, text, urlImg){
	if(urlImg != ""){
		$("#Jumbo").css({
			"background" :"url("+urlImg+".jpg), no-repeat, center",
			"backgroundSize" : "contain"
		});
	}
	
	$("#JH1").text = title;
	$("#Jp").text = text;
}

function sideMenuTiendas(menuCont, iterable, name, currentShop){
	var store =  StoreHouse.getInstance();

	var panGroup =  $("<div></div>").attr("class", "panel-group");
	menuCont.append(panGroup);

	var panel =  $("<div></div>").attr("class", "panel panel-default");
	panGroup.append(panel);

	var panHead =  $("<div></div>").attr("class", "panel-heading");
	panel.append(panHead);

	var h4 = $("<h4></h4>").attr("class", "panel-title");
	panHead.append(h4);

	//El enlace en el titulo
	var aTitle = $("<a></a>").attr({
		"data-toggle": "collapse",
		"href": "#"+name
	});
	
	h4.append(aTitle);
	aTitle.append(document.createTextNode(name));

	//el div de la lista
	var listDiv =  $("<div></div>").attr({"id": name,"class": "panel-collapse collapse in"});
	panel.append(listDiv);

	var ul = $("<ul></ul>").attr("class", "list-group ul-custom");
	listDiv.append(ul);

	
	var items = iterable.next();

	while(!items.done){
		var item = items.value;
		var li = $("<li></li>").attr("class", "list-group-item li-custom");
		if(item instanceof Category){
			li.text(item.title);
		}
		
		if(item instanceof Shop){
			li.text(item.name);
		}
		
		ul.append(li);
		if(item instanceof Shop){
			li.click(createFunctionShowShop(item));
		}else if(item instanceof Category){
			li.click(createFunctionShowProductCategory(item, currentShop));
		}
		
		
		items = iterable.next();
	}

}

function createProductTab(container, prod){
	var ul = $("<ul></ul>").attr("class", "nav nav-tabs");
	ul.appendTo(container);

	var li = $("<li></li>");
	ul.append(li);

	var aTab = $("<a></a>").attr({
		"data-toggle": "tab",
		"href": "#descripcion"
	});
	
	aTab.text("Descripción");
	li.append(aTab);

	var li = $("<li></li>");
	ul.append(li);

	var aTab2 = $("<a></a>").attr({
		"data-toggle": "tab",
		"href": "#caracteristicas"
	});
	
	aTab2.text("Características");
	li.append(aTab2);

	var divContent =  $("<div></div>").attr("class", "tab-content tab-content-custom");
	container.append(divContent);

	var divTab =  $("<div></div>").attr({
		"id": "descripcion",
		"class": "tab-pane fade in active"
	});
	
	divContent.append(divTab);

	var pTab = $("<p></p>").text(prod.description);
	divTab.append(pTab);

	var divTab =  $("<div></div>").attr({
		"id": "caracteristicas",
		"class": "tab-pane fade"
	});
	divContent.append(divTab);

	var pTab = $("<p></p>").text("Aqui van las características del producto.");
	divTab.append (pTab);
}

function createFunctionShowShop(shop){
	return function(){
		return shopPopulate(shop);
	}
}

function createFunctionShowProduct(product, stock){
	return function(){
		return productPopulate(product, stock);
	}
}

function createFunctionAbrirVentana(product, stock){
	return function(){
		return abrirVentana(product, stock);
	}
}

function createFunctionShowProductCategory(category, shop){
	return function(){
		return productsCategoryShopPopulate(category, shop);
	}
}

function createThumbnail(title, text, image){
		var thumbnailDiv =  $("<div></div>").attr("class", "thumbnail thumb-custom");

		var img = $("<img>").attr("src", image);
		thumbnailDiv.append(img);

		var caption =  $("<div></div>").attr("class", "caption text-center");
		thumbnailDiv.append(caption);

		var h3 = $("<h3></h3>");
		caption.append(h3);
		h3.append(document.createTextNode(title));
	
		var p = $("<p></p>");
		p.append(document.createTextNode(text));
		caption.append(p);
	
		var button = $("<button></button>").attr("class", "btn btn-thumb-custom");
		button.text("Ver Detalle");
		caption.append(button);

		return thumbnailDiv;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {

	var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapCanvas = document.getElementById("googleMap");
	var mapOptions = {center: myCenter, zoom: 15};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var store =  StoreHouse.getInstance();
	var shops = store.shops;
    var shop = shops.next();

    while (shop.done !== true){
		if(shop.value.coords!=undefined){
			var contentString = shop.value.name;
			
			var mark = new google.maps.LatLng(parseFloat(shop.value.coords.latitude),parseFloat(shop.value.coords.longitude));
			var marker = new google.maps.Marker({position:mark});
			marker.addListener('click', createFunctionInfowindow(map,marker, contentString));
			
			marker.setMap(map);
		
		}
        shop = shops.next();
}
}
function infoWindow(map,marker,contentString){
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	  });
	  infowindow.open(map, marker);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function createFunctionInfowindow(map,marker,contentString){
	return function(){
		return infoWindow(map,marker,contentString);
	}
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	deleteProductDrop(data);
}

function deleteProductDrop(prodId){
    var store=  StoreHouse.getInstance();
    var prod = store.getProdById(parseInt(prodId));
   
    store.removeProduct(prod);
    
    deleteItem("products",parseInt(prodId));

}



