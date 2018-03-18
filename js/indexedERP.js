

const DBNAME = "UT08ERP";
const DBVERSION = 6;
const DBCATEGORIES="categories";
const DBSHOPS="shops";
const DBPRODUCTS="products"; 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var database = null;
function startDB(){

     database = indexedDB.open(DBNAME, DBVERSION);

    database.onerror = function(event) {  
        console.log("Error en la solicitud: " + event.target.error);
      };

      database.onsuccess = function(event) {
       console.log("Aceso a BD con exito");
       createObjectsJson();
      // createObjects();
        //init();
        
      };
      
      database.onupgradeneeded = function(event) {  
      var db = database.result;
      console.log("Event onupgradeneeded: " + db.name);

      try {
      //Creamos el objeto categorias
      var objectStore = db.createObjectStore(DBCATEGORIES, { keyPath:'title', autoIncrement : true });
      console.log ("Categories Object Store has been created");

      //Creamos el objeto tiendas
      var objectStore = db.createObjectStore(DBSHOPS, {  keyPath:'cif', autoIncrement : true });
      console.log ("Categories Object Store has been created");
    
      //Creamos el objeto productos
      var objectStore = db.createObjectStore(DBPRODUCTS, { keyPath:'serialNumber', autoIncrement : true });
      console.log ("Categories Object Store has been created");
      
      objectStore.transaction.oncomplete = function(event) {
        console.log("Todo correcto");
       
      }
        
      } catch (e) {
        console.log("Exception creating object store: " + e);
      }
    };  
    
}

function addItem(store, item){

  var db = database.result;
  var data = db.transaction([store],"readwrite");
  var object = data.objectStore(store);

  var request = object.put(item);

  request.onerror = function(event){
    console.log("add item error");
  };

  data.oncomplete = function(event){
    console.log("item added");
  };


}

function updateItem(store, item, itemKey){

  var db = database.result;
  var object = db.transaction([store],"readwrite").objectStore(store);

  var request = object.get(itemKey);

  request.onsuccess = function(event){
    var data = request.result;
    data = item;
    var requestUpdate = object.put(data);

    requestUpdate.onerror = function(event) {
      console.log("Error actualizando");
    };
    requestUpdate.onsuccess = function(event) {
      console.log("Actualiza con exito");
    };
  };
  request.onerror = function(event){
    console.log("add item error");
  };

}




function deleteItem(store, itemKey){
  var db = database.result;
  var object = db.transaction([store],"readwrite").objectStore(store);

  var request = object.delete(itemKey);

 request.onsuccess = function(event){
    console.log("Eliminado con exito");
  };
  request.onerror = function(event){
    console.log("Error al eliminar");
  };

  function deleteItem(){

  };
}

startDB();