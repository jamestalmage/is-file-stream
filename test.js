import fs from 'fs';
import {PassThrough} from 'stream';
import test from 'ava';
import tempfile from 'tempfile';
import fn from '.';

function open(...streams) {
	return Promise.all(streams.map(stream => {
		return new Promise(resolve => {
			stream.on('open', resolve);
		});
	}));
}

test('fn', t => {
	t.true(fn(fs.createReadStream(__filename)));
	t.true(fn(fs.createWriteStream(tempfile())));
	t.false(fn(new PassThrough()));
	t.false(fn(null));
});

test('fn.readable', t => {
	t.true(fn.readable(fs.createReadStream(__filename)));
	t.false(fn.readable(fs.createWriteStream(tempfile())));
	t.false(fn.readable(new PassThrough()));
	t.false(fn.readable(null));
});

test('fn.writable', t => {
	t.false(fn.writable(fs.createReadStream(__filename)));
	t.true(fn.writable(fs.createWriteStream(tempfile())));
	t.false(fn.writable(new PassThrough()));
	t.false(fn.writable(null));
});

test('fn.open', async t => {
	const readStream = fs.createReadStream(__filename);
	const writeStream = fs.createWriteStream(tempfile());
	const passThrough = new PassThrough();
	t.false(fn.open(readStream));
	t.false(fn.open(writeStream));
	t.false(fn.open(passThrough));
	t.false(fn.open(null));

	await open(readStream, writeStream);
	t.true(fn.open(readStream));
	t.true(fn.open(writeStream));
	t.false(fn.open(passThrough));
	t.false(fn.open(null));
});

test('fn.open.readable', async t => {
	const readStream = fs.createReadStream(__filename);
	const writeStream = fs.createWriteStream(tempfile());
	const passThrough = new PassThrough();
	t.false(fn.open.readable(readStream));
	t.false(fn.open.readable(writeStream));
	t.false(fn.open.readable(passThrough));
	t.false(fn.open.readable(null));

	await open(readStream, writeStream);
	t.true(fn.open.readable(readStream));
	t.false(fn.open.readable(writeStream));
	t.false(fn.open.readable(passThrough));
	t.false(fn.open.readable(null));
});

test('fn.open.writable', async t => {
	const readStream = fs.createReadStream(__filename);
	const writeStream = fs.createWriteStream(tempfile());
	const passThrough = new PassThrough();
	t.false(fn.open.writable(readStream));
	t.false(fn.open.writable(writeStream));
	t.false(fn.open.writable(passThrough));
	t.false(fn.open.writable(null));

	await open(readStream, writeStream);
	t.false(fn.open.writable(readStream));
	t.true(fn.open.writable(writeStream));
	t.false(fn.open.writable(passThrough));
	t.false(fn.open.writable(null));
});
