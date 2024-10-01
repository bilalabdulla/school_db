'use strict';
import {Model} from 'sequelize' 
module.exports = (sequelize: any, DataTypes: any) => {
  class SubjectTeachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  SubjectTeachers.init({
    SubjectTeacherId: {
      type: DataTypes.INTEGER,
      primaryKey: true,    
      autoIncrement: true   
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      references: {
        model: 'Teacher',
        key: 'id'
      }
    },
    SubjectId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Subject',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'SubjectTeachers',
  });
  return SubjectTeachers;
};