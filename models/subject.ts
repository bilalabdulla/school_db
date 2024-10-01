'use strict';
import {Model} from 'sequelize'  
import { SubjectAttributes } from '../types/subject';
module.exports = (sequelize: any , DataTypes: any) => {
  class Subject extends Model<SubjectAttributes> implements SubjectAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    title!: string
    isOptional!: boolean;
    grade!: number;
    static associate(models: any) {
      // define association here
      Subject.belongsToMany(models.Student, {
        through: 'SubjectEnrollments'
      })
      Subject.belongsTo(models.Class, {foreignKey: 'class_id'})         
    }
  }                          

  Subject.init({
    title: {
      type: DataTypes.STRING,        
      allowNull: false,
      unique: true 
    }, 
    isOptional: {
      type: DataTypes.BOOLEAN,   
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER      
    }
  }, {
    sequelize,
    modelName: 'Subject',
    timestamps: false
  });
  return Subject;   
}