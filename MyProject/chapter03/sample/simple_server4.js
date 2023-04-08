const http = require('http');

http.createServer((req, res) => {
    if(req.url === '/') { // localhost:8080 뒤에 주소가 /이면, 즉 요청 url이 그냥 /이면 (예를 들어 url === index.html 이런 식으로 가능)
        res.write('Hello');
        res.end()
    }
}).listen(8080, () => {
    console.log('8080포트에서 서버 연결')
});