# Para lanzar la aplicación

No tiene complicación, solamente he usado Browserify en local para utilizar common.js. He subido el bundle para que no haya que realizar el proceso de compilado.

Por lo que los pasos a seguir son:

1. Descomprimir el proyecto.
2. Abrir consola y navegar hasta la carpeta del proyecto.
3. Ejecutar: ```npm install```.
4. Abrir el archivo ```index.html``` desde cualquier navegador (preferiblemente Chrome).


# Front-end Test - Ezequiel Gómez

Aprovecho este apartado no sólo para reflejar pensamientos, aclaraciones o notas técnicas que he tenido a la hora de realizar esta práctica, sino también como medio de carta de presentación o motivación que ayude a conocer mejor mi perfil.

Llevo un tiempo como **web developer**, pero más tiempo como filósofo. Es por eso que a la hora de plantear esta prueba dedique tiempo a reflexionar sobre cómo podría hacerla saliendo de lo que suele ser normal (dentro de mi experiencia, claro). Así que opté por mostrar dos polos opuestos en cuanto a formas de trabajar con Javacript se refiere, a saber: la creación dinámica de elementos HTML en DOM junto con el paradigma de programación reactiva utilizando la librería RxJS. De esta manera pretendo mostrar que tengo conocimientos básicos de Javascript como avanzados y actuales en cuanto a tecnologías se refiere; además de que se adaptaban muy bien para esta prueba.

En cuanto a la programación reactiva me gusta la forma declarativa de trabajar y la cantidad de operadores que hacen la vida más fácil de un programador; eso sí, una vez entras dentro de la forma de pensar necesaria para entender tales conceptos. Si bien la creación de elementos HTML se podría utilizar el operador de **template string de ES6**, la decisión de no usarla fue más que nada trivial; ambas puedes cumplir la función, si bien con el template string la lectura es amena, pero a la vez mezclamos HTML con JS. Es custión de gustos (yo prefiero template string, por eso opté por hacerlo de la otra manera, la menos cómoda :D).

Sobre la modificación del index.html ha sido leve: añadir atributos **id** y algun estilo default para ocultar elementos.

He creado tres servicios, si bien no son exactamente **servicios** propiamente dichos, ya que entiendo servicios como una herramienta que me ayuda a obtener datos desde fuera de la propia app. La decisión por tanto de nuevo es meramente por aglomerar pequeños archivos en una única carpeta (que podría ser tools, factories, etc....).

Por último decir que en el **local storage** se guardan los datos enteros en forma de string ya no veía necesario guardar solamente el **id** y realizar las consultas previas para obtener los favoritos. Es verdad que el local storage tiene un límite pequeño de datos pero creo que suficiente para realizar este test.

Con esto termino, gracias por llegar hasta el final  y un saludo!