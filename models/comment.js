module.exports = function(sequelize, DataTypes) {
  var Comm = sequelize.define("Comm", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
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

  Comm.associate = function(models) {
    Comm.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      } 
    })
    Comm.belongsTo(models.Post, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      } 
    })
  }


  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return Comm;
};
