 "use strict";


/*Testeo del StoreHouse en DOM*/
let ventana;
var windowArray = [];
function init(){
	//createObjects();
	initPopulate();
	checkCookie();
}


/*function createObjects(){
	//Creamos tiendas
	var t1 = new Shop("9756842","Amazon");
	var t2 = new Shop("8754681","Ebay");
	var t3 = new Shop("1587463","Pccomponentes");

	//Añadimos tiendas
	var store=  StoreHouse.getInstance();
	store.addShop(t1)
	store.addShop(t2)
	store.addShop(t3)

	//Creamos categorias
	var cat1 = new Category("Electronica");
	cat1.description = "Descripción categoría 1";
	var cat2 = new Category("Musica");
	cat2.description = "Descripción categoría 2";
	var cat3 = new Category("Libros");
	cat3.description = "Descripción categoría 3";	

	store.addCategory(cat1);
	store.addCategory(cat2);
	store.addCategory(cat3);

	//Creamos articulos
	var s1 = new Smartphone("Xiaomi",100);
	s1.images="xiaomi.jpg";
	s1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	var s2 = new Smartphone("Smamsung",350);
	s2.images="samsung.jpg";
	s2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	var s3 = new Smartphone("iPhone",2000000000 );
	s3.images="iphone.jpg";
	s3.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";

	var g1 = new Guitarra("Fender",300);
	var g2 = new Guitarra("Gibson",500);
	var g3 = new Guitarra("Ibanez",600);
	g1.images="fender.jpg";
	g1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	g2.images="gibson.jpg";
	g2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	g3.images="ibanez.jpg";
	g3.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	

	/*console.log(g1.getObject());
	var temp =JSON.stringify(g1.getObject());
	console.log(temp);*/
/*
	var l1 = new Libro("Harry Potter 1",15);
	var l2 = new Libro("Juan Potter 2",25);
	l1.images="HP1.jpg";
	l1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	l2.images="HP2.jpg";
	l2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";

	store.addProduct(s1,cat1);
	store.addProduct(s2,cat1);
	store.addProduct(s3,cat1);
	store.addProduct(g1,cat2);
	store.addProduct(g2,cat2);
	store.addProduct(g3,cat2);
	store.addProduct(l1,cat3);
	store.addProduct(l2,cat3);

	//introducimos articulos en tiendas
	store.addProductInShop(s1,t1,5);
	store.addProductInShop(g2,t1,5);
	store.addProductInShop(l2,t1,5);
	store.addProductInShop(l1,t2,5);
	store.addProductInShop(s1,t2,5);
	store.addProductInShop(s3,t2,5);
	store.addProductInShop(s2,t3,5);
	store.addProductInShop(g3,t3,5);
	store.addProductInShop(s1,t3,5);
	
};
*/

/*function createObjects(){
	//Creamos tiendas
	var t1 = new Shop("9756842","Amazon");
	var t2 = new Shop("8754681","Ebay");
	var t3 = new Shop("1587463","Pccomponentes");

	//Añadimos tiendas
	var store=  StoreHouse.getInstance();
	store.addShop(t1)
	store.addShop(t2)
	store.addShop(t3)

	//Creamos categorias
	var cat1 = new Category("Electronica");
	cat1.description = "Descripción categoría 1";
	var cat2 = new Category("Musica");
	cat2.description = "Descripción categoría 2";
	var cat3 = new Category("Libros");
	cat3.description = "Descripción categoría 3";	

	store.addCategory(cat1);
	store.addCategory(cat2);
	store.addCategory(cat3);

	//Creamos articulos

	var prods = loadProds("products.json");
	console.log(prods);

	var s1 = new Smartphone("Xiaomi",100);
	s1.images="xiaomi.jpg";
	s1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	var s2 = new Smartphone("Smamsung",350);
	s2.images="samsung.jpg";
	s2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	var s3 = new Smartphone("iPhone",2000000000 );
	s3.images="iphone.jpg";
	s3.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";

	var g1 = new Guitarra("Fender",300);
	var g2 = new Guitarra("Gibson",500);
	var g3 = new Guitarra("Ibanez",600);
	g1.images="fender.jpg";
	g1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	g2.images="gibson.jpg";
	g2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	g3.images="ibanez.jpg";
	g3.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	

	/*console.log(g1.getObject());
	var temp =JSON.stringify(g1.getObject());
	console.log(temp);*/
