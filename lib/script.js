if ('addEventListener' in document) {
	document.addEventListener(
		'DOMContentLoaded',
		function () {
			FastClick.attach(document.body);
		},
		false
	);
}
setTimeout(function () {
	$('#splashscreen').fadeOut('slow');
	$('#splashscreen').remove();
	$('#contentPage').hide().css('visibility', 'visible').fadeIn('slow');
}, 5000);
let toggleAssess = false;
function toggleAssesst() {
	if (toggleAssess) {
		toggleAssess = false;
	} else {
		toggleAssess = true;
	}
}
function enterVR() {
	$('#contentPage').fadeOut('slow');
	$('#contentPage').remove();
	$('#aframeCanvas').hide().css('visibility', 'visible').fadeIn('slow');
	$('#popupContainer').css('visibility', 'visible');
	setTimeout(function () {
		$('#popupContainer').css('opacity', 1);
		$('#popupContainer').addClass('animate__animated animate__slideInRight');
	}, 100);
	if (toggleAssess) {
		assestMode();
	} else {
		installEvents();
	}
}
function slideOut(element) {
	$(element).removeClass('animate__animated animate__slideInRight');
	$(element).addClass('animate__animated animate__slideOutRight');
	$('#blocker').hide();
	$('.a-canvas').css('filter', 'initial');
}
function prevscene() {
	var location = document
		.getElementById('skybox')
		.getAttribute('src')
		.split('#')[1];
	var currentLoc = parseInt(location.substring(3));
	if (currentLoc - 1 != 0) {
		$('#loc'.concat(currentLoc - 1, 'spot')).click();
	}
}
function nextscene() {
	var location = document
		.getElementById('skybox')
		.getAttribute('src')
		.split('#')[1];
	var currentLoc = parseInt(location.substring(3));
	if ($('#loc'.concat(currentLoc + 1, 'spot'))) {
		$('#loc'.concat(currentLoc + 1, 'spot')).click();
	}
}
function checkCamera(location) {
	if (location == '#loc10' || location == '#loc12' || location == '#loc13') {
		document.getElementById('skybox').setAttribute('rotation', '-6 270 0');
	} else if (location == '#loc3') {
		document.getElementById('skybox').setAttribute('rotation', '0 90 0');
	} else if (location == '#loc4') {
		document.getElementById('skybox').setAttribute('rotation', '0 170 0');
	} else if (location == '#loc7') {
		document.getElementById('skybox').setAttribute('rotation', '0 340 0');
	} else if (location == '#loc8') {
		document.getElementById('skybox').setAttribute('rotation', '-6 155 0');
	} else if (location == '#loc5') {
		document.getElementById('skybox').setAttribute('rotation', '0 190 0');
	} else if (location == '#loc6') {
		document.getElementById('skybox').setAttribute('rotation', '0 180 0');
	} else if (location == '#loc9') {
		document.getElementById('skybox').setAttribute('rotation', '-6 180 0');
	} else if (location == '#loc11') {
		document.getElementById('skybox').setAttribute('rotation', '-6 180 0');
	} else if (location == '#loc14') {
		document.getElementById('skybox').setAttribute('rotation', '0 330 0');
	} else if (location == '#loc15') {
		document.getElementById('skybox').setAttribute('rotation', '-6 330 0');
	} else {
		document.getElementById('skybox').setAttribute('rotation', '0 270 0');
	}
}
var state = false;
function installEvents() {
	var eventOrder = 2;
	var ansOrder = document.getElementsByClassName('ansOrder');
	var clickPlane = document.getElementsByClassName('clickPlane');
	var clickTitle = document.getElementsByClassName('clickTitle');
	var clickBody = document.getElementsByClassName('clickBody');
	var pulseIcons = document.getElementsByClassName('removePulse');
	for (let x = 0; x < ansOrder.length; x++) {
		[ansOrder[x], clickPlane[x], clickTitle[x], clickBody[x]].forEach(function (
			element
		) {
			element.addEventListener('mousedown', function removePulse() {
				if (state) {
					for (let y = 0; y < ansOrder.length; y++) {
						ansOrder[y].removeEventListener('mousedown', removePulse);
					}
				} else {
					pulseIcons[x].classList.add('invis');
					pulseIcons[x].setAttribute('visible', 'false');
					ansOrder[x].removeEventListener('mousedown', removePulse);
					clickPlane[x].removeEventListener('mousedown', removePulse);
					clickTitle[x].removeEventListener('mousedown', removePulse);
					clickBody[x].removeEventListener('mousedown', removePulse);

					if (eventOrder <= ansOrder.length) {
						$('#dialog'.concat(eventOrder, '--open-icon')).removeClass('invis');
						$('#dialog'.concat(eventOrder, '--pulse-icon')).removeClass(
							'invis'
						);
						eventOrder++;
					}
				}
			});
		});
	}
}
function assestMode() {
	var currentOrder = 1;
	var icons = document.getElementsByClassName('dialogIcon');
	var removePulse = document.getElementsByClassName('removePulse');
	var ansOrder = document.getElementsByClassName('ansOrder');
	var changeIcon = document.getElementsByClassName('changeIcon');
	var clickPlane = document.getElementsByClassName('clickPlane');
	var clickTitle = document.getElementsByClassName('clickTitle');
	var clickBody = document.getElementsByClassName('clickBody');

	if (!state) {
		$('#appState').css('visibility', 'visible');
		$('.tooltiptext').text('Click to enter freeview mode!');
		setTimeout(function () {
			let container = document.getElementById('assessmentContainer');
			$('#assessmentContainer').css('visibility', 'visible');
			$('#assessmentContainer').css('opacity', 1);
			$('#assessmentContainer').addClass(
				'animate__animated animate__slideInRight'
			);
		}, 100);
		anime
			.timeline({ loop: false })
			.add({
				targets: '#morph',
				width: '235px',
				x: '0',
				easing: 'easeInOutQuad',
				duration: '500',
				delay: (el, i) => 100 + 30 * i,
			})
			.add({
				targets: '#morphtext',
				translateX: [40, 0],
				translateZ: 0,
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 800,
			});
		var height = window.innerHeight - 80;
		var width = window.innerWidth - 80;

		anime({
			targets: '#topright',
			opacity: [0, 0.5],
			height: height,
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		anime({
			targets: '#topleft',
			opacity: [0, 0.5],
			width: width,
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		anime({
			targets: '#bottomright',
			opacity: [0, 0.5],
			height: height,
			y: 1000 - height,
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		anime({
			targets: '#bottomleft',
			opacity: [0, 0.5],
			width: width,
			x: 2000 - width,
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		for (let x = 0; x < ansOrder.length; x++) {
			let iconId = ansOrder[x].getAttribute('id').split('--')[0];
			let order = ansOrder[x].getAttribute('order');
			if (order) {
				changeIcon[x].classList.remove('invis');
				changeIcon[x].setAttribute('material', 'src: assets/question.png');
				changeIcon[x].setAttribute('visible', 'true');
				[ansOrder[x], clickPlane[x], clickTitle[x], clickBody[x]].forEach(
					function (element) {
						element.addEventListener('mousedown', function checkOrder() {
							if (!state) {
								for (let y = 0; y < ansOrder.length; y++) {
									ansOrder[y].removeEventListener('mousedown', checkOrder);
									clickPlane[y].removeEventListener('mousedown', checkOrder);
									clickTitle[y].removeEventListener('mousedown', checkOrder);
									clickBody[y].removeEventListener('mousedown', checkOrder);
								}
							} else {
								var currIcon = document.getElementById(
									iconId.concat('--open-icon')
								);
								if (currentOrder == order) {
									var audio1 = new Audio('assets/positive.mp3');
									audio1.volume = 0.2;
									audio1.play();
									currIcon.setAttribute('material', 'src: assets/correct.png');
									setTimeout(function () {
										currIcon.setAttribute(
											'material',
											'src: assets/question'.concat(order, '.png')
										);
									}, 1000);

									currentOrder++;
								} else if (currentOrder > order) {
									ansOrder[x].removeEventListener('mousedown', checkOrder);
									clickPlane[x].removeEventListener('mousedown', checkOrder);
									clickTitle[x].removeEventListener('mousedown', checkOrder);
									clickBody[x].removeEventListener('mousedown', checkOrder);
								} else {
									var audio2 = new Audio('assets/negative.mp3');
									audio2.volume = 0.2;
									audio2.play();
									currIcon.setAttribute('material', 'src: assets/false.png');
									setTimeout(function () {
										currIcon.setAttribute(
											'material',
											'src: assets/question.png'
										);
									}, 1000);
								}
								if (ansOrder.length < currentOrder) {
									assestMode();
								}
							}
						});
					}
				);
			}
		}
		if (removePulse) {
			$(removePulse).remove();
		}
		state = true;
		// $('.alert').hide().css('visibility', 'visible').fadeIn('slow');
	} else {
		$('#appState').css('visibility', 'hidden');
		$('.tooltiptext').text('Click to enter assessment mode!');
		anime
			.timeline({ loop: false })
			.add({
				targets: '#morphtext',
				translateX: [0, -30],
				opacity: [1, 0],
				easing: 'easeInExpo',
				duration: 500,
				delay: (el, i) => 100 + 30 * i,
			})
			.add({
				targets: '#morph',
				width: '64px',
				x: '171',
				easing: 'easeInOutQuad',
				duration: '500',
			});
		anime({
			targets: '#topright',
			opacity: [0.5, 0],
			height: '5',
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		anime({
			targets: '#topleft',
			opacity: [0.5, 0],
			width: '5',
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		anime({
			targets: '#bottomright',
			opacity: [0.5, 0],
			height: '5',
			y: '1000',
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		anime({
			targets: '#bottomleft',
			opacity: [0.5, 0],
			width: '5',
			x: '2000',
			easing: 'easeInOutQuad',
			duration: '1000',
		});
		for (let x = 0; x < ansOrder.length; x++) {
			let iconId = ansOrder[x].getAttribute('id').split('--')[0];
			let order = ansOrder[x].getAttribute('order');
			if (order) {
				document
					.getElementById(iconId.concat('--open-icon'))
					.setAttribute(
						'material',
						'src: assets/question'.concat(order, '.png')
					);
			}
		}
		state = false;
	}
}
//Hotspot Functions
AFRAME.registerComponent('hotspots', {
	init: function () {
		this.el.addEventListener('reloadspots', function (evt) {
			//get the entire current spot group and scale it to 0
			var currspotgroup = document.getElementById(evt.detail.currspots);
			currspotgroup.setAttribute('visible', 'false');

			//get the entire new spot group and scale it to 1
			var newspotgroup = document.getElementById(evt.detail.newspots);
			newspotgroup.setAttribute('visible', 'true');
		});
	},
});
AFRAME.registerComponent('spot', {
	schema: {
		linkto: { type: 'string', default: '' },
		spotgroup: { type: 'string', default: '' },
		nameLink: { type: 'string', default: '' },
	},
	init: function () {
		//add image source of hotspot icon
		this.el.setAttribute('src', '#arrow');
		this.el.setAttribute('transparent');
		this.el.setAttribute('geometry', {
			primitive: 'circle',
			radius: '0.6',
		});
		this.el.setAttribute('material', {
			color: 'white',
		});
		//make the icon look at the camera all the time
		var data = this.data;
		var tooltip = document.createElement('a-text');
		var tooltipPlane = document.createElement('a-rounded');
		var rotation = this.el.getAttribute('rotation');
		tooltip.setAttribute('rotation', {
			x: rotation.x,
			y: 180,
			z: 0,
		});
		if (rotation.x == 0) {
			tooltip.setAttribute('position', '0 0.75 -0.10');
		} else {
			tooltip.setAttribute('position', '0 0.6 -0.10');
		}
		tooltipPlane.setAttribute('rotation', {
			x: rotation.x,
			y: 180,
			z: 0,
		});
		tooltipPlane.setAttribute('position', '0.75 0.65 0');
		tooltipPlane.setAttribute(
			'rounded',
			'height: 0.35; width: 1.5; color: #ffffff'
		);
		tooltipPlane.setAttribute('material', 'shader: flat;');
		tooltip.setAttribute('text', {
			value: data.nameLink,
			align: 'center',
			font: 'assets/raleway.json',
			shader: 'msdf',
			baseline: 'top',
			color: '#456ab7',
		});

		tooltip.setAttribute('visible', 'false');
		tooltipPlane.setAttribute('visible', 'false');
		this.el.appendChild(tooltip);
		this.el.appendChild(tooltipPlane);

		this.el.addEventListener('mouseenter', function () {
			tooltip.setAttribute('visible', 'true');
			tooltipPlane.setAttribute('visible', 'true');
			$('.a-canvas.a-grab-cursor:hover').css('cursor', 'pointer');
		});
		this.el.addEventListener('mouseleave', function () {
			tooltip.setAttribute('visible', 'false');
			tooltipPlane.setAttribute('visible', 'false');
			$('.a-canvas.a-grab-cursor:hover').css('cursor', 'grab');
		});
		document
			.getElementsByClassName('a-canvas')[0]
			.addEventListener('mousedown', function () {
				$('.a-canvas.a-grab-cursor:hover').css('cursor', 'grabbing');
			});
		document
			.getElementsByClassName('a-canvas')[0]
			.addEventListener('mouseup', function () {
				$('.a-canvas.a-grab-cursor:hover').css('cursor', 'grab');
			});
		this.el.addEventListener('mousedown', function () {
			checkCamera(data.linkto);
			//set the skybox source to the new image as per the spot
			var sky = document.getElementById('skybox');
			sky.setAttribute('src', data.linkto);

			var spotcomp = document.getElementById('spots');
			var currspots = this.parentElement.getAttribute('id');
			//create event for spots component to change the spots data
			spotcomp.emit('reloadspots', {
				newspots: data.spotgroup,
				currspots: currspots,
			});
		});
	},
});
