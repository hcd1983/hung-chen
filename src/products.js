import vegas from 'vegas';

$(function() {
	$(".vegas-banner").vegas({
	    timer: false,
	    delay: 5500,
	    transitionDuration: 1800,
		slides: [{
			src: "images/products-banner.jpg"
		},{
			src: "images/products-vegas-2.jpg"
		}],
		init: function (globalSettings) {
			let slides = $(".contact-banner").vegas('options', 'slides').length;
			while(slides--){
				$("<a href='#0'>").appendTo($(".banner-dots"));
			}
		},
		walk: function (index, slideSettings) {
			vegaspager();
		}
	});

	$(".banner-dots").on("click", "a", function () {
		var index = $(this).index();
		$(".contact-banner").vegas('jump', index);
		vegaspager();
	})

	function vegaspager () {
	    var t = $(".contact-banner").vegas('current');
	    $(".banner-dots a").eq(t).addClass("active").siblings().removeClass("active");
	}

	$("#sport-socks, #kids-socks, #gentle-socks").ryderWaypoint({
		enter(e) {
			e.addClass("is-show")
		}
	})

	let _max = 2;
	let _min = 1.5;

	$(".productsList .note").each((i, e) => {
		$(e).html($(e).text().replace(/(\S)/g, '<span>$1</span>'));
	})

	$(".productsList").each((i, el) => {

		let _h = 0;
		let _p = (device == 'desktop') ? 204 : 180;

		$("li", el).each((i, el) => {

			_h = ($(".container", el).outerHeight(true) > _h) ? $(".container", el).outerHeight(true) : _h;
		}).data("p", _p);

		$(".container", el).css({
			height: _h + _p
		}).data("h", _h);
	})

	$(".productsList").ryderWaypoint({
		enter(e) {
			$("li", e).each((i, e) => {
				setTimeout(function () {

					$(".pic", e).css({
						height: $(e).data("p"),
						'background-size': '100%'
					});

					$(".container", e).css({
						height: $(".container", e).data("h")
					});

					$(".note span", e).each((i, e) => {
						e.style.animation = 'info-deco-reverse 0.5s both';
						e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
					})
				}, i * 333)
			})
		}
	})
})