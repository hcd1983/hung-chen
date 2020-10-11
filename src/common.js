$.fn.ryderWaypoint = function(option) {
	return this.each(function() {
		var $this = $(this);

		var deFault = {
			hook: 0.8,
			check: 1,
			repeat: false,
			enter() {},
			leave() {}
		};

		var setting = $.extend(deFault, option);

		function ryderScrolling() {
			var scrollTop = $(window).scrollTop(),
				elementOffset = $this.offset().top,
				distance = (elementOffset - scrollTop),
				windowHeight = $(window).height(),
				breakPoint = windowHeight * setting.hook,
				leavePoint = $this.height() - windowHeight * (1 - setting.hook);

			if (distance > breakPoint || distance < -leavePoint) {
				if (setting.repeat) {
					setting.check = 1;
					setting.leave($this);
				}
			} else if (distance < breakPoint && setting.check) {
				setting.check = 0;
				setting.enter($this);
			}
		}

		$(window).on("scroll", ryderScrolling).trigger("scroll");
	});
};

import Barba from 'barba.js';

$(function () {
	$(window).on("resize", function (){
		if ($(this).width() > 1024) {
			window.device = 'desktop';
		}else{
			window.device = 'mobile';
		}
	}).trigger("resize")

	$(window).on("scroll", function () {
		let _scrollTop = $(this).scrollTop();

		if ( _scrollTop > 300){
			$(".topmenuWrap").addClass("is-small");
		} else {
			$(".topmenuWrap").removeClass("is-small");
		}
	})

	// mobile
	$(".hamburger").on("click", function () {
		$(this).toggleClass("is-show")
		$(".mobile-topmenuList").slideToggle(500)
	})

	var Products = Barba.BaseView.extend({
		namespace: 'products',
		onEnter: function() {},
		onEnterCompleted: function() {
			$.getScript('dist/products.js');
		},
		onLeave: function() {},
		onLeaveCompleted: function() {}
	}).init();

	var Technic = Barba.BaseView.extend({
		namespace: 'technic',
		onEnter() {},
		onEnterCompleted() {
			$.getScript('dist/technic.js');
		},
		onLeave() {},
		onLeaveCompleted() {}
	}).init();

	var Home = Barba.BaseView.extend({
		namespace: 'index',
		onEnter() {},
		onEnterCompleted() {
			$.getScript('dist/index.js');
		},
		onLeave() {
			cancelAnimationFrame(_index_sewing_raf)
		},
		onLeaveCompleted() {}
	}).init();

	Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
		$('.lazy').lazy({
			chainable: false,
			effect: "fadeIn",
			effectTime: 1000,
			// defaultImage: 'images/lazy-default.svg',
		});

		$("li[data-now]").each((i, el) => {
			if (el.dataset.now == currentStatus.namespace) {
				el.classList.add("current")
			} else {
				el.classList.remove("current")
			}
		})

		$(".hamburger").removeClass("is-show")
		$(".mobile-topmenuList").slideUp(500)
	});

	Barba.Pjax.init();

	// WIP 小雞雞
	var _transform = new TimelineMax({
		paused: true,
	}).add([
		TweenMax.to( $("#transformWrap .box.one"), 0.5, {
			left: 0,
			ease: Power2.easeOut,
		}),
		TweenMax.to( $("#transformWrap .box.two"), 0.5, {
			left: 0,
			ease: Power2.easeOut,
		}),
	])

	const BigFatLp = Barba.BaseTransition.extend({
		async start() {
			await this.newContainerLoading;
			await this.fadeOut();
			this.fadeIn();
		},
		fadeOut() {
			let deferred = Barba.Utils.deferred();

			_transform.addCallback(function () {
				TweenMax.to( $("#transformWrap .logo"), 0.5, {
					opacity: 1,
					onComplete() {
						deferred.resolve();
					}
				});
			}, "end")

			$("#transformWrap").css({
				transform: 'rotateY(0)'
			})

			TweenMax.set( $("#transformWrap .logo svg .gear"), {
				rotation: 0
			});

			_transform.play();

			return deferred.promise;
		},
		fadeIn() {
			TweenMax.to( $("#transformWrap .logo svg .gear"), 0.8, {
				rotation: 90,
				transformOrigin: "center center",
				onComplete() {
					TweenMax.to( $("#transformWrap .logo"), 0.5, {
						opacity: 0,
						onComplete() {
							$("#transformWrap").css({
								transform: 'rotateY(180deg)'
							})
							_transform.reverse();
						}
					});
				}
			});

			window.scroll(0, 0);
			this.done();
		}
	})

	Barba.Pjax.getTransition = () => BigFatLp;
});