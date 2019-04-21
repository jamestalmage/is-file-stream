'use strict';
const isStream = require('is-stream');

function commonCheck(stream) {
	return (stream.fd !== undefined) &&
		(stream.flags !== undefined) &&
		(stream.mode !== undefined) &&
		((typeof stream.path === 'string') || Buffer.isBuffer(stream.path));
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

// Wrap previous assertion with an isOpen check
function wrap(fn) {
	return stream => fn(stream) && isOpen(stream);
}

module.exports = isFsStream;
module.exports.readable = isReadable;
module.exports.writable = isWritable;

module.exports.open = wrap(isFsStream);
module.exports.open.readable = wrap(isReadable);
module.exports.open.writable = wrap(isWritable);
