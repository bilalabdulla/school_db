'use strict';
import {Model} from 'sequelize'
module.exports = (sequelize: any, DataTypes: any ) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Class.hasMany(models.Student, {foreignKey: 'class_id'})
      Class.hasMany(models.Teacher, {foreignKey: 'class_id'})
      Class.hasMany(models.Subject, {foreignKey: 'class_id'})  
      Class.belongsTo(models.Department, {foreignKey: 'department_id'})   
    }   
  }                    
     
  Class.init({
    Grade: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Division: {       
      type: DataTypes.STRING,             
      allowNull: false
    },
    Category: {
      type: DataTypes.STRING,
    }         
  }, {
    sequelize,
    modelName: 'Class',
    timestamps: false 
  });
  return Class;
};
                          