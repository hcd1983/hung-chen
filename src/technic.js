import vegas from 'vegas';

$(function () {
	$(".vegas-banner").vegas({
	    timer: false,
	    delay: 5500,
	    transitionDuration: 1800,
		slides: [{
			src: "images/technic-banner.jpg"
		},{
			src: "images/technic-banner-2.jpg"
		},{
			src: "images/technic-banner-3.jpg"
		},{
			src: "images/technic-banner-4.jpg"
		},{
			src: "images/technic-banner-5.jpg"
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

	let _max = 0.8;
	let _min = 0.01;

	$(".technicList li").ryderWaypoint({
		hook: 0.7,
		repeat: true,
		enter(el) {
			$(".info-deco svg g", el).children().each((i, e) => {
				e.style.animation = 'info-deco 0.5s both';
				e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
			})

			$(".pic .video-container", el).css("opacity", 1);
			$(".pic .image-container", el).css("opacity", 0);
		},
		leave(el) {
			$(".info-deco svg g", el).children().each((i, e) => {
				e.style.animation = 'info-deco-reverse 0.5s both';
				e.style.animationDelay = Math.random() * (_max - _min) + _min + 's';
			})

			$(".pic .video-container", el).css("opacity", 0);
			$(".pic .image-container", el).css("opacity", 1);
		}
	})
})