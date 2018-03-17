"use strict";
(function(){
	var abstractCreateLock = false;


	function Product(name, price, description, img, tax, ){
		
		if(abstractCreateLock){
			throw new UninstantiatedObjectException("Product");
		}

		if(!(this instanceof Product)){
			throw new InvalidAccessConstructorException();
		}

		tax = typeof tax !== 'undefined' ? tax : Product.IVA;

		var _serialNumber = counter();
		var _name = validate.empty(name,"name");	
		var _description = description;
		var _price =validate.empty(price,"price");	
		var _tax = tax ;
		//temporal
		var _image = img;
		//var _images = [];


		Object.defineProperty(this, "serialNumber", {
			get:function(){
				return _serialNumber;
			}
		});

		Object.defineProperty(this, "name", {
			get:function(){
				return _name;
			},
			set:function(value){
				_name = validate.empty(value,"name");
			}
		});

		Object.defineProperty(this, "price", {
			get:function(){
				return _price;
			},
			set:function(value){
				_price = validate.empty(value,"price");
			}
		});

		Object.defineProperty(this, "description", {
			get:function(){
				return _description;
			},
			set:function(value){
				//descripcion puede estar vacio.
				_description = value;
			}
		});

		//temporal
		Object.defineProperty(this, "images", {
			get:function(){
				return _image;
			},
			set:function(value){
				_image = value;
			}
		});

		//Se deja la estructura implementada pero aun no es funcional, dado que todavia no sabemos
		//como se guardarán las imagenes en el array(una url, un objeto embebido, por referencia...)
		/*Object.defineProperty(this, "images", {
			get:function(){
				var nextIndex = 0;
				return{
					next: function(){
						return nextIndex < _images.length ? 
						{value: _images[nextIndex++].img, done:false} :
						{done:true};
					}
				}
			},
			set:function(value){
				_images.push(value);
			}
		});*/


		}

	
	Product.prototype = {};
	Product.prototype.constructor = Product;
	Product.prototype.getObject = function(){
		return{
			serialNumber: this.serialNumber,
			name: this.name,
			price: this.price,
			description: this.description,
			image: this.images
		};
	}
	Object.defineProperty(Product, 'IVA', {
		value:21,
		writable:false,
		enumerable:true,
		configurable:false
});

	//Objeto Smartphone

	function Smartphone(name, price, description,  img, tax, size){
		abstractCreateLock = false;
		Product.call(this, name, price, description, img, tax);
		abstractCreateLock = true;

		var _screenSize = size;


		Object.defineProperty(this, "screenSize", {
			get:function(){
				return _screenSize;
			},
			set:function(value){
				_screenSize = value;
			}
		});

	}
	Smartphone.prototype = Object.create(Product.prototype);
	Smartphone.prototype.constructor = Smartphone;

	//Objeto Guitarra

	function Guitarra(name, price, description,  img, tax, type){
		abstractCreateLock = false;
		Product.call(this, name, price, description, img, tax);
		abstractCreateLock = true;

		var _type = type;


		Object.defineProperty(this, "type", {
			get:function(){
				return _type;
			},
			set:function(value){
				_type = value;
			}
		});

	}
	Guitarra.prototype = Object.create(Product.prototype);
	Guitarra.prototype.constructor = Guitarra;

	//Objeto Libro

	function Libro(name, price, description,  img, tax, genre){
		abstractCreateLock = false;
		Product.call(this, name, price, description, img, tax);
		abstractCreateLock = true;

		var _genre = genre;


		Object.defineProperty(this, "genre", {
			get:function(){
				return _genre;
			},
			set:function(value){
				_genre = value;
			}
		});
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

function Category(title, desc){

	if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	var _title = validate.empty(title,"title");	
	var _description = desc;

	Object.defineProperty(this, 'title', {
		get:function(){
			return _title;
		},
		set:function(value){
			value = typeof value !== "undefined" ? value : "";
			if (value === "") {throw new EmptyValueException("title");}							
			_title = value;
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
Category.prototype.getObject = function(){
	return{
		title: this.title,
		description: this.description
	};
}


//Objeto Shop

function Shop(cif, name, address, tel){
	
		if (!(this instanceof Shop)) 
			throw new InvalidAccessConstructorException();

		var _cif = validate.empty(cif,"cif");	
		var _name = validate.empty(name,"name");	
		var _address = address;
		var _tel = tel;
		var _coords = null;

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
				
		Object.defineProperty(this, 'coords', {
			get:function(){
				return _coords;
			},
			set:function(value){
				if (value === 'undefined' || value == null) throw new EmptyValueException("coords");	
				if (!value instanceof Coords) throw new InvalidValueException("coords", value);		
				_coords = value;
			}		
		});		
	
	}
	Shop.prototype = {};
	Shop.prototype.constructor = Shop;
	Shop.prototype.getObject = function(){
		return{
			cif: this.cif,
			name: this.name,
			address: this.address,
			tel: this.tel,
            coords: this.coords
		};
	}

//Clousure con un contador.
var counter = (function (){
	var counter = 100000000;
	return (function (){
		return ++counter;
	})
})();

//Modulo para validar si un valor obligatorio esta vacio. si lo está, genera excepcion, si no, devuelve el valor.
var validate = (function(){

	var valueEmpty = function(value,type){
		value = typeof value !== "undefined" ? value : "";
		if (value === "") {throw new EmptyValueException(type);}
		return value;
	};

	return{
		empty: function(value,type){
			return valueEmpty(value,type);
		}
	}

})();