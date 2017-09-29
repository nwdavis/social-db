module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 15]
    }
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      }
    });
    Post.hasMany(models.Comm, {
      onDelete: "CASCADE",
      foreignKey: { 
        allowNull: false
      } 
    });
  }

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return Post;
};
