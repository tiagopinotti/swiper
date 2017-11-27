var mediaPlayer = new Audio();
var mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	effect: 'coverflow',
	centeredSlides: true,
	direction: 'horizontal',
	slidesPerView: 1,
	spaceBetween: 30,
	mousewheel: false,
	loop: false,
	coverFlowEffect: {
		rotate: 30,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: false,
	},

	pagination: {
		el: '.swiper-pagination',
		type: 'progressbar',
	},
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

var introTutorialSwiper = new Swiper('.swiper-container-intro', {
	// Optional parameters
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	direction: 'horizontal',
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: false,
	},
	pagination: {
		el: '.swiper-pagination-intro'
	},
});

function changeOpacity() {
	if (introTutorialSwiper.activeIndex == 0) {
		$('.keyboard').fadeIn();
		$('.swipe').fadeOut();
		$('.last').fadeOut();
	} else if (introTutorialSwiper.activeIndex == 1) {
		$('.keyboard').fadeOut();
		$('.swipe').fadeIn();
		$('.last').fadeOut();
	} else if (introTutorialSwiper.activeIndex == 2) {
		$('.keyboard').fadeOut();
		$('.swipe').fadeOut();
		$('.last').fadeIn();
	}
}

function setupIntro() {
	$('.keyboard').animate({
		x: '-=25px'
	});
	$('.keyboard').animate({
		x: '+=25px'
	});
	$('.keyboard').animate({
		x: '-=25px'
	});
	$('.keyboard').animate({
		x: '+=25px'
	});
	$('.keyboard').fadeIn();
	$('.swipe').fadeOut();
	$('.last').fadeOut();
}

introTutorialSwiper.on('slideChange', changeOpacity);
$(window).on('load', setupIntro);

var swipeAnimationContainer = document.getElementById('swipe-animation-container');

window.addEventListener('load', loadSwipeAnimation);

var swipeTutorial = bodymovin.loadAnimation({
	container: swipeAnimationContainer,
	renderer: 'svg',
	loop: true,
	autoplay: false,
	animationData: swipeAnimation,
	renderedSettings: {
		scaleMode: 'noScale'
	}
});

function loadSwipeAnimation() {
	swipeTutorial.play();
}

function displayIcon(toTimes) {
	for (i = 0; i < toTimes; i++) {
		setTimeout(function () {
			$('.expand-icon').fadeIn();
		}, 1000);
		setTimeout(function () {
			$('.expand-icon').fadeOut();
		}, 1000);
	}
}

displayIcon(10);

mySwiper.keyboard.enable();

function play(index) {
	$('.play-button-round').addClass('pause-round-button');
	mediaPlayer.src = playlist[index];
	mediaPlayer.play();
	if (mediaPlayer.ended) {
		$('.play-button-round').removeClass('pause-round-button');
	}
}

function stopFeedback() {
	mediaPlayer.pause;
	mediaPlayer.currentTime = 0;
	mediaPlayer.src = '';
}

$('.stop-button-round').on('click', stop);

function stop() {
	mediaPlayer.pause();
	mediaPlayer.currentTime = 0;
	$('.play-button-round').removeClass('pause-round-button');
}

mySwiper.on('slideChange', function () {
	play(mySwiper.activeIndex);
});

$('.play-button-round').on('click', function () {
	play(mySwiper.activeIndex);
});

$('.master-timer-controller').on('click', showPlayerControls);

function animateButtonToLeft(element, nextPosition) {
	$(element).animate({
		left: nextPosition
	});
}

function animateButtonToRight(element, nextPosition) {
	$(element).animate({
		right: nextPosition
	});
}

function animateButtonToBottom(element, nextPosition) {
	$(element).animate({
		bottom: nextPosition
	});
}

function animateButtonToUp(element, nextPosition) {
	$(element).animate({
		top: nextPosition
	});
}

function animateButtonDiagonalRight(element, nextRightPosition, nextTopPosition) {
	$(element).animate({
		top: nextTopPosition,
		right: nextRightPosition
	});
}

$(mediaPlayer).on('ended', function () {
	$('.play-button-round').removeClass('pause-round-button');
});

$('.options').on('click', showOptions);

var optionsShow = false;

function showOptions() {
	if (optionsShow == false) {
		$('.options').addClass('close-options');
		$('.util-panel').animate({
			bottom: '0px'
		}, 250);
		optionsShow = true;
	} else if (optionsShow == true) {
		$('.options').removeClass('close-options');
		$('.util-panel').animate({
			bottom: '-75px'
		}, 250);
		optionsShow = false;
	}
}

var mouseInteractions = false;

function showPlayerControls() {
	if (mouseInteractions == false) {
		$('.master-timer-controller').addClass('close-options');
		$('.master-timer-controller').animate({
			width: '125px',
			height: '125px'
		});
		animateButtonToUp('.play-button-round', '-25px'); //-=75px value
		animateButtonToRight('.stop-button-round', '-25px');
		animateButtonToLeft('.options', '-25px');
		mouseInteractions = true;
	} else if (mouseInteractions == true) {
		$('.master-timer-controller').removeClass('close-options');
		$('.master-timer-controller').animate({
			width: '100px',
			height: '100px'
		});
		animateButtonToUp('.play-button-round', '89px');
		animateButtonToRight('.stop-button-round', '89px');
		animateButtonToLeft('.options', '89px');
		mouseInteractions = false;
	}
}

$('.increase-font-size').on('click', function () {
	increaseFontSize('.whole-page');
});

$('.decrease-font-size').on('click', function () {
	decreaseFontSize('.whole-page');
});

const MAX_FONT_SIZE = 22;
const MAX_LINE_HEIGHT = 32;

const MIN_FONT_SIZE = 14;
const MIN_LINE_HEIGHT = 20;

function increaseFontSize(fontElement) {
	if (parseFloat($(fontElement).css('font-size')) <= MAX_FONT_SIZE) {
		$(fontElement).css('font-size', '+=1px');
		$(fontElement).css('line-height', '+=1px');
	}
}

function decreaseFontSize(fontElement) {
	if (parseFloat($(fontElement).css('font-size')) >= MIN_FONT_SIZE) {
		$(fontElement).css('font-size', '-=1px');
		$(fontElement).css('line-height', '-=1px');
	}
}

$('.quiz-option').on('click', function () {
	showModal('.modal', 'This is a Message for show to an user.', 'Modal Title');
});
$('.close-round-button.modal-close').on('click', closeModal);

function closeModal() {
	$('.modal').hide();
}

function showModal(elementModal, message, title) {
	$('.message-field').find('p').text(message);
	$('.modal-title').text(title);
	$(elementModal).show();
}