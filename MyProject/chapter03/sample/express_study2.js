const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080); // app.set으로 (키, 값) 설정

app.get('/', (req, res) => { // 주소에 대한 응답 처리
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중..')
});