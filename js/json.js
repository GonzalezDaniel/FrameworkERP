
var catArray = [];
var shopArray = [];
var prodArray = [];
function createObjectsJson(){

  loadCategories();
  
  ;
  
}

function loadProducts() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       
        var data = JSON.parse(xhttp.response);
        
        createProds(data);
        createProductsInShops();
       
      }
    };
    xhttp.open("POST", "json/products.json", true);
    xhttp.send();
  }

  function loadShops() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       
        var data = JSON.parse(xhttp.response);

        createShops(data);
       
      }
    };
    xhttp.open("POST", "json/shops.json", true);
    xhttp.send();
  }

  function loadCategories() {
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       
        var data = JSON.parse(xhttp.response);

        createCategories(data);
       
      }
    };
    xhttp.open("POST", "json/categories.json", true);
    xhttp.send();
  }



function createProds(arrayProd){
  var store =  StoreHouse.getInstance();
  var cat = "";
    for(var i=0; i<arrayProd.length; i++){
      var item = new window[arrayProd[i]["type"]](arrayProd[i]["name"],arrayProd[i]["price"]);
      item.images = arrayProd[i]["image"];
      item.description = arrayProd[i]["description"];
      if(window[arrayProd[i]["type"]] == Smartphone){
        var elec = store.getCategoryByTitle("Electronica");
        prodArray.push(item);
        store.addProduct(item,elec);
      }
      if(window[arrayProd[i]["type"]] == Guitarra){
        var musica = store.getCategoryByTitle("Musica");
        prodArray.push(item);
        store.addProduct(item,musica);
      }
      if(window[arrayProd[i]["type"]] == Libro){
        var libros = store.getCategoryByTitle("Libros");
        prodArray.push(item);
        store.addProduct(item,libros);
      }
      
    }

    
}

function createCategories(arrayCat){
  var store =  StoreHouse.getInstance();
  for(var i=0; i<arrayCat.length; i++){
    var item = new Category(arrayCat[i]["title"]);
    item.description = arrayCat[i]["description"];
    catArray.push(item);
    store.addCategory(item);
  }
    loadShops();
}

function createShops(arrayShop){
  var store =  StoreHouse.getInstance();
  for(var i=0; i<arrayShop.length; i++){
    var item = new Shop(arrayShop[i]["cif"],arrayShop[i]["name"]);
    shopArray.push(item);
    store.addShop(item);
  }
    loadProducts()
}

function createProductsInShops(){
  var store =  StoreHouse.getInstance();
  var numShops = shopArray.length;
  var cont = 1;
  for(var i=0; i<prodArray.length; i++){
    store.addProductInShop(prodArray[i],shopArray[cont],5);

    if(cont == shopArray.length-1){
      cont=0;
    }else{
      cont++;
    }
  }
    setTimeout(init(),100);
}


function sendUserObjects(){
  var store =  StoreHouse.getInstance();
  var products = store.products;
  var prod = products.next();
  var user = getCookie("username");
  console.log(user);
  var items = "["; 
     while(!prod.done){
       items+=JSON.stringify(prod.value.getObject());
       prod = products.next();
       if(!prod.done){
         items+=",";
       }
     }
     
     var shops = store.shops;
     var shop = shops.next();
        while(!shop.done){
          items+=JSON.stringify(shop.value.getObject());
          shop = shops.next();
          if(!shop.done){
            items+=",";
          }
        }

        var categories = store.categories;
        var category = categories.next();
           while(!category.done){
             items+=JSON.stringify(category.value.getObject());
             category = categories.next();
             if(!category.done){
               items+=",";
             }
           }

        items += "]";

sendDoc(items, user);
  
}

  function sendDoc( obj, user) {
    var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x="+obj+"&usu="+user);
  }
