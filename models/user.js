module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 15]
    },
  });
  User.associate = function(models) {
    User.hasMany(models.Comm, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      } 
    });    
    User.hasMany(models.Post, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      } 
    });
    User.hasOne(models.Login, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
  return User;
};
