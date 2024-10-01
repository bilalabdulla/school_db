'use strict';

import {Model, Sequelize} from 'sequelize'
module.exports = (sequelize: any, DataTypes: any) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.   
     */
    static associate(models: any ) {
      // define association here
      Student.belongsToMany(models.Subject, {
        through: 'SubjectEnrollments'
      })
      Student.belongsTo(models.Class, {foreignKey: 'class_id'})
    }
  }
  Student.init({
    firstName: {
      type: DataTypes.STRING,  
      allowNull: false   
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    performance: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    enrolled_year: {
      type: DataTypes.INTEGER  
    } 
  }, {
    sequelize,
    modelName: 'Student',  
  });
  return Student;
};