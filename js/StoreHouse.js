"use strict";

//Excepción genérica del Store House.
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error: Store House Generic Exception.";
}
StoreHouseException.prototype = new BaseException(); //Heredamos de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;

//Excepción genérica de Category del Store House.
function  CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error: Category Store House Generic Exception.";
}
CategoryStoreHouseException.prototype = new StoreHouseException(); 
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

//Excepción genérica de Shop del Store House.
function  ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error: Shop Store House Generic Exception.";
}
ShopStoreHouseException.prototype = new StoreHouseException(); 
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

//Excepción genérica de Product del Store House.
function  ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error: Product Store House Generic Exception.";
}
ProductStoreHouseException.prototype = new StoreHouseException(); 
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

//Excepción de eliminacion de la categoria por defecto.
function DefaultCategoryStoreHouseException() {
	this.name = "DefaultCategoryStoreHouseException";
	this.message = "Error: The Default Category cannot be removed.";
}
DefaultCategoryStoreHouseException.prototype = new CategoryStoreHouseException(); 
DefaultCategoryStoreHouseException.prototype.constructor = DefaultCategoryStoreHouseException;


//Excepción de tienda existente.
function ShopExixtsStoryHouseException() {
	this.name = "ShopExixtsStoryHouseException";
	this.message = "Error: The Shop already exists in Store House.";
}
ShopExixtsStoryHouseException.prototype = new ShopStoreHouseException(); 
ShopExixtsStoryHouseException.prototype.constructor = ShopExixtsStoryHouseException;

//Excepción de tienda no existente.
function ShopDoesntExixtsStoryHouseException() {
	this.name = "ShopDoesntExixtsStoryHouseException";
	this.message = "Error: The Shop doesnt exists in Store House.";
}
ShopDoesntExixtsStoryHouseException.prototype = new ShopStoreHouseException(); 
ShopDoesntExixtsStoryHouseException.prototype.constructor = ShopDoesntExixtsStoryHouseException;

//Excepción de producto no existente.
function ProductDoesntExixtsStoryHouseException() {
	this.name = "ProductDoesntExixtsStoryHouseException";
	this.message = "Error: The Product doesnt exists in Store House.";
}
ProductDoesntExixtsStoryHouseException.prototype = new ProductStoreHouseException(); 
ProductDoesntExixtsStoryHouseException.prototype.constructor = ProductDoesntExixtsStoryHouseException;




