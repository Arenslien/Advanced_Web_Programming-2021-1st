// module import
const url = require('url');

// const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL()', myURL);
console.log('url.format():', url.format(myURL));
console.log();
console.log();
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse(url):', parsedUrl);
console.log('url.format(parsedUrl):', url.format(parsedUrl));
