const Sequelize = require('sequelize');

module.exports = class Project extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
                default: '프로젝트 설명을 적어주세요',
            },
            giturl: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            img: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Project',
            tableName: 'project',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Project.belongsTo(db.User, { foreignKey: 'user', targetKey: 'id' });
    }
};