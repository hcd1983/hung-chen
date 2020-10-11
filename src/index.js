import CountUp from 'countup.js';
import SVG from 'svg.js';

$(function () {
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	$(".imagine-desk").ryderWaypoint({
		hook: 0.5,
		enter(el) {
			el.addClass("is-show")

			setTimeout(function () {
				sock_pixel();
			}, 1500)
		}
	})

	// pixel sock
	var scale = {
		value: 25
	};

	var canvas = document.getElementById("canvas-sock");
	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	var cw = canvas.width;
	var ch = canvas.height;

	var img = new Image();
	img.src = "images/sockforcanvas.jpg";

	function sock_pixel() {
		TweenMax.to(scale, 2, {
			value: 1,
			ease: Linear.easeNone,
			onUpdate: sock_update,
		});
	}

	function sock_update() {
		var sw = (cw / scale.value);
		var sh = (ch / scale.value);
		ctx.drawImage(img, 0, 0, sw, sh);
		ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, cw, ch);
	}

	// thousands yarn
	SVG.get('thousands-yarn-1').select('.is-moving').animate(2000, '-').x(10).y(30).loop(true);
	SVG.get('thousands-yarn-2').select('.is-moving').animate(3000, '-').x(20).y(50).loop(true);
	SVG.get('thousands-yarn-3').select('.is-moving').animate(4000, '-').x(40).y(80).loop(true);
	SVG.get('thousands-yarn-4').select('.is-moving').animate(3000, '-').x(20).y(50).loop(true);
	SVG.get('thousands-yarn-5').select('.is-moving').animate(2000, '-').x(10).y(30).loop(true);

	// knitting svg
	var $knitting_line = SVG.get('line-group').children();
	var $knitting = {
		id: [
			'blue-yarn',
			'orange-yarn',
			'purple-yarn',
			'green-yarn',
			'yellow-yarn',
			'red-yarn',
		],
		plot: [
			'M286.4,162.4c0,0,79.7,106.9,83.4,114.7c4.2,8.9,8.1,22.6,8.1,41.1v298.8',
			'M490.9,164c0,0-68.4,70-88.7,116.1c-4.6,10.8-9.3,27.5-9.3,51.5c0,34.1,0,285.1,0,285.1',
			'M648.9,308.7c0,0-215.8-5.3-230.1,5.2c-10.8,7.9-14.3,15.8-14.9,25.2v284.8',
			'M521.9,465.6L405.7,345.5c0,0-8.8-5.4-8.8,6.2v267.2',
			'M253.4,465.6L362,350.1c0,0,7.9-6.4,7.9,2.6v266.1',
			'M137.9,307.3l213.2,11.8c9.7,2.2,13.3,8,13.3,17.8c0,16-0.1,286.2-0.1,286.2',
		]
	}

	for(let [i, el] of $knitting_line.entries()) {
		SVG.get($knitting.id[i]).select('.is-moving').animate(2000, '-', i * 100).x(45).y(40).loop(true);
		el.animate(2000, '-', i * 100).plot($knitting.plot[i]).loop(true, true);
	}

	// sock 射了
	// 手機版直接show出來
	if (device == 'mobile') {
		TweenMax.to( $(".high-efficiency"), 1, {
			delay: 1,
			opacity: 1,
			x: 0,
			y: 0,
			onComplete() {}
		});

		TweenMax.to( $(".adv-time"), 1, {
			delay: 1,
			opacity: 1,
			x: 0,
			y: 0,
			onComplete() {}
		});
	}

	$(".sockexit-one").ryderWaypoint({
		hook: 0.6,
		enter(el) {
			TweenMax.to( $(".sockexit-two"), 0.8, {
				scale: 0.8,
				opacity: 1,
				ease: Elastic.easeOut.config(1, 0.3),
				onComplete() {}
			});

			TweenMax.to( $(".sockexit-three"), 1, {
				opacity: 1,
				delay: 0.5,
				onComplete() {}
			});

			TweenMax.to( $(".sockexit-four"), 1, {
				opacity: 1,
				y: 0,
				delay: 0.5,
				onComplete() {}
			});

			TweenMax.to( $(".high-efficiency"), 1, {
				delay: 1,
				opacity: 1,
				x: 0,
				y: 0,
				onComplete() {}
			});

			TweenMax.to( $(".adv-time"), 1, {
				delay: 1,
				opacity: 1,
				x: 0,
				y: 0,
				onComplete() {}
			});
		}
	})

	// sewing svg
	var $sewing_line = SVG.get('sewing-line-group').children();
	var $sewing = {
		id: [
			'sewing-red-yarn',
			'sewing-blue-yarn',
			'sewing-orange-yarn',
			'sewing-purple-yarn',
		],
		plot: [
			['515.7, 1.3, 461.3, 360.3', '519.5, 0.5, 507.5, 125.8'],
			['514.3, 360.3, 554.4, 1.3', '558.4, 0.5, 545.5, 112.1'],
			['641, 360.3, 663.6, 3', '668.8, 1.3, 689.2, 107.9'],
			['708.4, 3, 689.1, 360.3', '711.7, 0.5, 725.5, 120.4'],
		]
	}

	for(let [i, el] of $sewing_line.entries()) {
		SVG.get($sewing.id[i]).select('.is-moving').animate(2000, '-', i * 300).x(45).y(40).loop(true);
		el.get(0).animate(1000, '-', i * 300).plot($sewing.plot[i][0]).loop(true, true);
		el.get(1).animate(2000, '-', i * 300).plot($sewing.plot[i][1]).loop(true);
	}

	let _sewing_previousDelta = 0;
	let _sewing_sec = 2000;

	function _sewing_sock(currentDelta) {

		window._index_sewing_raf = requestAnimationFrame(_sewing_sock);

		var delta = currentDelta - _sewing_previousDelta;

		if (delta < _sewing_sec) {
		    return;
		}

		let img = new Image();
		img.src = "images/sewing-svg-sock.png";
		$(".sewing-sock").append(img)

		TweenMax.to(img, 2, {
			x: 378,
			onComplete() {
				TweenMax.to(this.target, 0.5, {
					y: 21,
					onComplete() {
						TweenMax.to(this.target, 5, {
							x: 925,
							onComplete() {
								$(this.target).remove()
							}
						});
					}
				});
			}
		});

		_sewing_previousDelta = currentDelta;
	}

	_sewing_sock();

	// boarding svg
	function _boarding_sock(currentDelta) {
		TweenMax.to($(".boarding-wearing-sock img"), 1, {
			x: 634,
			onComplete() {
				$(".boarding-wearing-sock img").eq(0).fadeOut(500)
				$(".boarding-wearing-sock img").eq(1).fadeIn(500, () => {
					$(".boarding-wearing-sock img").eq(1).fadeOut(500)
					$(".boarding-wearing-sock img").eq(2).fadeIn(500, () => {
						TweenMax.to($(".boarding-wearing-sock img"), 3, {
							x: 1010,
							onComplete() {
								TweenMax.set($(".boarding-wearing-sock img"), {
									x: 0,
								});
								$(".boarding-wearing-sock img").eq(0).show()
								$(".boarding-wearing-sock img").eq(1).hide()
								$(".boarding-wearing-sock img").eq(2).hide()

								_boarding_sock();
								_boarding_add();
							}
						});
					})
				})
			}
		});
	}

	_boarding_sock();

	function _boarding_add() {
		TweenMax.to($("#boarding-text"), 0.2, {
			y: 565,
			opacity: 0,
			onComplete() {
				let _t = parseInt($("#boarding-text").text()) + 3;

				if (_t > 9) {
					_t = 3;
				}

				$("#boarding-text").text( _t );

				TweenMax.fromTo($("#boarding-text"), 0.5, {
					y: 575,
					opacity: 0,
				}, {
					y: 571,
					opacity: 1,
					onComplete() {}
				});
			}
		});
	}

	// packaging sock
	$("#packaging-pixi").ryderWaypoint({
		enter(el) {
			$("#hand").addClass("is-show").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", () => {
				$("#arrow-one").addClass("is-show")
			})
		}
	})

	$("#arrow-one").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", () => {
		$("#sock-two").addClass("is-show")
	})

	$("#sock-two").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", () => {
		$("#sock-two-top").addClass("is-show")
	})

	$("#sock-two-top").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", () => {
		$("#arrow-two").addClass("is-show")
	})

	$("#arrow-two").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", () => {
		$("#sock-three").addClass("is-show")
	})

	$("#sock-three").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", () => {
		$("#sock-three").fadeOut(500)
		$("#sock-finish").addClass("is-show")
	})

	let _sock_finish = 1;

	$("#sock-finish").on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", (e) => {

		$.scrollTo( $(".sockList"), {
			duration: 2000,
			interrupt: true,
		});

		let _x = $(".sockList .item:nth-child(4) img").offset().left - $("#sock-finish").offset().left;
		let _y = $(".hungchensock").outerHeight(true) + $(".sockList .item").height() + $(window).height() * 0.05;
		let _s = $(".sockList .item:nth-child(4) img").width() / $("#sock-finish img").width();

		TweenMax.to(e.target, 3, {
			x: (device == 'desktop') ? _x : (_x + 90),
			y: (device == 'desktop') ? _y : (_y / 0.35 + 35),
			scale: (device == 'desktop') ? _s : 0.7,
			transformOrigin: 'bottom left',
			onComplete: function() {
				if (_sock_finish) {
					let e = $("#sock-finish").get(0);
					e.style.animation = 'info-deco 0.5s both';

					_round_one();

					setTimeout(function () {
						_round_two();
					}, 2000)

					setTimeout(function () {
						$(".pair-fancy").fadeIn(500, () => {
							_fancy()
						})
					}, 5000)
				}

				_sock_finish = 0;
			}
		});
	})

	// setTimeout(function () {
	// 	_round_two();
	// }, 2000)

	// $(".sockList").ryderWaypoint({
	// 	hook: 0.2,
	// 	enter(el) {
	// 		_round_one();

	// 		setTimeout(function () {
	// 			_round_two();
	// 		}, 2000)

	// 		setTimeout(function () {
	// 			$(".pair-fancy").fadeIn(500, () => {
	// 				_fancy()
	// 			})
	// 		}, 5000)
	// 	}
	// })

	// fancy sock array
	let _shadow = [
		'<div class="item"><img src="images/hungchensock-1.png"></div>',
		'<div class="item"><img src="images/hungchensock-2.png"></div>',
		'<div class="item"><img src="images/hungchensock-3.png"></div>',
		// '<div class="item"><img src="images/hungchensock-4.png"></div>',
		'<div class="item"><img src="images/hungchensock-5.png"></div>',
		'<div class="item"><img src="images/hungchensock-6.png"></div>',
		'<div class="item"><img src="images/hungchensock-7.png"></div>',
		'<div class="item"><img src="images/hungchensock-8.png"></div>',
		'<div class="item"><img src="images/hungchensock-9.png"></div>',
		'<div class="item"><img src="images/hungchensock-10.png"></div>',
		'<div class="item"><img src="images/hungchensock-11.png"></div>',
		'<div class="item"><img src="images/hungchensock-12.png"></div>',
	];

	let _max = 1;
	let _min = 0.01;
	let _shadow_len = _shadow.length;

	// round 1
	function _round_one() {
		$(".sockList .item").each((i, e) => {
			if (i != 3) {
				e.style.animation = 'info-deco 0.5s both';
				e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
			}
		})

		setTimeout(function () {
			let _first = (device == 'desktop') ? 20 : 36;
			let _html = '';

			_shadow.sort((a, b) => Math.random() > 0.5 ? -1 : 1);

			while(_first--) {
				_html += _shadow[_first % _shadow_len];
			}

			$(".sockList").append( _html ).addClass("is-round-1")

			$(window).stop(true).scrollTo( document.body.scrollHeight, {
				duration: 10,
			});

			$(".sockList .item").each((i, e) => {
				e.style.animation = 'info-deco-reverse 0.5s both';
				e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
			})
		}, _max * 1000)
	}

	// round 2
	function _round_two() {
		$(".sockList .item").each((i, e) => {
			e.style.animation = 'info-deco 0.5s both';
			e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
		})

		setTimeout(function () {
			let _second = (device == 'desktop') ? 28 : 60;
			let _html = '';

			_shadow.sort((a, b) => Math.random() > 0.5 ? -1 : 1);

			while(_second--) {
				_html += _shadow[_second % _shadow_len];
			}

			$(".sockList").append( _html ).addClass("is-round-2")

			$(window).stop(true).scrollTo( document.body.scrollHeight, {
				duration: 10,
			});

			$(".sockList .item").each((i, e) => {
				e.style.animation = 'info-deco-reverse 0.5s both';
				e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
			})
		}, _max * 1000)
	}

	// fancy sock
	let _pair = new CountUp("pairCountUp", 0, 12496521, 0, 3, {
		useEasing: true,
		easingFn: function(t, b, c, d) {
			t /= d/2;
			if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			t -= 2;
			return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
		},
	});

	function _fancy() {
		_pair.start(() => {
			setTimeout(function () {
				$(".pair-container").fadeOut(500);

				$("#yarn-progress").fadeIn(500)

				let _progress = $(".pairList").offset().left + $(".pairList").width() + 60;

				TweenMax.to( $(".progress-line"), 3, {
					width: _progress,
					onComplete() {
						TweenMax.to( $(".pairListWrap"), 0.5, {
							opacity: 1,
							onComplete() {}
						});
					}
				});
			}, 500)
		});
	}

	// degree
	let temp_1 = new CountUp("temp-count-one", 0, 120, 0, 2, {});

	let temp_2 = new CountUp("temp-count-two", 0, 130, 0, 3, {});

	$(".degree").ryderWaypoint({
		enter(el) {
			el.addClass("is-show");
			temp_1.start();
			temp_2.start();
		}
	})

	// mobile fancy
	$(".mobile-fancy-trigger").on("click", function () {
		$("[data-fancy='"+ $(this).data("fancy") +"']").fadeIn(500)
	})

	$(".fancy-close, .fancy-close-block").on("click", function () {
		$(".fancyWrap").fadeOut(500)
	})
})
