module.exports = (sequelize, DataTypes) => {
    const newPurchase = sequelize.define("new_purchase", {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        book_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        purchase_data: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        freezeTableName: true, // 테이블명이 newPurchases가 안되게
        timestamps: false
    });
    return newPurchase;
};