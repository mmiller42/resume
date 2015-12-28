(function (window, document, $, undefined) {
	'use strict';

	var $window = $(window);
	var $document = $(document);
	var $grayBg = $('#gray-bg');
	var $grayBgOffset = $('#gray-bg-offset');

	$window.on('resize load', sizeGrayBg);
	sizeGrayBg();

	function sizeGrayBg () {
		$grayBg
			.height(0)
			.width($grayBgOffset.offset().left)
			.height($document.outerHeight());
	}

	var $affixes = $('[data-affix]');

	$window.on('resize load', updateAffixesPositions);
	$document.scroll(updateAffixesPositions);
	updateAffixesPositions();

	function updateAffixesPositions () {
		if ($window.width() < 992) {
			$affixes.css('margin-top', '0');
			return;
		}

		$affixes.each(function () {
			var $affix = $(this).css('margin-top', '0');
			var topOffset = $document.scrollTop();
			var maxTopOffset = $document.height() - $affix.outerHeight();
			$affix.css('margin-top', Math.min(topOffset, maxTopOffset) + 'px');
		});
	}

	var $soMastery = $('#so-mastery');

	$window.on('resize load', sizeSoMastery);
	sizeSoMastery();

	function sizeSoMastery () {
		$soMastery
			.css('border-right-width', '')
			.css('border-right-width', ($document.width() - $soMastery.offset().left) + 'px');
	}

	var $skillsContainer = $('#skills');
	var currentColumnCount;

	$window.on('resize load', recolumnizeSkills);
	recolumnizeSkills();

	function recolumnizeSkills () {
		var columnCount = $window.width() >= 992 ? 3 : 2;
		if (columnCount === currentColumnCount) return;

		currentColumnCount = columnCount;
		var $skills = $('#skills li').detach();
		$('#skills ul').remove();
		var columnLength = Math.ceil($skills.length / columnCount);

		for (var i = 0; i < columnCount; ++i) {
			var $ul = $('<ul></ul>').addClass('skills-column count-' + columnCount);
			for (var j = 0; j < columnLength; ++j) {
				var $skill = $skills.eq(i * columnLength + j);
				if ($skill && $skill.length) $ul.append($skill);
			}
			$ul.appendTo($skillsContainer);
		}
	}
})(window, document, jQuery.noConflict(true));
