var s = require('url-safe');

console.log(s('http://user:pass@example.com'));
// http://example.com

console.log(s('http://user:pass@example.com', '***'));
// http://***@example.com