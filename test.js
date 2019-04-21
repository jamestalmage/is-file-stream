import fs from 'fs';
import {PassThrough} from 'stream';
import test from 'ava';
import tempfile from 'tempfile';
import isFileStream from '.';

async function open(...streams) {
	return Promise.all(streams.map(stream => {
		return new Promise(resolve => {
			stream.on('open', resolve);
		});
	}));
}

test('isFileStream', t => {
	t.true(isFileStream(fs.createReadStream(__filename)));
	t.true(isFileStream(fs.createWriteStream(tempfile())));
	t.false(isFileStream(new PassThrough()));
	t.false(isFileStream(null));
});

test('isFileStream.readable', t => {
	t.true(isFileStream.readable(fs.createReadStream(__filename)));
	t.false(isFileStream.readable(fs.createWriteStream(tempfile())));
	t.false(isFileStream.readable(new PassThrough()));
	t.false(isFileStream.readable(null));
});

test('isFileStream.writable', t => {
	t.false(isFileStream.writable(fs.createReadStream(__filename)));
	t.true(isFileStream.writable(fs.createWriteStream(tempfile())));
	t.false(isFileStream.writable(new PassThrough()));
	t.false(isFileStream.writable(null));
});

test('isFileStream.open', async t => {
	const readStream = fs.createReadStream(__filename);
	const writeStream = fs.createWriteStream(tempfile());
	const passThrough = new PassThrough();
	t.false(isFileStream.open(readStream));
	t.false(isFileStream.open(writeStream));
	t.false(isFileStream.open(passThrough));
	t.false(isFileStream.open(null));

	await open(readStream, writeStream);
	t.true(isFileStream.open(readStream));
	t.true(isFileStream.open(writeStream));
	t.false(isFileStream.open(passThrough));
	t.false(isFileStream.open(null));
});

test('isFileStream.open.readable', async t => {
	const readStream = fs.createReadStream(__filename);
	const writeStream = fs.createWriteStream(tempfile());
	const passThrough = new PassThrough();
	t.false(isFileStream.open.readable(readStream));
	t.false(isFileStream.open.readable(writeStream));
	t.false(isFileStream.open.readable(passThrough));
	t.false(isFileStream.open.readable(null));

	await open(readStream, writeStream);
	t.true(isFileStream.open.readable(readStream));
	t.false(isFileStream.open.readable(writeStream));
	t.false(isFileStream.open.readable(passThrough));
	t.false(isFileStream.open.readable(null));
});

test('isFileStream.open.writable', async t => {
	const readStream = fs.createReadStream(__filename);
	const writeStream = fs.createWriteStream(tempfile());
	const passThrough = new PassThrough();
	t.false(isFileStream.open.writable(readStream));
	t.false(isFileStream.open.writable(writeStream));
	t.false(isFileStream.open.writable(passThrough));
	t.false(isFileStream.open.writable(null));

	await open(readStream, writeStream);
	t.false(isFileStream.open.writable(readStream));
	t.true(isFileStream.open.writable(writeStream));
	t.false(isFileStream.open.writable(passThrough));
	t.false(isFileStream.open.writable(null));
});
