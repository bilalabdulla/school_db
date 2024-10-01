'use strict';
import {Model, Sequelize} from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class SubjectEnrollments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  SubjectEnrollments.init({
    SubjectEnrollmentId: {         
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    StudentId: {
      type: DataTypes.INTEGER,           
      allowNull: false,
      references: {
        model: 'Student',
        key: 'id'     
      }
    },
    SubjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subject',
        key: 'id'
      }
    },
    AverageMarks: {
      type: DataTypes.INTEGER
    },
    Score: {
      type: DataTypes.INTEGER
    },
    Attendance: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'SubjectEnrollments',   
  });
  return SubjectEnrollments;
}