var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre')) {
	window.location = 'index.html'
	throw new Error("Nombre necesario");
}

var usuario = {
	nombre: params.get('nombre')
}

socket.on('connect', function () {
	console.log('Conectado al servidor');

	socket.emit('entrarChat', usuario, function (resp) {
		console.table(resp);
	})
});

// escuchar
socket.on('disconnect', function () {

	console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
// 	usuario: 'Fernando',
// 	mensaje: 'Hola Mundo'
// }, function (resp) {
// 	console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {

	console.log('Servidor:', mensaje);

});

socket.on('listaPersonas', function (usuarios) {

	console.table('Lista de usuarios:', usuarios);

});

// Mensajes privados

socket.on('mensajePrivado', function (mensaje) {
	console.log('Mensaje privado: ', mensaje);
})