const { io } = require('../server');

const Usuarios = require('../classes/usuarios');

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
		return callback(todos);
	})


});

