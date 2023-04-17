// 모델 : 단수형(customer), 테이블 : 복수형(customers)
module.exports = (sequelize, DataTypes) => {
    const newCustomer = sequelize.define("new_customer", {
        // id 값은 자동으로 생성
        name: { // 속성 생성
            type: DataTypes.STRING(20),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        joined_data: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        timestamps: false // createAt, updatedAt 열 여부
    });
    return newCustomer;
};