module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return User;
};
