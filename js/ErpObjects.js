"use strict";
(function(){
	var abstractCreateLock = false;


	function Product(name, description, price){
		
		if(abstractCreateLock){
			throw new UninstantiatedObjectException("Product");
		}

		if(!(this instanceof Product)){
			//throw next InvalidAccessConstructorException();
		}

		//Validacion de parametros
		name = typeof name !== "undefined" ? name : "";
		if(name === ""){throw new EmpyValueException("name");}

		price = typeof price !== "undefined" ? price : "";
		if(price === ""){throw new EmpyValueException("price");}

		var _serialNumber = counter();
		var _name = name;
		var _decription = description;
		var _price = price;

		Object.defineProperty(this, serialNumber, {
			get:function(){
				return _serialNumber;
			}
		});

		Object.defineProperty(this, name, {
			get:function(){
				return _name;
			},
			set:function(value){
				value = typeof value !== "undefined" ? value : "";
				if(value === ""){throw new EmpyValueException("name");}
				_name = value;
			}
		});

		Object.defineProperty(this, price, {
			get:function(){
				return _price;
			},
			set:function(value){
				value = typeof value !== "undefined" ? value : "";
				if(value === ""){throw new EmpyValueException("price");}
				_price = value;
			}
		});


		}

	
	Product.prototype = {};
	Product.prototype.constructor = Product;

	//Objeto Smartphone

	function Smartphone(name, description, price){
		abstractCreateLock = false;
		Product.call(this, name, description, price);
		abstractCreateLock = true;

	}
	Smartphone.prototype = Object.create(Product.prototype);
	Smartphone.prototype.constructor = Smartphone;

	//Objeto Guitarra

	function Guitarra(name, description, price){
		abstractCreateLock = false;
		Product.call(this, name, description, price);
		abstractCreateLock = true;

	}
	Guitarra.prototype = Object.create(Product.prototype);
	Guitarra.prototype.constructor = Guitarra;

	//Objeto Libro

	function Libro(name, description, price){
		abstractCreateLock = false;
		Product.call(this, name, description, price);
		abstractCreateLock = true;

	}
	Libro.prototype = Object.create(Product.prototype);
	Libro.prototype.constructor = Libro;

	abstractCreateLock = true;

	window.Product = Product;
	window.Smartphone = Smartphone;
	window.Guitarra = Guitarra;
	window.Libro = Libro;

})();

//Objeto Coords

function Coords(latitude, longitude){

	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
	if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
		throw new InvalidValueException("latitude", latitude);
	longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
	if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
		throw new InvalidValueException("longitude", longitude);

	var _latitude = latitude;
	var _longitude = longitude;

	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitude", value);
			_latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("latitude", value);
			_longitude = value;
		}		
	});		

}
Coords.prototype = {};
Coords.prototype.constructor = Coords;

//Objeto Category

function Category(title){

	if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	/*title = typeof title !== "undefined" ? title : "";
	if (title === "") {throw new EmptyValueException("title");}			*/


	var _title = validate.empty(title,"title");	
	var _description = "";

	Object.defineProperty(this, 'title', {
		get:function(){
			return _title;
		},
		set:function(value){
			value = typeof value !== "undefined" ? value : "";
			if (value === "") {throw new EmptyValueException("title");}							
			_title = title;
		}		
	});		
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			value = typeof value !== "undefined" ? value : "";
			if (value === "") {throw new EmptyValueException("description");}			
			_description = value;
		}		
	});				

}
Category.prototype = {};
Category.prototype.constructor = Category;


//Objeto Shop

function Shop(cif, name, address, tel){
	
		if (!(this instanceof Shop)) 
			throw new InvalidAccessConstructorException();
	
		cif = typeof cif !== "undefined" ? cif : "";
		if (cif === "") {throw new EmptyValueException("cif");}

		name = typeof name !== "undefined" ? name : "";
		if (name === "") {throw new EmptyValueException("name");}	

		var _cif = cif;	
		var _name = name;
		var _address = address;
		var _tel = tel;
	
		Object.defineProperty(this, "cif", {
			get:function(){
				return _cif;
			},
			set:function(value){
				value = typeof value !== "undefined" ? value : "";
				if (value === "") {throw new EmptyValueException("title");}							
				_cif = value;
			}		
		});		
		
		Object.defineProperty(this, "name", {
			get:function(){
				return _name;
			},
			set:function(value){
				value = typeof value !== "undefined" ? value : "";
				if (value === "") {throw new EmptyValueException("description");}			
				_name = value;
			}		
		});			
		
	
	}
	Shop.prototype = {};
	Shop.prototype.constructor = Shop;

//Clousure con un contador.
var counter = (function (){
	var counter = 0;
	return (function (){
		return ++counter;
	})
})();

var validate = (function(){

	var valueEmpty = function(value,type){
		value = typeof value !== "undefined" ? value : "";
	if (value === "") {throw new EmptyValueException(type);}
	};

	return{
		empty: function(value,type){
			return valueEmpty(value,type);
		}
	}

})();