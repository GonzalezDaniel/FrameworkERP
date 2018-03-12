

const DBNAME = "UT08ERP";
const DBVERSION = 6;
const DBCATEGORIES="categories";
const DBSHOPS="shops";
const DBPRODUCTS="products"; 

var store = StoreHouse.getInstance();

var db;
var request = indexedDB.open(DBNAME, DBVERSION);

request.onerror = function(event) {  
    console.log("Error en la solicitud: " + event.target.error);
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    db.onerror = function(event) {
      console.log("Error en el acceso a la base de datos: " + event.target.error);
    };
  };

  request.onupgradeneeded = function(event) {  
	db = event.target.result;
  console.log("Event onupgradeneeded: " + db.name);

  try {
    //Creamos el objeto categorias
    var categoriesObjectStore = db.createObjectStore(DBCATEGORIES, { autoIncrement : true });
    console.log ("Categories Object Store has been created");

    categoriesObjectStore.createIndex("title", "title", { unique: false });
    console.log ("Index Title has been created");
   
    categoriesObjectStore.transaction.oncomplete = function(event) {
        console.log("mia1");
      var categoriesObjectStore = db.transaction(DBCATEGORIES, "readwrite").objectStore(DBCATEGORIES);

      var categories = store.categories;
      var category = categories.next();
      while (category.done !== true){
          console.log("cat");
          categoriesObjectStore.add(category.value.getObject());
          category = categories.next();
      }	
      categoriesObjectStore.transaction.onabort = function(event){
          console.log("CAGUEN DIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOS");
      }
    }


    
  } catch (e) {
    console.log("Exception creating object store: " + e);
  }
  try {
 


      //Creamos el objeto tiendas
    var shopsObjectStore = db.createObjectStore(DBSHOPS, { autoIncrement : true });
    console.log ("Categories Object Store has been created");

    shopsObjectStore.createIndex("cif", "cif", { unique: true });
    console.log ("Index CIF has been created");
    
    shopsObjectStore.transaction.oncomplete = function(event) {
        console.log("mia2");
      var shopsObjectStore = db.transaction(DBSHOPS, "readwrite").objectStore(DBSHOPS);

      var shops = store.shops;
      var shop = shops.next();
      while (shop.done !== true){
          console.log("shop");
          shopsObjectStore.add(shop.value.getObject());
          shop = shops.next();
      }
    }

    

    
  } catch (e) {
    console.log("Exception creating object store: " + e);
  }
  try {
    
      //Creamos el objeto productos
    var productsObjectStore = db.createObjectStore(DBPRODUCTS, { autoIncrement : true });
    console.log ("Categories Object Store has been created");
   
    productsObjectStore.createIndex("serialNumber", "serialNumber", { unique: false });
    console.log ("Index serialNumber has been created");

    productsObjectStore.transaction.oncomplete = function(event) {
        console.log("mia3");
      var productsObjectStore = db.transaction(DBPRODUCTS, "readwrite").objectStore(DBPRODUCTS);

      var products = store.products;
      var product = products.next();
      while (product.done !== true){
          console.log("prod");
          productsObjectStore.add(product.value.getObject());
          product = products.next();
      }
    }
    
  } catch (e) {
    console.log("Exception creating object store: " + e);
  }
};  