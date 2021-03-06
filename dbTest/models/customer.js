const Sequelize = require('sequelize');

module.exports = class Customer extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            customer_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Customer',
            tableName: 'customer',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Customer.hasMany(db.CustomerEvaluation, { foreignKey: 'customer_id', sourceKey: 'customer_id'});
    }
};
