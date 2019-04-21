import {expectType, expectError} from 'tsd';
import isFileStream = require('.');

const foo = '';

if (isFileStream(foo)) {
	expectType<isFileStream.ReadStream | isFileStream.WriteStream>(foo);
	expectError<isFileStream.ReadStream>(foo);
	expectError<isFileStream.WriteStream>(foo);
}

if (isFileStream.readable(foo)) {
	expectType<isFileStream.ReadStream>(foo);
}

if (isFileStream.writable(foo)) {
	expectType<isFileStream.WriteStream>(foo);
}

if (isFileStream.open(foo)) {
	expectType<isFileStream.OpenReadStream | isFileStream.OpenWriteStream>(foo);
	expectError<isFileStream.ReadStream>(foo);
	expectError<isFileStream.WriteStream>(foo);
	expectError<isFileStream.OpenReadStream>(foo);
	expectError<isFileStream.OpenWriteStream>(foo);
}

if (isFileStream.open.readable(foo)) {
	expectType<isFileStream.OpenReadStream>(foo);
}

if (isFileStream.open.writable(foo)) {
	expectType<isFileStream.OpenWriteStream>(foo);
}