/*
	var l1 = new Libro("Harry Potter 1",15);
	var l2 = new Libro("Juan Potter 2",25);
	l1.images="HP1.jpg";
	l1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";
	l2.images="HP2.jpg";
	l2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisi ac quam hendrerit vulputate. Maecenas ullamcorper quam sagittis urna mattis luctus. Donec tempus ante ornare scelerisque blandit. Duis sit amet ante in neque dignissim rhoncus ac sed magna. Fusce tempor diam eget mattis aliquet. Donec luctus augue ipsum, a vehicula sapien elementum eget. Etiam eu urna scelerisque, volutpat nisi eget, pellentesque metus. Aliquam ultrices, dolor vitae viverra molestie, eros est imperdiet dui, commodo egestas nisi tellus eu dolor. Sed sit amet lacus ultricies, elementum sem at, bibendum lorem. Aliquam congue, erat id convallis faucibus, metus lorem placerat leo, a accumsan diam orci et metus. ";

	store.addProduct(s1,cat1);
	store.addProduct(s2,cat1);
	store.addProduct(s3,cat1);
	store.addProduct(g1,cat2);
	store.addProduct(g2,cat2);
	store.addProduct(g3,cat2);
	store.addProduct(l1,cat3);
	store.addProduct(l2,cat3);

	//introducimos articulos en tiendas
	store.addProductInShop(s1,t1,5);
	store.addProductInShop(g2,t1,5);
	store.addProductInShop(l2,t1,5);
	store.addProductInShop(l1,t2,5);
	store.addProductInShop(s1,t2,5);
	store.addProductInShop(s3,t2,5);
	store.addProductInShop(s2,t3,5);
	store.addProductInShop(g3,t3,5);
	store.addProductInShop(s1,t3,5);
	
};
*/

function initPopulate(){
	clearMain();
	changeJumbo("ERP", "Ejemplo de implementación del ERP con DOM.", "images/jumbo/defaultshop");
	var main = document.getElementById("main");
	var idDiv = document.createElement("div");
	idDiv.id = "shops";
	main.appendChild(idDiv);

	var containerDiv = document.createElement("div");
	containerDiv.setAttribute("class", "container");
	idDiv.appendChild(containerDiv);

	var h2 = document.createElement("h2");
	containerDiv.appendChild (h2);
	h2.appendChild(document.createTextNode("Tiendas:"));

	var rowDiv = document.createElement("div");
	rowDiv.setAttribute("class", "row");
	containerDiv.appendChild(rowDiv);

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

		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col-md-3");
		rowDiv.appendChild(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		thumbnailDiv.setAttribute("class", "thumbnail thumb-custom thumb-shop-custom");
		colDiv.appendChild(thumbnailDiv);

		thumbnailDiv.addEventListener("click",createFunctionShowShop(shop))	

		shops = iterableShops.next();

	}

	var mapDiv = document.createElement("div");
	mapDiv.setAttribute("id","googleMap");
	mapDiv.setAttribute("style","width:50%;height:400px;");
	main.appendChild(mapDiv);
	//setMap();

	//creamos el script aqui en lugar de ponerlo en el html directamente por que, al cargar el script antes que el populate,
	// da error al no estar creado el div que va a contener el mapa en ese momento
	var mapScript = document.createElement("script");
	mapScript.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyB_wFijwSjP7b22C_aeX0ENSu86S-dS1oE&callback=getLocation");
	document.body.appendChild(mapScript);



}


