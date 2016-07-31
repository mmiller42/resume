import $ from 'jquery';

// Dynamically calculate the size of the gray background element
const $document = $(document);
const $grayBg = $('#gray-bg');
const $grayBgOffset = $('#gray-bg-offset');

$(window).on('resize load', sizeGrayBg);
sizeGrayBg();

function sizeGrayBg () {
	$grayBg
		.height(0)
		.width($grayBgOffset.offset().left)
		.height($document.outerHeight());
}
