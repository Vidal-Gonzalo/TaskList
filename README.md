#TaskList
Esta aplicación le permitirá al empleador iniciar sesión con su nombre de usuario y contraseña para luego poder ver las tareas pendientes y completadas representadas en un gráfico, a su lado estarán los detalles de las mismas.

#Para instalar las dependencias usar:
npm install

#Para configurar el lado del servidor:
Instalar mySQL.
Crear base de datos denominada "LoginSystem"
Crear una tabla llamada "users"
Crear una fila con los siguientes valores:
id: AI (Auto Incremental) - username: gerente - password: pass123

#Iniciar el servidor con:
node index.js / nodemon

#Para iniciar el cliente:
npm start

(Falta añadir registro y hashing)
