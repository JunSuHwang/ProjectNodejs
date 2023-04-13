const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true} ));

app.get('/airkorea', async(req, res) => {
    const serviceKey = "";
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";
    let parmas = encodeURI('serviceKey' + '=' ) + serviceKey;
    parmas += '&' + encodeURI('numOfRows') + '=' + encodeURI('10');
    parmas += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    parmas += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    parmas += '&' + encodeURI('stationName') + '=' + encodeURI('종로구');
    parmas += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    const url = airUrl + parmas;

    try{
        const result = await axios.get(url); // axios.method()에 url과 옵션 넣어 요청 보내기
        const airItem = {
            "location" : '종로구', 
            //: result.data.ArpltnInforInqireSvcVo["stationName"],
            "time" : result.data.response.body.items[0].dataTime,
            "pm10" : result.data.response.body.items[0].pm10Value,
            "pm25" : result.data.response.body.items[0].pm25Value
        }
        const badAir = [];
        if(airItem.pm10 <= 30) {
            badAir.push("좋음.");
        } else if(airItem.pm10 > 30 && airItem.pm10 <= 80) {
            badAir.push("보통.");
        } else {
            badAir.push("나쁨.");
        }

        if(airItem.pm25 <= 15) {
            badAir.push("좋음.");
        } else if(airItem.pm25 > 15 && airItem.pm10 <= 35) {
            badAir.push("보통.");
        } else {
            badAir.push("나쁨.");
        }

        res.send(`관측 지역 : ${airItem.location}/ 관측 시간: ${airItem.time} <br>
        미세먼지 ${badAir[0]} 초미세먼지 ${badAir[1]} 입니다.`);
    }catch(error) {
        console.log(error);
    }
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중..')
});