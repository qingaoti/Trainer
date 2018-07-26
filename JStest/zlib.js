const zlib = require('zlib');

var list = [
	{
		imgkey: 1111,
		imgUrl: 2222
	}, {
		imgkey: 2222,
		imgUrl: 2222
	}, {
		imgkey: 3333,
		imgUrl: 2222
	}, {
		imgkey: 4444,
		imgUrl: 2222
	}, {
		imgkey: 5555,
		imgUrl: 2222
	}, {
		imgkey: 6666,
		imgUrl: 2222
	}, {
		imgkey: 7777,
		imgUrl: 2222
	}, {
		imgkey: 8888,
		imgUrl: 2222
	}, {
		imgkey: 9999,
		imgUrl: 2222
	}
];

var gzipStream = zlib.createGzip();

zlib.Gzip(
	"qwertyuiopasdfghjklzxcvbnm",
	(err, buffer) => {
		if (!err) {
			console.log(buffer.toString());
		} else {
			// handle error
		}
	});