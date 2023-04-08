const http = require('http');

http.createServer((req, res) => {
    // 응답에 대한 정보 기록, 200은 성공을 의미
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Node.js로 서버 만들기</h1>');
    res.write('<h1>테스트 텍스트</h1');
    res.end('<p>3장 http모듈 공부 중입니다.</p>');
}).listen(8080, () => { // 서버와 연결되면 실행할 함수
    console.log('8080포트에서 서버 연결 중..')
});