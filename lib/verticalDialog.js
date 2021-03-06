/******/ (function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/ var installedModules = {}; // The require function
	/******/
	/******/ /******/ function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/ if (installedModules[moduleId]) {
			/******/ return installedModules[moduleId].exports;
			/******/
		} // Create a new module (and put it into the cache)
		/******/ /******/ var module = (installedModules[moduleId] = {
			/******/ i: moduleId,
			/******/ l: false,
			/******/ exports: {},
			/******/
		}); // Execute the module function
		/******/
		/******/ /******/ modules[moduleId].call(
			module.exports,
			module,
			module.exports,
			__webpack_require__
		); // Flag the module as loaded
		/******/
		/******/ /******/ module.l = true; // Return the exports of the module
		/******/
		/******/ /******/ return module.exports;
		/******/
	} // expose the modules object (__webpack_modules__)
	/******/
	/******/
	/******/ /******/ __webpack_require__.m = modules; // expose the module cache
	/******/
	/******/ /******/ __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context
	/******/
	/******/ /******/ __webpack_require__.i = function (value) {
		return value;
	}; // define getter function for harmony exports
	/******/
	/******/ /******/ __webpack_require__.d = function (exports, name, getter) {
		/******/ if (!__webpack_require__.o(exports, name)) {
			/******/ Object.defineProperty(exports, name, {
				/******/ configurable: false,
				/******/ enumerable: true,
				/******/ get: getter,
				/******/
			});
			/******/
		}
		/******/
	}; // getDefaultExport function for compatibility with non-harmony modules
	/******/
	/******/ /******/ __webpack_require__.n = function (module) {
		/******/ var getter =
			module && module.__esModule
				? /******/ function getDefault() {
						return module['default'];
				  }
				: /******/ function getModuleExports() {
						return module;
				  };
		/******/ __webpack_require__.d(getter, 'a', getter);
		/******/ return getter;
		/******/
	}; // Object.prototype.hasOwnProperty.call
	/******/
	/******/ /******/ __webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	}; // __webpack_public_path__
	/******/
	/******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
	/******/
	/******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
	/******/
})(
	/************************************************************************/
	/******/ [
		/* 0 */
		/***/ function (module, exports, __webpack_require__) {
			'use strict';

			/**
			 * @file index.js
			 * Contains code that registers a dialog popup component.
			 */

			/* global AFRAME */
			if (typeof AFRAME === 'undefined') {
				throw new Error(
					'Component attempted to register before AFRAME was available.'
				);
			}
			/**
			 * Dialog Popup component for A-Frame.
			 */

			AFRAME.registerComponent('dialog-popup', {
				schema: {
					title: {
						type: 'string',
						default: 'New Dialog',
					},
					titleColor: {
						type: 'string',
						default: 'black',
					},
					titleFont: {
						type: 'string',
						default: 'mozillavr',
					},
					titleWrapCount: {
						type: 'number',
						default: 24,
					},
					body: {
						type: 'string',
						default: '',
					},
					bodyColor: {
						type: 'string',
						default: 'black',
					},
					bodyFont: {
						type: 'string',
						default: 'mozillavr',
					},
					bodyWrapCount: {
						type: 'number',
						default: 30,
					},
					openOn: {
						type: 'string',
						default: 'mouseenter',
					},
					active: {
						type: 'boolean',
						default: true,
					},
					openIconImage: {
						type: 'asset',
						default: 'assets/info.png',
					},
					openIconRadius: {
						type: 'number',
						default: 0.3,
					},
					openIconColor: {
						type: 'string',
						default: 'white',
					},
					closeIconImage: {
						type: 'asset',
						default: '',
					},
					closeIconRadius: {
						type: 'number',
						default: 0.3,
					},
					closeIconColor: {
						type: 'string',
						default: 'white',
					},
					image: {
						type: 'string',
						default: '',
					},
					imageWidth: {
						type: 'number',
						default: 3,
					},
					imageHeight: {
						type: 'number',
						default: 3,
					},
					dialogBoxWidth: {
						type: 'number',
						default: 3,
					},
					dialogBoxHeight: {
						type: 'number',
						default: 4,
					},
					dialogBoxColor: {
						type: 'string',
						default: 'white',
					},
					dialogBoxPadding: {
						type: 'number',
						default: 0.2,
					},
					previousDialog: {
						type: 'string',
						default: '',
					},
					multiple: {
						type: 'boolean',
						default: 'false',
					},
				},
				multiple: true,
				dialogPlaneEl: null,
				openIconEl: null,
				closeIconEl: null,
				titleEl: null,
				bodyEl: null,
				imageEl: null,
				hasImage: false,

				/**
				 * Spawns the entities required to support this dialog.
				 */
				init: function init() {
					this.cameraEl = document.querySelector('[camera]');
					this.spawnEntities();
					this.el.emit('loaded');
				},

				/**
				 * If the component is open, ensure it always faces the camera.
				 */
				tick: function tick() {
					if (this.isOpen) {
						this.positionDialogPlane();
					}
				},

				/**
				 * When this component is removed, destruct event listeners.
				 */
				remove: function remove() {
					var openOn = this.data.openOn;
					this.openIconEl.removeEventListener(
						openOn,
						this.toggleDialogOpen.bind(this)
					);
					this.closeIconEl.removeEventListener(
						openOn,
						this.toggleDialogOpen.bind(this)
					);
				},

				/**
				 * When this component is updated, re-calculate title, body, image, and
				 * dialog plane to incorporate changes.
				 */
				update: function update() {
					this.generateTitle();
					this.generateBody();
					this.generateImage();
				},

				/**
				 * Handles opening and closing the dialog plane.
				 */

				/**
				 * Generates the open icon.
				 */
				generateOpenIcon: function generateOpenIcon() {
					var _this$data = this.data,
						radius = _this$data.openIconRadius,
						color = _this$data.openIconColor,
						src = _this$data.openIconImage,
						openOn = _this$data.openOn,
						after = _this$data.previousDialog,
						multiple = _this$data.multiple;

					var idname = this.el.getAttribute('id');
					var openIcon = document.createElement('a-entity');
					var pulseIcon = document.createElement('a-entity');
					var pos = this.el.getAttribute('position');
					openIcon.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--open-icon')
					);
					openIcon.setAttribute('position', Object.assign({}, pos));
					pulseIcon.setAttribute('position', Object.assign({}, pos));
					openIcon.setAttribute('geometry', {
						primitive: 'circle',
						radius: radius,
					});

					// If the parent entity has aa look-at component attached, apply the look-at
					// component to the openIcon.
					//openIcon.classList.add('removeIcon');
					openIcon.classList.add('dialogIcon');

					if (multiple) {
						pulseIcon.setAttribute('id', ''.concat(idname, '--pulse-icon'));

						pulseIcon.setAttribute('geometry', {
							primitive: 'circle',
							radius: radius + 0.01,
						});
						pulseIcon.setAttribute('material', {
							src: 'assets/pulse.png',
							transparent: 'true',
						});
						//pulseIcon.classList.add('removePulse');
						var matches = idname.match(/(\d+)/);

						let iconSrc = 'assets/question'.concat(matches[0], '.png');

						openIcon.setAttribute('material', {
							color: color,
							src: iconSrc,
						});
						pulseIcon.setAttribute(
							'animation__scale',
							'property: scale; to: 1.2 1.2 1; loop: true;'
						);
						if (after) {
							openIcon.classList.add('invis');
							pulseIcon.classList.add('invis');

							openIcon.setAttribute('visible', 'false');
							pulseIcon.setAttribute('visible', 'false');
							$(window).on('load', function () {
								document
									.getElementById(after.concat('--open-icon'))
									.addEventListener('mouseenter', function () {
										makeVis();
									});
								document
									.getElementById(after.concat('--pulse-icon'))
									.addEventListener('mouseenter', function () {
										makeVis();
									});
							});
							function makeVis() {
								document
									.getElementById(after.concat('--open-icon'))
									.removeEventListener('mouseenter', makeVis);

								$(openIcon).removeClass('invis');
								$(pulseIcon).removeClass('invis');
							}
						}
					} else {
						openIcon.setAttribute('material', {
							color: color,
							src: src,
						});
					}
					pulseIcon.setAttribute('look-at', '#cam');
					openIcon.setAttribute('look-at', '#cam');
					$(window).on('load', function () {
						openIcon.addEventListener('mouseenter', function () {
							openPlane();
						});
						pulseIcon.addEventListener('mouseenter', function () {
							openPlane();
						});
						function openPlane() {
							//var removeIcon = $('.removeIcon');
							//var removePulse = $('.removePulse');

							document
								.getElementById(''.concat(idname, '--dialog-plane'))
								.setAttribute('visible', 'true');

							// for (let x = 0; x < removeIcon.length; x++) {
							// 	removeIcon[x].setAttribute('visible', 'false');
							// }
							// if (removePulse) {
							// 	for (let x = 0; x < removePulse.length; x++) {
							// 		removePulse[x].setAttribute('visible', 'false');
							// 	}
							// }
							if ($(pulseIcon)) {
								$(pulseIcon).remove();
							}
						}
					});

					this.openIconEl = openIcon;

					return [openIcon, pulseIcon];
				},

				/**
				 * Generates the close icon.
				 */
				generateCloseIcon: function generateCloseIcon() {
					var _this$data2 = this.data,
						radius = _this$data2.closeIconRadius,
						color = _this$data2.closeIconColor,
						src = _this$data2.closeIconImage,
						width = _this$data2.dialogBoxWidth,
						height = _this$data2.dialogBoxHeight,
						openOn = _this$data2.openOn;
					var closeIcon = document.createElement('a-entity');
					closeIcon.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--close-icon')
					);
					closeIcon.setAttribute('position', {
						x: width / 2,
						y: height / 2,
						z: 0.01,
					});
					closeIcon.setAttribute('geometry', {
						primitive: 'circle',
						radius: radius,
					});
					closeIcon.setAttribute('material', {
						color: color,
						src: src,
					});
					closeIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
					this.closeIconEl = closeIcon;
					return closeIcon;
				},

				/**
				 * Generates the title text.
				 */
				generateTitle: function generateTitle() {
					var _this$data3 = this.data,
						value = _this$data3.title,
						color = _this$data3.titleColor,
						font = _this$data3.titleFont,
						wrapCount = _this$data3.titleWrapCount,
						width = _this$data3.dialogBoxWidth,
						height = _this$data3.dialogBoxHeight,
						padding = _this$data3.dialogBoxPadding,
						imageHeight = _this$data3.imageHeight;
					var title = this.titleEl || document.createElement('a-entity');
					title.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--title')
					);
					title.setAttribute('text', {
						value: value.substring(0, wrapCount),
						color: '#456ab7',
						align: 'center',
						font: 'dejavu',
						letterSpacing: -2,
						wrapCount: 15,
						width: width - padding * 2,
						baseline: 'center',
						anchor: 'center',
					});
					var y = height / 2 - padding;

					if (this.hasImage) {
						y -= imageHeight / 2;
					}

					title.setAttribute('position', {
						x: 0,
						y: -1.4,
						z: 0.01,
					});
					this.titleEl = title;
					return title;
				},

				/**
				 * Generates the body text entity.
				 */
				generateBody: function generateBody() {
					var _this$data4 = this.data,
						value = _this$data4.body,
						color = _this$data4.bodyColor,
						font = _this$data4.bodyFont,
						wrapCount = _this$data4.bodyWrapCount,
						width = _this$data4.dialogBoxWidth,
						height = _this$data4.dialogBoxHeight,
						padding = _this$data4.dialogBoxPadding,
						imageHeight = _this$data4.imageHeight;

					var body = this.bodyEl || document.createElement('a-entity');
					body.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--title')
					);
					body.setAttribute('text', {
						value: value,
						color: color,
						font: font,
						wrapCount: wrapCount,
						width: width - padding * 2,
						baseline: 'top',
						anchor: 'left',
					});
					var y = height / 2 - padding * 3;

					if (this.hasImage) {
						y -= imageHeight / 2;
					}

					body.setAttribute('position', {
						x: -(width / 2) + padding,
						y: y,
						z: 0.01,
					});
					this.bodyEl = body;
					return body;
				},

				/**
				 * Generates the image entity.
				 */
				generateImage: function generateImage() {
					var _this$data5 = this.data,
						src = _this$data5.image,
						width = _this$data5.imageWidth,
						height = _this$data5.imageHeight,
						dialogBoxHeight = _this$data5.dialogBoxHeight;

					if (!src.length) {
						return null;
					}
					var image = this.imageEl || document.createElement('a-rounded');
					image.classList.add('ansOrder');
					var idname = this.el.getAttribute('id');

					var matches = idname.match(/(\d+)/);

					image.setAttribute('order', matches[0]);
					image.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--image')
					);
					image.setAttribute('material', {
						src: src,
						height: height,
						width: width,
					});
					image.setAttribute('scale', '3 3 1');
					image.setAttribute('width', '1');
					image.setAttribute('height', '1');
					image.setAttribute('position', {
						x: -1.5,
						y: -1,
						z: 0.01,
					});
					this.hasImage = true;
					this.imageEl = image;
					return image;
				},

				/**
				 * Generates the dialog plane.
				 */
				generateDialogPlane: function generateDialogPlane() {
					var _this$data6 = this.data,
						width = _this$data6.dialogBoxWidth,
						height = _this$data6.dialogBoxHeight,
						padding = _this$data6.dialogBoxPadding,
						color = _this$data6.dialogBoxColor;
					var plane = this.dialogPlaneEl || document.createElement('a-entity');
					var idname = this.el.getAttribute('id');
					plane.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--dialog-plane')
					);
					plane.setAttribute('look-at', '#cam');

					plane.setAttribute(
						'position',
						Object.assign({}, this.el.getAttribute('position'))
					);
					plane.setAttribute('visible', false);
					plane.setAttribute('geometry', {
						primitive: 'plane',
						width: '3.2',
						height: '4.21',
					});
					var image = this.generateImage();

					if (image) {
						plane.appendChild(this.generateImage());
					}

					plane.setAttribute('material', {
						color: color,
						src: 'assets/verticalDialog.png',
						transparent: true,
					});
					plane.appendChild(this.generateTitle());
					plane.appendChild(this.generateBody());
					document
						.getElementById('skybox')
						.addEventListener('mouseenter', function () {
							var newEl = document.getElementById(
								''.concat(idname, '--open-icon')
							);
							if (!newEl.classList.contains('invis')) {
								document
									.getElementById(''.concat(idname, '--dialog-plane'))
									.setAttribute('visible', 'false');
								newEl.setAttribute('visible', 'true');
							}
							var newPulse = document.getElementById(
								''.concat(idname, '--pulse-icon')
							);
							if (newPulse) {
								if (!newPulse.classList.contains('invis')) {
									newPulse.setAttribute('visible', 'true');
								}
							}
						});
					this.dialogPlaneEl = plane;
					return plane;
				},
				positionDialogPlane: function positionDialogPlane() {
					if (this.dialogPlaneEl) {
						var vector = this.dialogPlaneEl.object3D.parent.worldToLocal(
							this.cameraEl.object3D.getWorldPosition()
						);
						this.dialogPlaneEl.object3D.lookAt(vector);
					}
				},
				spawnEntities: function spawnEntities() {
					let icons = this.generateOpenIcon();
					this.el.appendChild(icons[0]);
					this.el.appendChild(icons[1]);
					this.el.appendChild(this.generateDialogPlane());
					this.el.removeAttribute('position');
				},
			});

			/***/
		},
		/******/
	]
);
var state = false;
function assestMode() {
	var currentOrder = 1;
	var icons = document.getElementsByClassName('dialogIcon');
	var invisIcons = document.getElementsByClassName('invis');
	var ansOrder = document.getElementsByClassName('ansOrder');
	if (!state) {
		if (invisIcons.length == 0) {
			$('#appState').css('visibility', 'visible');
			$('.tooltiptext').text('Click here to go to freeview mode!');
			for (let x = 0; x < ansOrder.length; x++) {
				let iconId = ansOrder[x].getAttribute('id').split('--')[0];
				let order = ansOrder[x].getAttribute('order');
				ansOrder[x].addEventListener('click', function checkOrder() {
					var currIcon = document.getElementById(iconId.concat('--open-icon'));
					if (currentOrder == order) {
						var audio = new Audio('assets/positive.mp3');
						audio.play();
						currIcon.setAttribute('material', 'src: assets/correct.png');
						setTimeout(function () {
							currIcon.setAttribute(
								'material',
								'src: assets/question'.concat(order, '.png')
							);
						}, 1000);

						ansOrder[x].removeEventListener('click', checkOrder);
						currentOrder++;
					} else {
						var audio = new Audio('assets/negative.mp3');
						audio.play();
						currIcon.setAttribute('material', 'src: assets/false.png');
						setTimeout(function () {
							currIcon.setAttribute('material', 'src: assets/question.png');
						}, 1000);
					}
				});
			}
			for (let x = 0; x < icons.length; x++) {
				icons[x].setAttribute('material', 'src: assets/question.png');
			}
			state = true;
		} else {
			$('.alert').hide().css('visibility', 'visible').fadeIn('slow');
		}
	} else {
		$('#appState').css('visibility', 'hidden');
		$('.tooltiptext').text('Click here to go to assessment mode!');
		for (let x = 0; x < ansOrder.length; x++) {
			let iconId = ansOrder[x].getAttribute('id').split('--')[0];
			let order = ansOrder[x].getAttribute('order');
			document
				.getElementById(iconId.concat('--open-icon'))
				.setAttribute('material', 'src: assets/question'.concat(order, '.png'));
		}
		state = false;
	}
}
