import $ from 'jquery';

// Calculate the width of my proficiency at asking questions
const $document = $(document);
const $soMastery = $('#so-mastery');

$(window).on('resize load', sizeSoMastery);
sizeSoMastery();

function sizeSoMastery () {
	$soMastery
		.css('border-right-width', '')
		.css('border-right-width', ($document.width() - $soMastery.offset().left) + 'px');
}
