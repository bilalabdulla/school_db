'use strict';
import {Model} from 'sequelize'
module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Admin.init({  
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }                              
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};