function shopPopulate(shop){
	var store =  StoreHouse.getInstance();

	clearMain();
	var urlJumbo = "images/jumbo/"+shop.name;
	if(shop.name == "Default shop"){urlJumbo = "images/jumbo/defaultshop"}
	changeJumbo(shop.name, "Welcome!", urlJumbo);

	var idDiv = document.createElement("div");
	idDiv.id = "products";
	main.appendChild(idDiv);

	var containerDiv = document.createElement("div");
	containerDiv.setAttribute("class", "container");
	idDiv.appendChild(containerDiv);

	//Para el menu
	var rowParent = document.createElement("div");
	rowParent.setAttribute("class", "row");
	containerDiv.appendChild(rowParent);

	var colMenu = document.createElement("div");
	colMenu.setAttribute("class", "col-md-3");
	rowParent.appendChild(colMenu);

	var iterableShops = store.shops;
	sideMenuTiendas(colMenu, iterableShops, "Tiendas");

	//categorias
	var iterableCat = store.getCategoriesInShop(shop);
	sideMenuTiendas(colMenu, iterableCat, "Categorias", shop);



	var colContent = document.createElement("div");
	colContent.setAttribute("id", "colDerecha");
	colContent.setAttribute("class", "col-md-9");
	rowParent.appendChild(colContent);

	var h2 = document.createElement("h2");
	colContent.appendChild (h2);
	h2.appendChild(document.createTextNode("Productos:"));

	var rowDiv = document.createElement("div");
	rowDiv.setAttribute("class", "row");
	colContent.appendChild(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getShopProducts(shop);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var thumbTitle = prod.name;
		var thumbText = prod.price+" €";
		var thumbImg = "images/products/"+prod.images;

		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col-md-4");
		rowDiv.appendChild(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		thumbnailDiv.setAttribute("id",prod.serialNumber);
		thumbnailDiv.setAttribute("draggable","true");
		thumbnailDiv.setAttribute("ondragstart","drag(event)");

		colDiv.appendChild(thumbnailDiv);

		thumbnailDiv.addEventListener("click",createFunctionShowProduct(prod, prods.valStock));
		prods = iterableProd.next();

	}

	var user=getCookie("username");
    var pass=getCookie("password");
    if (user != "") {
        var dragDiv = document.createElement("div");
		dragDiv.setAttribute("id","dragDiv");
		dragDiv.setAttribute("ondrop","drop(event)");
		dragDiv.setAttribute("ondragover","allowDrop(event)");
		
		colMenu.appendChild(dragDiv);
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

	var colDerecha = document.getElementById("colDerecha");
	while(colDerecha.hasChildNodes()){
		colDerecha.removeChild(colDerecha.firstChild);
	}

	var h2 = document.createElement("h2");
	colDerecha.appendChild (h2);
	h2.appendChild(document.createTextNode("Productos:"));

	var rowDiv = document.createElement("div");
	rowDiv.setAttribute("class", "row");
	colDerecha.appendChild(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getProductsInShopCategory(shop, category);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var thumbTitle = prod.name;
		var thumbText = prod.price
		var thumbImg = "images/products/"+prod.images;

		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col-md-4");
		rowDiv.appendChild(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		colDiv.appendChild(thumbnailDiv);

		thumbnailDiv.addEventListener("click",createFunctionShowProduct(prod, prods.valStock))	

		prods = iterableProd.next();

	}
}

function productPopulate(prod, stock, parentNode){
	var rowDiv1 = document.createElement("div");
	
	if(parentNode != " " && typeof parentNode != 'undefined'){
		rowDiv1.setAttribute("class", "row");
		parentNode.appendChild(rowDiv1);
	}else{
		var parentNode = document.getElementById("colDerecha");

		while(parentNode.hasChildNodes()){
			parentNode.removeChild(parentNode.firstChild);
		}

		rowDiv1.setAttribute("class", "row");
		parentNode.appendChild(rowDiv1);
	}

	var store=  StoreHouse.getInstance();

	//Columna1: imagen
	var colDiv1 = document.createElement("div");
		colDiv1.setAttribute("class", "col-md-6");
		rowDiv1.appendChild(colDiv1);

		var thumbnailDiv = document.createElement("div");
		thumbnailDiv.setAttribute("class", "thumbnail prod-thumb-custom");
		colDiv1.appendChild(thumbnailDiv);
		
		var img = document.createElement("img");
		img.setAttribute("src", "images/products/"+prod.images+"");
		img.setAttribute("class", "prod-img-thumb");
		thumbnailDiv.appendChild(img);

	//Columna 2: datos
	var colDiv2 = document.createElement("div");
		colDiv2.setAttribute("class", "col-md-6 prod-data-container-custom");
		rowDiv1.appendChild(colDiv2);

		var dataContainer = document.createElement("div");
		dataContainer.setAttribute("class", "data-container-div");
		colDiv2.appendChild(dataContainer);


		var titleDiv = document.createElement("div");
		titleDiv.setAttribute("class", "prod-data-div prod-data-title");
		dataContainer.appendChild(titleDiv);
		var h3 = document.createElement("h3");
		h3.setAttribute("class", "prod-title-custom");
		titleDiv.appendChild(h3);
		h3.appendChild(document.createTextNode(prod.name));

		var stockDiv = document.createElement("div");
		stockDiv.setAttribute("class", "prod-data-div");
		dataContainer.appendChild(stockDiv);
		var p = document.createElement("p");
		p.appendChild(document.createTextNode("Stock: "+stock));
		stockDiv.appendChild(p);
		
		var priceDiv = document.createElement("div");
		priceDiv.setAttribute("class", "prod-data-div");
		dataContainer.appendChild(priceDiv);
		var p = document.createElement("p");
		p.setAttribute("class", "price-custom");
		p.appendChild(document.createTextNode(prod.price+"€"));
		priceDiv.appendChild(p);

		var buttonDiv = document.createElement("div");
		buttonDiv.setAttribute("class", " prod-data-button");
		colDiv2.appendChild(buttonDiv);

		var button = document.createElement("button");
		button.setAttribute("type", "button");
		button.setAttribute("class", "btn");
		button.appendChild(document.createTextNode("Comprar"));
		buttonDiv.appendChild(button);

		//Botón que abrirá la ventana con  la informacion general del producto
		var button2 = document.createElement("button");
		button2.setAttribute("type", "button");
		button2.setAttribute("class", "btn");
		button2.appendChild(document.createTextNode("Informacion general"));
		buttonDiv.appendChild(button2);
		var totalStock = store.getTotalStock(prod);
		button2.addEventListener("click",createFunctionAbrirVentana(prod, totalStock));

		var divTab = document.createElement("div");
		parentNode.appendChild(divTab);
		createProductTab(divTab, prod);

}

function clearMain(){
	var main = document.getElementById("main");
	while(main.hasChildNodes()){
		main.removeChild(main.firstChild);
	}
}

function changeJumbo(title, text, urlImg){
	if(urlImg != ""){
		var jumbo = document.getElementById("Jumbo");
		jumbo.style.background = "url("+urlImg+".jpg), no-repeat, center";
		jumbo.style.backgroundSize = "contain";
	}
	
	var h1 = document.getElementById("JH1");
	var p = document.getElementById("Jp");

	h1.innerHTML = title;
	p.innerHTML = text;
}

function sideMenuTiendas(menuCont, iterable, name, currentShop){
	var store =  StoreHouse.getInstance();

	var panGroup = document.createElement("div");
	panGroup.setAttribute("class", "panel-group");
	menuCont.appendChild(panGroup);

	var panel = document.createElement("div");
	panel.setAttribute("class", "panel panel-default");
	panGroup.appendChild(panel);

	var panHead = document.createElement("div");
	panHead.setAttribute("class", "panel-heading");
	panel.appendChild(panHead);

	var h4 = document.createElement("h4");
	h4.setAttribute("class", "panel-title");
	panHead.appendChild(h4);

	//El enlace en el titulo
	var aTitle = document.createElement("a");
	aTitle.setAttribute("data-toggle", "collapse");
	aTitle.setAttribute("href", "#"+name);
	h4.appendChild(aTitle);
	aTitle.appendChild(document.createTextNode(name));

	//el div de la lista
	var listDiv = document.createElement("div");
	listDiv.setAttribute("id", name);
	listDiv.setAttribute("class", "panel-collapse collapse in");
	panel.appendChild(listDiv);

	var ul = document.createElement("ul");
	ul.setAttribute("class", "list-group ul-custom");
	listDiv.appendChild(ul);

	
	var items = iterable.next();

	while(!items.done){
		var item = items.value;
		var li = document.createElement("li");
		li.setAttribute("class", "list-group-item li-custom");
		if(item instanceof Category){
			li.appendChild(document.createTextNode(item.title));
		}
		
		if(item instanceof Shop){
			li.appendChild(document.createTextNode(item.name));
		}
		
		ul.appendChild(li);
		if(item instanceof Shop){
			li.addEventListener("click", createFunctionShowShop(item));
		}else if(item instanceof Category){
			li.addEventListener("click", createFunctionShowProductCategory(item, currentShop));
		}
		
		
		items = iterable.next();
	}

}

function createProductTab(container, prod){
	var ul = document.createElement("ul");
	ul.setAttribute("class", "nav nav-tabs");
	container.appendChild(ul);

	var li = document.createElement("li");
	ul.appendChild(li);

	var aTab = document.createElement("a");
	aTab.setAttribute("data-toggle", "tab");
	aTab.setAttribute("href", "#descripcion");
	aTab.appendChild(document.createTextNode("Descripción"));
	li.appendChild(aTab);

	var li = document.createElement("li");
	ul.appendChild(li);

	var aTab2 = document.createElement("a");
	aTab2.setAttribute("data-toggle", "tab");
	aTab2.setAttribute("href", "#caracteristicas");
	aTab2.appendChild(document.createTextNode("Características"));
	li.appendChild(aTab2);

	var divContent = document.createElement("div");
	divContent.setAttribute("class", "tab-content tab-content-custom");
	container.appendChild(divContent);

	var divTab = document.createElement("div");
	divTab.setAttribute("id", "descripcion");
	divTab.setAttribute("class", "tab-pane fade in active");
	divContent.appendChild(divTab);

	var pTab = document.createElement("p");
	divTab.appendChild (pTab);
	pTab.appendChild(document.createTextNode(prod.description));


	var divTab = document.createElement("div");
	divTab.setAttribute("id", "caracteristicas");
	divTab.setAttribute("class", "tab-pane fade");
	divContent.appendChild(divTab);

	var pTab = document.createElement("p");
	divTab.appendChild (pTab);
	pTab.appendChild(document.createTextNode("Aqui van las características del producto."));

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
		var thumbnailDiv = document.createElement("div");
		thumbnailDiv.setAttribute("class", "thumbnail thumb-custom");


		var img = document.createElement("img");
		img.setAttribute("src", image);
		thumbnailDiv.appendChild(img);

		var caption = document.createElement("div");
		caption.setAttribute("class", "caption text-center");
		thumbnailDiv.appendChild(caption);

		var h3 = document.createElement("h3");
		caption.appendChild(h3);
		h3.appendChild(document.createTextNode(title));
	
		var p = document.createElement("p");
		p.appendChild(document.createTextNode(text));
		caption.appendChild(p);
	
		var button = document.createElement("button");
		button.setAttribute("class", "btn btn-thumb-custom");
		button.appendChild(document.createTextNode("Ver Detalle"));
		caption.appendChild(button);

		return thumbnailDiv;
	}

/*function myMap(){
	
		var mapProp= {
			center:new google.maps.LatLng(32.722756, -102.773387),
			zoom:5,
		};
		var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		
}*/


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
    //ev.target.appendChild(document.getElementById(data));
}

function deleteProductDrop(prodId){
    var store=  StoreHouse.getInstance();
    var prod = store.getProdById(parseInt(prodId));
   
    store.removeProduct(prod);
    
    deleteItem("products",parseInt(prodId));

}


//window.onload = init;

