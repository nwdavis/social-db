module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {

    // Giving the Author model a name of type STRING
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
  return Author;
};
