const { sequelize } = require('./models/index.js');

const driver = () => {
    sequelize.sync().then(() => { // sequelize는 promose를 반환
        console.log('초기화 완료');
    }).catch((err) => {
        console.error('초기화 실패');
        console.error(err);
    });
};
driver();