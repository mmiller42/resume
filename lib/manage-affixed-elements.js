import $ from 'jquery';

// Move "affixed" elements as the user scrolls
const $window = $(window);
const $document = $(document);
const $affixes = $('[data-affix]');

$window.on('resize load', updateAffixesPositions);
$document.scroll(updateAffixesPositions);
updateAffixesPositions();

function updateAffixesPositions () {
	if ($window.width() < 992) {
		$affixes.css('margin-top', '0');
		return;
	}

	$affixes.each(function () {
		const $affix = $(this).css('margin-top', '0');
		const topOffset = $document.scrollTop();
		const maxTopOffset = $document.height() - $affix.outerHeight();
		$affix.css('margin-top', Math.min(topOffset, maxTopOffset) + 'px');
	});
}