var StoreHouse = (function(){

    var instantiated;

    function init(){

        function StoreHouse(){

            if(!(this instanceof StoreHouse)){
                throw new InvalidAccessConstructorException();
            }

            /* Definicion del atributo title de StoreHouse*/
			var _title = "StoreHouseDefault";
			Object.defineProperty(this, 'title', {
				get:function(){
					return _title;
				},
				set:function(title){
					_title = validate.empty(title,"title of StoreHouse");
				}		
			});	

            var _shops = [];
            var _categories = [];
            var _products = [];


            //Propiedades de las categorias

            Object.defineProperty(this, "categories", {
                get:function(){
                    var nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < _categories.length ? 
                            {value: _categories[nextIndex++].category, done: false} :
                            {done: true};
                        }
                    }
                }
            });

            this.addCategory = function(category){
                if(!(category instanceof Category)){
                    throw new CategoryStoreHouseException();
                }
                var position = getCategoryPosition(category);
                if(position === -1){
                    _categories.push(
                        {
                            category: category,
                            idProducts:[]
                        }
                    );
                }else{
                    throw new CategoryExixtsStoryHouseException();
                }
                return _categories.length;
            }

            //Elimina una categoría pasando los productos a la categoria por defecto.
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		
                var position = getCategoryPosition(category);
				if (position !== -1){
					if (category.title !== _defaultCategory.title){
						_categories.splice(position, 1);
					} else{
						throw new DefaultCategoryStoreHouseException();
					}					
				} else{
					throw new CategoryNotExistsImageManagerException();
				}	
				return _categories.length;
			}

            function getCategoryPosition(category){
                if(!(category instanceof Category)){
                    throw new CategoryStoreHouseException();
                }

                function compareElements(elem){
                    return (elem.category.title === category.title);
                }

                return _categories.findIndex(compareElements);
            }

            var _defaultCategory = new Category("Default category");
            this.addCategory(_defaultCategory);

            //Devuelve la categoria por defecto.
            Object.defineProperty(this, "defaultCategory", {
				get:function(){
					return _defaultCategory;
				}	
			});	
            

            //Propiedades de las tiendas.

            Object.defineProperty(this, "shops", {
                get:function(){
                    var nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < _shops.length ? 
                            {value: _shops[nextIndex].shop, done:false} :
                            {done:true};
                        }
                    }
                }
            });

            this.addShop = function(shop){
                if(!(shop instanceof Shop)){
                    throw new ShopStoreHouseException();
                }
                var position = getShopPosition(shop);
                if(position === -1){
                    _shops.push(
                        {
                            shop: shop,
                            sProducts:[]
                        }
                    );
                }else{
                    throw new ShopExixtsStoreHouseException();
                }
                return _shops.length;
            }

            function getShopPosition(shop){
                if(!(shop instanceof Shop)){
                    throw new ShopStoreHouseException();
                }

                function compareElements(elem){
                    return (elem.shop.cif === shop.cif);
                }

                return _shops.findIndex(compareElements);
            }

            var _defaultShop = new Shop( "00000001","Default shop");
            this.addShop(_defaultShop);

            //Propiedades de los productos.

            Object.defineProperty(this, "products", {
                get:function(){
                    var nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < _products.length ? 
                            {value: _products[nextIndex].product, done:false} :
                            {done:true};
                        }
                    }
                }
            });

            this.addProduct = function(product, category){
                if(!(product instanceof Product)){
                    throw new ProductStoreHouseException();
                }
                if(!(category instanceof Category)){
                    throw new CategoryStoreHouseException();
                }
                
                if (category === null || category === "undefined" || category === ""){
					category = this.defaultCategory;
				}	
                //Añadimos el producto en su array individual y recogemos su posicion.
                var position = fAddProduct(product);
               
                //Comprobamos que la categoria existe, si no, la añadimos.
                var categoryPosition = getCategoryPosition(category); 
				if (categoryPosition === -1){
					categoryPosition = this.addCategory(category)-1;
				}

                //Añadimos a la categoria el numero de serie del producto.
                _categories[categoryPosition].idProducts.push(product.serialNumber);

                return _products.length;
            }

            //Añadimos un producto ya creado a una tienda y su stock.
            this.addProductInShop = function(product, shop, stock){
                if(!(product instanceof Product)){
                    throw new ProductStoreHouseException();
                }
                if(!(shop instanceof Shop)){
                    throw new ShopStoreHouseException();
                }

                if (stock === null || stock === "undefined" || stock === ""){
					stock = 1;
				}	

                //Compropbamos si la tienda existe, si no, genera excepcion.
                var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					throw new ShopDoesntExixtsStoryHouseException();
				}

                //Comprobamos si el producto existe, si no, genera excepcion.
                var productPosition = getProductPosition(product);
                if(productPosition === -1){
                   throw new ProductDoesntExixtsStoryHouseException();
                }

                //Añadimos a la tienda el numero de serie del producto y el stock.
                _shops[shopPosition].sProducts.push(
                    {
                        idProduct: _products[productPosition].serialNumber,
                        stock: stock
                    }
                );

                return  _shops[shopPosition].sProducts.length;
            }

            this.addQuantityProductInShop = function(product, shop, stock){
                if(!(product instanceof Product)){
                    throw new ProductStoreHouseException();
                }
                if(!(shop instanceof Shop)){
                    throw new ShopStoreHouseException();
                }

                if (stock === null || stock === "undefined" || stock === ""){
					stock = 1;
				}	

                //Compropbamos si la tienda existe, si no, genera excepcion.
                var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					throw new ShopDoesntExixtsStoryHouseException();
				}

                //Comprobamos si el producto existe en la tienda, si no, genera excepcion.
                var productPosition = getProductInShopPosition(product);
                if(productPosition === -1){
                   throw new ProductDoesntExixtsStoryHouseException();
                }

                //Añadimos a la tienda el numero de serie del producto y el stock.
                _shops[shopPosition].sProducts[productPosition].stock += stock;

                return  _shops[shopPosition].sProducts[productPosition].stock;
            }

            function fAddProduct(product){
                //Comprobamos si el producto existe, si no, lo añadimos.
                var position = getProductPosition(product);
                if(position === -1){
                    _products.push(product);
                }else{
                    throw new ProductExixtsStoryHouseException();
                }
                
                return getProductPosition(product);
            }

            function getProductPosition(product){
                if(!(product instanceof Product)){
                    throw new ProductStoreHouseException();
                }

                function compareElements(elem){
                    return (elem.product.serialNumber === product.serialNumber);
                }

                return _products.findIndex(compareElements);
            }

            function getProductInShopPosition(product, shop){
                if(!(product instanceof Product)){
                    throw new ProductStoreHouseException();
                }
                if(!(shop instanceof Shop)){
                    throw new ShopStoreHouseException();
                }

                function compareElements(elem){
                    return (elem.product.serialNumber === product.serialNumber);
                }

                return _shops[shopPosition].sProducts.findIndex(compareElements);
            }

        }
        StoreHouse.prototype={};
        StoreHouse.prototype.constructor = StoreHouse;

        var instance = new StoreHouse();
        Object.freeze(instance);
        return instance;

    }//Fin Singleton
    return{
        getInstance: function(){
            if(!instantiated){
                instantiated = init();
            }
            return instantiated;
        }
    };

})();