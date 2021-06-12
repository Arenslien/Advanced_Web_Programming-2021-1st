const Sequelize = require('sequelize');

module.exports = class Skill extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            level: {
                type: Sequelize.ENUM(['beginning', 'intermediate', 'advanced']),
                allowNull: false,
                default: 'beginning'
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Skill',
            tableName: 'skill',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Skill.belongsTo(db.User, { foreignKey: 'user', targetKey: 'id' });
    }
};