// 네이버 개발자 센터 : https://developers.naver.com/main/
// request 모듈을 이용한 네이버 openAPI 사용하기
const morgan = require('morgan');
const request = require('request');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/naver/search', (req, res) => {
    const client_id = process.env.naverClientKey;
    const client_secret = process.env.naverSecret;
    const api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI('코스피'); // 코스피 검색해줘
    const option = {};
    const options = {
        url:api_url,
        qs: option,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret},
    };

    request.get(options, (error, response, body) => { // 응답을 받기 위한 request.get
        if(!error && response.statusCode == 200) {
            let newsItem = JSON.parse(body).items; // 코스피 검색의 뉴스 결과는 body에 있음

            const newsJson = {
                title: [], // 배열 형식
                link: [],
                description: [],
                pubDate: []
            }

            for(let i = 0; i < newsItem.length; i++) {
                newsJson.title.push(newsItem[i].title.replace(/(<([^>]+)>)|&quot;/ig, "")); // <br>이나 &quot 같은 html 문자 지우기
                newsJson.link.push(newsItem[i].link);
                newsJson.description.push(newsItem[i].description.replace(/(<([^>]+)>)|&quot;/ig, ""));
                newsJson.pubDate.push(newsItem[i].pubDate);
            }
            res.json(newsJson);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 서버 실행 중..')
});