'use strict';
import {Model} from 'sequelize' 
module.exports = (sequelize: any, DataTypes: any) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Teacher.belongsToMany(models.Subject, {
        through: 'SubjectTeachers'
      })   
      Teacher.belongsTo(models.Class, {foreignKey: 'class_id'})  
      Teacher.belongsTo(models.Department, {foreignKey: 'department_id'})
    }
  }

  Teacher.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Teacher', 
  });
  return Teacher;
};