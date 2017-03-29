'use strict';
const isStream = require('is-stream');
const isBuffer = require('is-buffer');

function commonCheck(stream) {
	return (stream.fd !== undefined) &&
		(stream.flags !== undefined) &&
		(stream.mode !== undefined) &&
		((typeof stream.path === 'string') || isBuffer(stream.path));
}

function isReadable(stream) {
	return isStream.readable(stream) && commonCheck(stream);
}

function isWritable(stream) {
	return isStream.writable(stream) && commonCheck(stream);
}

function isFsStream(stream) {
	return isStream(stream) && commonCheck(stream);
}

function isOpen(stream) {
	return stream && (typeof stream.fd === 'number');
}

// wrap previous assertion with an isOpen check
function wrap(fn) {
	return function (stream) {
		return fn(stream) && isOpen(stream);
	};
}

module.exports = isFsStream;
module.exports.isOpen = isOpen;
module.exports.readable = isReadable;
module.exports.writable = isWritable;

module.exports.open = wrap(isFsStream);
module.exports.open.readable = wrap(isReadable);
module.exports.open.writable = wrap(isWritable);
