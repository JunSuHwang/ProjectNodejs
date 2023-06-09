const morgan = require('morgan');
const url = require("url");
const uuidAPIKey = require("uuid-apikey");

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const key = {
    apiKey: '1QFQEWP-60T459C-JEPKDA0-8AAX35D',
    uuid: '0ddf7772-3034-42a5-93ad-36a84295d195'
};

let boardList = [];
let numOfBoard = 0;

app.get('/', (req, res) => {
    res.send('This is api.js');
});

app.get('/board', (req, res) => {
    res.send(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        "id": ++numOfBoard,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);
    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    const board = {
        "id": ++numOfBoard,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);
    res.redirect('/board');
});

app.delete('/board/:id', (req,res) => {
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);
    
    res.redirect('/board');
});

app.get('/board/:apikey/:type', (req, res) => {
    let { type, apikey } = req.params;
    const queryData = url.parse(req.url, true).query; // url에 ?key=value 형식으로 온 쿼리스트링을 파싱

    if(uuidAPIKey.isAPIKey(apikey) && uuidAPIKey.check(apikey, key.uuid)) {
        if(type === 'search') {
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => { // 콜백 함수의 조건을 만족하는 배열 반환
                return e.title.includes(keyword) // Array.prototype.includes() 특정 요소 들어있는지 판별, True or False
            });
            res.send(result);
        } else if(type === 'user') {
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                return e.user_id === user_id;
            });
            res.send(result);
        } else {
            res.send('Wrong URL');
        }
    }else {
        res.send('Wrong API Key')
    }
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 실행 중..')
});