
var params = new URLSearchParams(window.location.search);

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var inputMensaje = $('#inputMensaje');
var divChatbox = $('#divChatbox');

function renderUsuarios(usuarios) {
	console.log(usuarios);

	var html = '';

	html += '<li>';
	html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
	html += '</li>';

	for (let i = 0; i < usuarios.length; i++) {
		let user = usuarios[i];
		html += '<li>'
		html += '<a data-id="' + user.id + '" href="javascript:void(0)">'
		html += '<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">'
		html += '<span>' + user.nombre + '<small class="text-success">online</small></span>'
		html += '</a>'
		html += '</li>'
	}

	divUsuarios.html(html);
}

divUsuarios.on('click', 'a', function () {
	var id = $(this).data('id')
	if (id) {
		console.log(id);
	}
});

formEnviar.on('submit', function (e) {
	e.preventDefault();
	if (inputMensaje.val().trim().length !== 0) {
		socket.emit('enviarMensaje', {
			nombre,
			mensaje: inputMensaje.val()
		}, function (resp) {
			inputMensaje.val('').focus();
			renderMensaje(resp, true);
			scrollBottom();
		});
	}
});

function renderMensaje(msj, yo) {
	var html = '';
	var fecha = new Date(msj.fecha);
	var hora = fecha.getHours() + ':' + fecha.getMinutes();

	var adminClass = 'info';

	if (msj.nombre === 'Administrador') {
		adminClass = 'danger';
	}

	if (!yo) {
		html += '<li class="animated fadeIn">'
		if (msj.nombre !== 'Administrador') {
			html += '	<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" />'
		}
		html += '	</div>'
		html += '	<div class="chat-content">'
		html += '		<h5>' + msj.nombre + '</h5>'
		html += '		<div class="box bg-light-' + adminClass + '">' + msj.mensaje + '</div>'
		html += '	</div>'
		html += '	<div class="chat-time">' + hora + '</div>'
		html += '</li>'
	} else {
		html += '<li class="reverse">';
		html += '	<div class="chat-content">';
		html += '		<h5>' + msj.nombre + '</h5>';
		html += '		<div class="box bg-light-inverse">' + msj.mensaje + '</div > ';
		html += '	</div>';
		html += '	<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />';
		html += '	</div>';
		html += '	<div class="chat-time">' + hora + '</div>';
		html += '</li >';
	}

	divChatbox.append(html);
}

function scrollBottom() {

	// selectors
	var newMessage = divChatbox.children('li:last-child');

	// heights
	var clientHeight = divChatbox.prop('clientHeight');
	var scrollTop = divChatbox.prop('scrollTop');
	var scrollHeight = divChatbox.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight() || 0;

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		divChatbox.scrollTop(scrollHeight);
	}
}