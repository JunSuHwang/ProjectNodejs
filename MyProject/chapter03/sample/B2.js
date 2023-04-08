const A = require('./A2');
const B = 'variable B from B2.js';

console.log(A + ' in B2.js');

module.exports = B;

// module.exports = A 는 exports 객체에 원시 타입 하나의 값 할당가능
// exports(A)는 외부로 보낼 요소를 exports 객체에 추가
// 둘다 exports 객체를 넘김
// require에 디렉터리를 지정하여 디렉터리 전체의 모듈 사용가능

//exports, require는 전역 객체인 global이 생략된 것