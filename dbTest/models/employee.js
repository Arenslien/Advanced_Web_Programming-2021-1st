const Sequelize = require('sequelize');

module.exports = class Employee extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            emp_no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            ID: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            PWD: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            resident_registeration_number: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            education: {
                type: Sequelize.ENUM(['high-school', 'college', 'master', 'ph-d']),
                allowNull: false,
            },
            dept_no: {
                type: Sequelize.INTEGER,
                
            },
            work_experience: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Employee',
            tableName: 'employee',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // Skill Model과 연결
        db.Employee.belongsToMany(db.Skill, { through: 'EmpSkill'});

        // Participation Model과 연결
        db.Employee.belongsToMany(db.Project, { through: 'Participation'});

        // Authorization Model과 연결
        db.Employee.belongsTo(db.Authorization, { foreignKey: 'authorization_no', targetKey: 'authorization_no'});
        
        // Department Model과 연결
        db.Employee.belongsTo(db.Department, { foreignKey: 'dept_no', targetKey: 'dept_no'});

        // 동료 평가 Model과 연결
        db.Employee.hasMany(db.PeerEvaluation, { foreignKey: 'evaluator_no', sourceKey: 'emp_no'});
        db.Employee.hasMany(db.PeerEvaluation, { foreignKey: 'non_evaluator_no', sourceKey: 'emp_no'});

        // PM 평가 Model과 연결
        db.Employee.hasMany(db.PMEvaluation, { foreignKey: 'evaluator_no', sourceKey: 'emp_no'});
        db.Employee.hasMany(db.PMEvaluation, { foreignKey: 'non_evaluator_no', sourceKey: 'emp_no'});

        // 고객 평가 Model과 연결
        db.Employee.hasMany(db.PeerEvaluation, { foreignKey: 'non_evaluator_no', sourceKey: 'emp_no'});

        // Skill Model과 연결
        db.Employee.hasMany(db.Task, { foreignKey: 'emp_no', sourceKey: 'emp_no'});

    }
};
