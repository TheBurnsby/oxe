const Package = require('./package');
const Muleify = require('muleify');
const Util = require('util');
const Fs = require('fs');

const ReadFile = Util.promisify(Fs.readFile);
const WriteFile = Util.promisify(Fs.writeFile);

const version = Package.version;

const header = `/*
	Name: Oxe
	Version: ${version}
	License: MPL-2.0
	Author: Alexander Elias
	Email: alex.steven.elias@gmail.com
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
`;

async function prepend (data, path) {
	const fileData = await ReadFile(path, 'utf8');
	await WriteFile(path, data + fileData, 'utf8');
}

(async function () {
	try {
		let options;

		options = { bundle: true };
		await Muleify.pack('src/index.js', 'dist/oxe.js', options);
		await prepend(header, 'dist/oxe.js');

		options = { bundle: true, minify: true };
		await Muleify.pack('src/index.js', 'dist/oxe.min.js', options);
		await prepend(header, 'dist/oxe.min.js');

		options = { bundle: true, minify: true };
		await Muleify.pack('src/index.js', 'dist/oxe.polly.min.js', options);
		await prepend(header, 'dist/oxe.polly.min.js');

		const opm = await ReadFile('dist/webcomponents-lite.min.js', 'utf8');
		await prepend(opm, 'dist/oxe.polly.min.js');

	} catch (error) {
		console.error(error);
	}
}());
