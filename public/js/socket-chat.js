var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
	window.location = 'index.html'
	throw new Error("Nombre y sala son necesarios");
}

var nombre = params.get('nombre');
var sala = params.get('sala');

var usuario = {
	nombre,
	sala
}

socket.on('connect', function () {
	console.log('Conectado al servidor');

	socket.emit('entrarChat', usuario, function (resp) {
		renderUsuarios(resp);
	})
});

// escuchar
socket.on('disconnect', function () {

	console.log('Perdimos conexión con el servidor');

});



// Escuchar información
socket.on('crearMensaje', function (mensaje) {
	renderMensaje(mensaje, false);
	scrollBottom();
});

socket.on('listaPersonas', function (usuarios) {
	renderUsuarios(usuarios);
});

// Mensajes privados

socket.on('mensajePrivado', function (mensaje) {
	console.log('Mensaje privado: ', mensaje);
})