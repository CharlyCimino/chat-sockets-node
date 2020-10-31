const { io } = require('../server');

const Usuarios = require('../classes/usuarios');
const crearMensaje = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

	client.on('entrarChat', (user, callback) => {

		if (!user.nombre) {
			return callback({
				err: true,
				msg: "El nombre es necesario"
			});
		}
		let todos = usuarios.agregarPersona(client.id, user.nombre);
		client.broadcast.emit('crearMensaje', crearMensaje("Administrador", `${user.nombre} ingreso el chat`));
		client.broadcast.emit('listaPersonas', usuarios.getPersonas());
		return callback(todos);
	})

	client.on('disconnect', () => {
		let borrado = usuarios.borrarPersona(client.id);
		client.broadcast.emit('crearMensaje', crearMensaje("Administrador", `${borrado.nombre} abandono el chat`));
		client.broadcast.emit('listaPersonas', usuarios.getPersonas());
	})

	client.on('enviarMensaje', data => {

		let persona = usuarios.getPersona(client.id);
		let mensaje = crearMensaje(persona.nombre, data.mensaje);
		client.broadcast.emit('crearMensaje', mensaje);
	})

});

