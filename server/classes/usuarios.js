class Usuarios {
	constructor() {
		this.personas = [];

	}

	agregarPersona(id, nombre, sala) {
		let persona = {
			id,
			nombre,
			sala
		};

		this.personas.push(persona);

		return this.personas;
	}

	getPersona(id) {
		return this.personas.find(per => per.id === id);
	}

	getPersonas() {
		return this.personas;
	}

	getPersonasPorSala(sala) {
		return this.personas.filter(per => per.sala === sala);
	}

	borrarPersona(id) {
		let personaBorrada = this.getPersona(id);
		this.personas = this.personas.filter(per => per.id != id);
		return personaBorrada;
	}
}

module.exports = Usuarios;