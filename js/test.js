 "use strict";

/* 
Testeo del Store House.
*/
function testStoreHouse(){

	function testCategory(){
		console.log ("##### Testeo Category. ##### ");
		//Categoría cat1: Category: Categoría 1(Descripción categoría 1)
		console.log ("Categoría cat1: " + cat1.toString());
		//Categoría cat2: Category: Categoría 2(Descripción categoría 2)
		console.log ("Categoría cat2: " + cat2.toString());
		console.log ("##### Fin: Testeo Category. ##### ");
		console.log("");				
	}

	function showShops(){
		//Recorremos las tiendas.
		console.log ("##### Recorremos las tiendas. #####");
		var shops = store.shops;
		var shop = shops.next();
		while (shop.done !== true){
			console.log ("Tienda: " + shop.value.name);
			shop = shops.next();
		}
		console.log("");
	}

	function showCategories(){
		//Recorremos las categorías.
		console.log ("#####Recorremos las categorías. #####");
		var categories = store.categories;
		var category = categories.next();
		var cont =0;
		while (category.done !== true){
			//Category: title
			console.log ("Category: " + category.value.title);	
			category = categories.next();
		}	
		console.log("");	
	}

	function showProductsByCategory(category,type,des){
		var typeText = " y tipo: "+ des;
		if (type === null || type === undefined || type === ""){
			typeText ="";
	   	}
		console.log ("##### Productos por categoria: " + category.title + typeText);
		showProducts(store.getCategoryProducts(category,type));	
		console.log ("####### Fin: Productos por categoria. #######");	
		console.log("");
	}

	function showProductsByShop(shop,type,des){
		var typeText = " y tipo: "+ des;
		if (type === null || type === undefined || type === ""){
			typeText ="";
	  	 }
		console.log ("##### Productos por Tienda: " + shop.name + typeText);
		showProducts(store.getShopProducts(shop,type));	
		console.log ("####### Fin: Productos por Tienda. #######");	
		console.log("");
	}

	function showProducts(Product){
		var products =Product;
		var product = products.next();
		while (product.done !== true){
			console.log ("Producto: " + product.value.name + ", Stock: " + product.valStock );		
			product = products.next();
		}
	}
 
	//Creamos tiendas
	var t1 = new Shop("9756842","Amazon");
	var t2 = new Shop("8754681","Ebay");
	var t3 = new Shop("1587463","Pccomponentes");

	//Creamos categorias
	var cat1 = new Category("Electronica");
	cat1.description = "Descripción categoría 1";
	var cat2 = new Category("Musica");
	cat2.description = "Descripción categoría 2";
	var cat3 = new Category("Libros");
	cat3.description = "Descripción categoría 3";	
	testCategory();

	//Creamos productos
	var s1 = new Smartphone("Xiaomi",100);
	var s2 = new Smartphone("Smamsung",350);

	var g1 = new Guitarra("Fender",300);
	var g2 = new Guitarra("Gibson",500);

	var l1 = new Libro("Harry Potter 1",15);
	var l2 = new Libro("Harry Potter 2",25);

	//Creamos la instancia de store house
	console.log ("##### Testeo StoreHouse. ##### ");
	var store = StoreHouse.getInstance();

	//Añadimos las categorias
	console.log("Numero de categorias: "+store.addCategory(cat1));
	console.log("Numero de categorias: "+store.addCategory(cat2));
	console.log("Numero de categorias: "+store.addCategory(cat3));
	console.log("");

	//Añadimos tiendas
	console.log("Numero de tiendas: "+store.addShop(t1));
	console.log("Numero de tiendas: "+store.addShop(t2));
	console.log("Numero de tiendas: "+store.addShop(t3));
	console.log("");

	//Añadimos productos
	console.log("Numero de productos: "+store.addProduct(s1,cat1));
	console.log("Numero de productos: "+store.addProduct(s2));
	console.log("Numero de productos: "+store.addProduct(g1 ,cat2));
	console.log("Numero de productos: "+store.addProduct(g2));
	console.log("Numero de productos: "+store.addProduct(l1, cat3));
	console.log("Numero de productos: "+store.addProduct(l2));
	console.log("");

	//Añadimos stock de un producto a una tienda
	console.log("Añadimos stock a una tienda: "+store.addProductInShop(s1,t2,5));
	console.log("Añadimos stock a una tienda: "+store.addProductInShop(l1,t2,10));
	console.log("Añadimos stock a una tienda: "+store.addProductInShop(s1,t1,15));
	console.log("");

	
	showCategories();
	showShops();
	showProductsByCategory(store.defaultCategory);
	showProductsByCategory(cat1);
	showProductsByCategory(cat2);
	showProductsByCategory(store.defaultCategory,Smartphone, "Smartphone");
	showProductsByCategory(cat1,Smartphone, "Smartphone");
	showProductsByCategory(store.defaultCategory,Libro, "Libro");

	showProductsByShop(store.defaultShop);
	showProductsByShop(t1);
	showProductsByShop(t2);
	showProductsByShop(t2, Smartphone, "Smartphone");
	showProductsByShop(t3, Guitarra , "Guitarra");
	
} 
window.onload = testStoreHouse;

