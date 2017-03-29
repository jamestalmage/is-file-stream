# is-file-stream [![Build Status](https://travis-ci.org/jamestalmage/is-file-stream.svg?branch=master)](https://travis-ci.org/jamestalmage/is-file-stream)

> Detect if a stream is a file stream


## Install

```
$ npm install --save is-file-stream
```


## Usage

```js
const fs = require('fs');
const isFileStream = require('is-file-stream');

const readableFileStream = fs.createReadStream(somePath);
const writableFileStream = fs.createReadStream(someOtherPath);

isFileStream(readableFileStream);
// true

isFileStream(writableFileStream);
// true

isFileStream.readable(writableFileStream);
// false
```


## API

### isFileStream(input)

Returns `true` if `input` is a file system stream, otherwise returns `false`.

### isFileStream.readable(input)

Returns `true` if `input` is a readable file system stream, otherwise returns `false`.

### isFileStream.writable(input)

Returns `true` if `input` is a writable file system stream, otherwise returns `false`.

### isFileStream.open(input)

Returns `true` if `input` is a file system stream that is already open, otherwise returns `false`.

### isFileStream.open.readable(input)

Returns `true` if `input` is a readable file system stream that is already open, otherwise returns `false`.

### isFileStream.open.writable(input)

Returns `true` if `input` is a writable file system stream that is already open, otherwise returns `false`.

## License

MIT © [James Talmage](http://github.com/jamestalmage)
