class Usuarios {
	constructor() {
		this.personas = [];

	}

	agregarPersona(id, nombre) {
		let persona = {
			id,
			nombre
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

	getPersonasPorSala() {
		//return this.personas;
	}

	borrarPersona(id) {
		let personaBorrada = this.getPersona(id);
		this.personas = this.personas.filter(per => per.id != id);
		return personaBorrada;
	}
}

module.exports = Usuarios;