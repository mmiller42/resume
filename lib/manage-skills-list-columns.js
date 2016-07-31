import $ from 'jquery';

// Reformat the skills list into 2 or 3 columns
const $window = $(window);
const $skillsContainer = $('#skills');
let currentColumnCount;

$window.on('resize load', recolumnizeSkills);
recolumnizeSkills();

function recolumnizeSkills () {
	const columnCount = $window.width() >= 992 ? 3 : 2;
	if (columnCount === currentColumnCount) return;

	currentColumnCount = columnCount;
	const $skills = $('#skills li').detach();
	$('#skills ul').remove();
	const columnLength = Math.ceil($skills.length / columnCount);

	for (let i = 0; i < columnCount; ++i) {
		let $ul = $('<ul></ul>').addClass('skills-column count-' + columnCount);
		for (let j = 0; j < columnLength; ++j) {
			let $skill = $skills.eq(i * columnLength + j);
			if ($skill && $skill.length) $ul.append($skill);
		}
		$ul.appendTo($skillsContainer);
	}
}
