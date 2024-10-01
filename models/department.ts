'use strict';
import {Model} from 'sequelize'
module.exports = (sequelize: any, DataTypes: any) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Department.hasMany(models.Teacher, {foreignKey: 'department_id'})
      Department.hasMany(models.Class, {foreignKey: 'department_id'})    
    }
  }         
  Department.init({
    Name: {          
      type: DataTypes.STRING,   
      allowNull: false
    }                   
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};