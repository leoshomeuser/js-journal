// источник http://ruseller.com/lessons.php?rub=32&id=1050
$(document).ready(function(){
	// встроить управление (стрелки), блок перелистывания, тень
	$('#slideshow').append('<div id="leftControl"  class="control"></div><div id="rightControl" class="control"></div>');
	$('#slideshow').append('<div id="flipblock"></div>');
	$('#slideshow').append('<div class="journal-shadow"></div>');
	// переменные
	listTime   = 125; // скорость перелистывания
	pageHeight = parseInt( $("#journal-config").css("height") ); // высота одной страницы
	pageWidth  = parseInt( $("#journal-config").css("width") ); // ширина одной страницы
	slideWidth = (pageWidth*2)+4; // расчитываем ширину слайдера
	$("#slideshow #rightControl").css({"left" : slideWidth+15+"px"}); // отступ правого контрола
	var slides = $('.slide');
	numberOfSlides  = slides.length; // кол-во разворотов страниц
	currentPosition = 0; // начальная позиция
	$('#slidesContainer').css('overflow', 'hidden'); // убираем прокрутку
	slides
		.wrapAll('<div id="slideInner"></div>') // Вставляем все .slides в блок #slideInner
		.css({ 'float':'left', 'width':slideWidth, 'height':pageHeight+2, 'vertical-align': 'top' }); // выравнивание и размеры
	$('#slideInner').css('width', slideWidth * numberOfSlides);  // ширина #slideInner равна ширине всех слайдов
	$('.control').click(function(){ moveSlide( $(this).attr('id')); }); // клик-функция на .controls
	$('#slideInner').css({ 'marginLeft' : 0 }); // инициируем позицию
	setConfigJournal(); // расчет размеров
	setTimeout(load_img, 1000); // подгрузить скрытые страницы
});

function load_img() {
	$(".slide div").each(function(){
		if($(this).attr("data-img") !== undefined) {
			$(this).append('<img src="'+$(this).attr("data-img")+'" />');
		}
		setConfigJournal();
	});
}

function moveSlide(val) {
	var oldPosition = currentPosition;
	// определение новой позиции
	if(val=='leftControl') { // влево
		currentPosition--;
		if(currentPosition < 0)
			currentPosition = 0;
	}
	else { // вправо
		currentPosition++;
		if(currentPosition > (numberOfSlides-1))
			currentPosition = numberOfSlides-1;
	}
	// вставляем слайд для эфекта перелистывания
	if(oldPosition != currentPosition) {
		var htmltags = '';
		htmltags += '<div class="flipnew">'+$('.slide')[currentPosition].innerHTML+'</div>';
		htmltags += '<div class="flipold">'+$('.slide')[oldPosition].innerHTML+'</div>';
		$("#slideshow #flipblock").html(htmltags);
		$("#slideshow #flipblock .flipold").css({"z-index":"92"});
		$("#slideshow #flipblock .flipnew").css({"z-index":"91"});
		$('#slideInner').css({ 'marginLeft' : slideWidth*(-currentPosition) }); // сдвиг позиции
		// листание
		if(val=='leftControl') { // назад 
			$("#slideshow #flipblock .flipold img").css({"float":"right"});
			$("#slideshow #flipblock .flipnew img").css({"float":"left"});
			$('#slideshow #flipblock .flipnew img:last').css({width: "0px"});
			$('#slideshow #flipblock .flipold img:first').animate({width: "0px"}, listTime);
			setTimeout(page2_BackAnimation, listTime);
		}
		else { // вперед
			$("#slideshow #flipblock .flipold img").css({"float":"left"});
			$("#slideshow #flipblock .flipnew img").css({"float":"right"});
			$('#slideshow #flipblock .flipnew img:first').css({width: "0px"});
			$('#slideshow #flipblock .flipold img:last').animate({width: "0px"}, listTime);
			setTimeout(page2_ForwardAnimation, listTime);
		}
		setTimeout(hide_flipblock, listTime*2); // убрать отработанное
	}
}

function page2_ForwardAnimation() {
	$('#slideshow #flipblock .flipnew').css({"z-index": "93"});
	$('#slideshow #flipblock .flipnew img:first').animate({width: pageWidth+"px"}, listTime);
}
function page2_BackAnimation() {
	$('#slideshow #flipblock .flipnew').css({"z-index": "93"});
	$('#slideshow #flipblock .flipnew img:last').animate({width: pageWidth+"px"}, listTime);
}
function hide_flipblock() { $("#slideshow #flipblock").html(""); }
// авто-размеры
function setConfigJournal() {
	var h = pageHeight;
	var w = pageWidth;
	$("#slideshow, #slideshow #flipblock, #slideshow .journal-shadow")
		.css({"width": ((w*2)+4)+"px", "height": (h+2)+"px"});
	$("#slideshow .slide div, #slideshow .slide img")
		.css({"width": (w+2)+"px", "height": (h+2)+"px"});
	$("#slideshow  .journal-shadow")
		.css({"background-position": (w-90)+"px 0"}); // сдвиг 90px в картинке
	$("#slideshow").show();
}