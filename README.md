# FrameworkERP

versión 1.0.0:
Se añaden los ficheros con las excepciones genéricas, los objetos que se usarán en el eRP
y el objeto que gestionará el Store House. Todos aun sin terminar.

versión 1.0.1
Versión entregada en la Práctica UT04.2. Faltan por terminar:
- removeCategory
- removeProduct
- removeShop
- Propiedades especificas de cada subproducto(hasta ahora solo heredan las del objeto padre)
- Array de imagenes en los productos
- Validacion de algunos parametros y los errores personalizados para ello.
- Optimizar el codigo.
Se entrega incompleto para no exceder la fecha limite de entrega. 
Se completará en las siguientes semanas a fin de que esté listo para las proximas entregas que dependan de este código base.

versión 1.0.2
Versión terminada de la Práctica UT04.2. Se han realizado los siguientes cambios:
- Añadida la eliminacion de categorias, tiendas y productos, asi como sus relaciones entre ellos.
- A ñadidas propiedades específicas a cada producto heredado de Product.
- Añadido el array de imágenes a los productos.
- Se implementan las validaciones de categorias, tiendas y productos en funciones para evitar repetir código.
- Se implementan algunas funciones existentes en la versión anterior como funciones flecha.

versión 1.1.0
Versión terminada de la Práctica UT05

versión 1.2.0
Versión terminada de la Práctica UT06. Se incluye la estructura básica de los formularios
de la Práctica UT07 (aun incompletos).

versión 1.3.0
Versión terminada de la Práctica UT07. Cronometro terminado de la Práctica UT08 y comienzo de la parte IndexedDB (aun incompleta).

versión 1.3.1
Correccion de errores de la Practica UT07. En esta version se incluyen unicamente la práctica 7 y el cronometro de la practica 08 dado que es la que se utilizara para realizar la entrega de Ut07 y lo realizado hasta ahora de la practica8 hace que la aplicacion no se ejecute correctamente debido a errores.

Versión 1.4.0
Practica UT08 terminada. Se incluyen los archivos de cache comentados, dado que surgen problemas al cargar solo determinados elementos del sitio y otros no.
Se implementa la funcion para eliminar tanto productos como categorias y tiendas que no se implementó por error en la practica anterior.

Versión 1.5.0
Practica UT09 terminada. El fichero Json donde se guardan los datos para la carga del ERP se ha dividido en tres (products.json, shops.json, categories.json) a fin de mantener los datos organizados segun su tipo,
facilitando asi posibles tareas de mantenimiento o gestion de errores en las practicas siguientes. El fichero que guarda los datos del usuario en el servidor se encuentra junto con estos en la carpeta json.
Debido a la falta de tiempo, no se incluye el apartado de los workers, se intentará incluir mas adelante.