//this model defines/creates the login table in the database
//it is the basis of the user authentication we employ
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    login_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 15]
    },
    login_password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    }
  });
  Login.associate = function(models){
    Login.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Login;
}