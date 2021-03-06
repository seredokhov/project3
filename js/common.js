// Слайдер
$(function() {
	if ($('div').is('.owl-carousel')) {
		var section = $('.section_1');
		var owl = section.find('.owl-carousel');
		var prev = section.find('.prev');
		var next = section.find('.next');

		owl.owlCarousel({
			loop:true,
			margin:10,
			nav:false,
			dots:false,
			items: 1,
			mouseDrag:false,
			touchDrag:true,
			autoHeight:true
		})

		prev.on('click', function(){
			owl.trigger('prev.owl.carousel');
		})

		next.on('click', function(){
			owl.trigger('next.owl.carousel');
		})
	}

});


// Прелоадер
$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});

// Мобильное меню

$(function() {

	var menu = $('.nav_block');
	var closeLink = menu.find('.close_menu');
	var openLink = $('a.mobile_menu_btn');
	var overlay = $('.overlay');

	openLink.on('click', function(){
		menu.addClass('open');
		overlay.fadeIn();
		return false
	})
	closeLink.add(overlay).on('click', function(){
		menu.removeClass('open');
		overlay.fadeOut();
	})

});

// Меню категории

$(function() {

	var menu = $('.aside_menu_ul');
	var link = $('.category_menu_btn');

	link.on('click', function(){
		menu.slideToggle();
		return false
	})

});


// Модальное окно

$(function() {

	var modal = $('.modal');
	var link = $('a.subscribe');
	var close = modal.find('.close_modal');
	var overlay = $('.overlay');

	link.on('click', function(){
		modal.fadeIn();
		overlay.fadeIn();
		return false
	})
	overlay.add(close).on('click', function(){
		modal.fadeOut();
		overlay.fadeOut();
	})

});



// Табы
$(function() {
	var links_block = $('.polygon_block').find('.polygon_item_group');
	var link = links_block.find('.icon')
	



	link.on('click', function(){
		$(this).parent().parent().find('.icon').removeClass('active');
		$(this).addClass('active');


		var tabs = $(this).closest('.row').find('.tab_block').find('.tab');
		var linkIndex = $(this).attr("data-target");


		tabs.removeClass('active');
		tabs.eq(linkIndex).addClass('active');
		
	})

});

// Инициализация яндекс карты
$(function() {
	if ($('div').is('#map')) {
		ymaps.ready(init);
		var myMap;
		var	myPlacemark;

		function init(){
			myMap = new ymaps.Map("map", {
				center: [55.815241, 37.352884],
				zoom: 17,
				controls: ['zoomControl', 'fullscreenControl']
			});
			myMap.behaviors.disable(['drag','scrollZoom', 'rightMouseButtonMagnifier']);
			myPlacemark = new ymaps.Placemark(
				[55.815241, 37.352884],
				{balloonContent: 'Ильинское шоссе, дом 1А' },
				{
					iconLayout: 'default#image',
					iconImageHref: 'img/main/mapMark.png',
					iconImageSize: [60, 75],
					iconImageOffset: [-40, -60]
				}
				);
			myMap.geoObjects.add(myPlacemark);
		}
	}
})



// Прокрутка страниц на главной


$(function() {

	if ($(window).width() > 1200) {
		var sections = $('.scroll').find('section'),
			elem = $('.scroll'),
			counter = 0,
			delay = 500,
			link = $('.scroll_controls').find('a');

		// Обработчики
		 elem.on("wheel", onWheel);
		 link.on('click', slide);


		// Функция Прокрутки
		function onWheel(e) {

			var delta;

			// Задержка прокрутки до окончания анимации
			elem.off("wheel", onWheel);
			setTimeout(function(){
				elem.on("wheel", onWheel);
				},
				delay
			);

			e = e.originalEvent || window.event;
			delta = e.deltaY || e.detail || e.wheelDelta;

			if (delta > 0 && counter < sections.length-1) {
				counter++;
				sections.eq(counter).animate({top:'0'},delay);
				controls();
				
			} else if ( delta < 0 && counter > 0 ) {
				counter--;
				sections.eq(counter+1).animate({top:'100%'},delay);
				controls();			
			}
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		 }



		 // Переключчение слайда по навигации
		function slide() {
			var thisSec;

			counter = +$(this).index();
			thisSec = sections.eq(counter);		
			controls();

			thisSec.prevAll().css({top:'0%'});
			thisSec.css({top:'0%'});
			thisSec.nextUntil('.scroll_controls').css({top:'100%'});
			return false;
		}


		// Навигация
		function controls() {	 	
			link.removeClass('active');
			link.eq(counter).addClass('active');
		}
	}
})