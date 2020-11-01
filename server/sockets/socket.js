const { io } = require('../server');

const Usuarios = require('../classes/usuarios');
const crearMensaje = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

	client.on('entrarChat', (user, callback) => {

		if (!user.nombre || !user.sala) {
			return callback({
				err: true,
				msg: "El nombre y la sala son necesarios"
			});
		}

		client.join(user.sala);

		let todos = usuarios.agregarPersona(client.id, user.nombre, user.sala);
		client.broadcast.to(user.sala).emit('crearMensaje', crearMensaje("Administrador", `${user.nombre} ingreso el chat`));
		client.broadcast.to(user.sala).emit('listaPersonas', usuarios.getPersonasPorSala(user.sala));
		return callback(todos);
	})

	client.on('disconnect', () => {
		let borrado = usuarios.borrarPersona(client.id);
		client.broadcast.to(borrado.sala).emit('crearMensaje', crearMensaje("Administrador", `${borrado.nombre} abandono el chat`));
		client.broadcast.to(borrado.sala).emit('listaPersonas', usuarios.getPersonasPorSala(borrado.sala));
	})

	client.on('enviarMensaje', (data, callback) => {
		let persona = usuarios.getPersona(client.id);
		let mensaje = crearMensaje(persona.nombre, data.mensaje);
		client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

		callback(mensaje);
	})

	client.on('mensajePrivado', (data, callback) => {
		if (!data.receptor) {
			return callback({
				err: true,
				msg: "El nombre es necesario"
			})
		}
		let persona = usuarios.getPersona(client.id);
		let mensaje = crearMensaje(persona.nombre, data.mensaje);
		client.broadcast.to(data.receptor).emit('mensajePrivado', mensaje);
	})

});

