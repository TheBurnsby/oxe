
export default function (opt) {

	opt.variable = opt.names[1];
	opt.pattern = new RegExp('\\$(' + opt.variable + '|index)', 'ig');

	opt.clone = opt.element.removeChild(opt.element.firstElementChild);

	opt.clone = opt.clone.outerHTML.replace(
		new RegExp('((?:data-)?o-.*?=")' + opt.variable + '((?:\\.\\w+)*\\s*(?:\\|.*?)?")', 'g'),
		'$1' + opt.path + '.$' + opt.variable + '$2'
	);

}
