/// <reference types="node"/>
import {ReadStream as FsReadStream, WriteStream as FsWriteStream} from 'fs';

declare namespace isFileStream {
	type ReadStream = FsReadStream;
	type WriteStream = FsWriteStream;

	interface OpenReadStream extends ReadStream {
		fd: number;
	}

	interface OpenWriteStream extends WriteStream {
		fd: number;
	}
}

declare const isFileStream: {
	/**
	@returns Whether`input` is a file system stream.

	@example
	```
	import * as fs from 'fs';
	import isFileStream = require('is-file-stream');

	const readableFileStream = fs.createReadStream(somePath);
	const writableFileStream = fs.createWriteStream(someOtherPath);

	isFileStream(readableFileStream);
	// true

	isFileStream(writableFileStream);
	// true
	```
	*/
	(input: unknown): input is isFileStream.ReadStream | isFileStream.WriteStream;

	/**
	@returns Whether`input` is a readable file system stream.

	@example
	```
	import * as fs from 'fs';
	import isFileStream = require('is-file-stream');

	const readableFileStream = fs.createReadStream(somePath);

	isFileStream.readable(readableFileStream);
	// true
	```
	*/
	readable(input: unknown): input is isFileStream.ReadStream;

	/**
	@returns Whether`input` is a writable file system stream.

	@example
	```
	import * as fs from 'fs';
	import isFileStream = require('is-file-stream');

	const writableFileStream = fs.createWriteStream(somePath);

	isFileStream.writable(writableFileStream);
	// true
	```
	*/
	writable(input: unknown): input is isFileStream.WriteStream;

	open: {
		/**
		@returns Whether `input` is a file system stream that is already open.

		@example
		```
		import * as fs from 'fs';
		import isFileStream = require('is-file-stream');

		const writableFileStream = fs.createWriteStream(somePath);

		console.log(isFileStream.open(writableFileStream));
		// false

		writableFileStream.on('open', () => {
			console.log(isFileStream.open(writableFileStream));
			// true
		});
		```
		*/
		(input: unknown): input is
			| isFileStream.OpenReadStream
			| isFileStream.OpenWriteStream;

		/**
		@returns Whether `input` is a readable file system stream that is already open.

		@example
		```
		import * as fs from 'fs';
		import isFileStream = require('is-file-stream');

		const readableFileStream = fs.createReadStream(somePath);

		console.log(isFileStream.open.readable(readableFileStream));
		// false

		readableFileStream.on('open', () => {
			console.log(isFileStream.open.readable(readableFileStream));
			// true
		});
		```
		*/
		readable(input: unknown): input is isFileStream.OpenReadStream;

		/**
		@returns Whether `input` is a writable file system stream that is already open.

		@example
		```
		import * as fs from 'fs';
		import isFileStream = require('is-file-stream');

		const writableFileStream = fs.createWriteStream(somePath);

		console.log(isFileStream.open.writable(writableFileStream));
		// false

		writableFileStream.on('open', () => {
			console.log(isFileStream.open.writable(writableFileStream));
			// true
		});
		```
		*/
		writable(input: unknown): input is isFileStream.OpenWriteStream;
	};
};

export = isFileStream;
