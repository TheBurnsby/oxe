var Binder = require('../binder');
var Http = require('../http');
var Uuid = require('../uuid');

var url = new RegExp('^http|^\\/|^\\.\\/', 'i');
var html = new RegExp('<|>', 'i');

function getTemplate (path, callback) {
	Http.fetch({
		action: path,
		success: function (result) {
			return callback(result.response);
		},
		error: function (result) {
			throw new Error('getTemplateUrl: ' + result.status + ' ' + result.statusText);
		}
	});
}

function multiline (method) {
	var comment = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;

	if (typeof method !== 'function') throw new TypeError('Multiline function missing');

	var match = comment.exec(method.toString());

	if (!match) throw new TypeError('Multiline comment missing');

	return match[1];
}

function toDom (data) {
	if (typeof data === 'function') data = multiline(data);
	var container = document.createElement('container');
	container.innerHTML = data;
	return container.children[0];
}

module.exports = function (options) {
	if (!options) throw new Error('Component: missing options');
	if (!options.name) throw new Error('Component: missing name');

	var component = {};
	var isUrl = false;

	component.services = this.services;
	component.proto = Object.create(HTMLElement.prototype);

	component.name = options.name;
	component.model = options.model;
	component.modifiers = options.modifiers;
	component.extends = options.extends;
	component.template = options.template;
	component.controller = options.controller;

	if (component.template) {
		if (component.template.constructor.name === 'Function') {
			component.template = toDom(component.template);
		} else if (component.template.constructor.name === 'String') {
			if (url.test(component.template)) {
				isUrl = true;
			} else if (html.test(component.template)) {
				component.template = toDom(component.template);
			} else {
				component.template = document.currentScript ?
				document.currentScript.ownerDocument.querySelector(component.template) :
				document._currentScript.ownerDocument.querySelector(component.template);
			}
		} else {
			component.template = options.template;
		}
	}

	component.proto.attachedCallback = options.attached ? options.attached.bind(component) : null;
	component.proto.detachedCallback = options.detached ? options.detached.bind(component) : null;
	component.proto.attributeChangedCallback = options.attributed ? options.attributed.bind(component) : null;

	component.proto.createdCallback = function () {
		component.element = this;

		function create () {
			component.uuid = Uuid();
			component.element.appendChild(document.importNode(component.template.content, true));

			component.binder = Binder({
				name: component.uuid,
				model: component.model,
				scope: component.element,
				modifiers: component.modifiers
			}, component.controller);

			if (options.created) options.created.call(component);
		}

		if (isUrl) {
			getTemplate(component.template, function (data) {
				component.template = toDom(data);
				create();
			});
		} else {
			create();
		}
	};

	document.registerElement(component.name, {
		prototype: component.proto,
		extends: component.extends
	});

};
