var { DataTypes, Model } = require("sequelize");

var sequelize = require("./connection");


class User extends Model {}
User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.CHAR(64)
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    facebookUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    defaultScope: {
      rawAttributes: { exclude: ["passwordHash"] }
    },
    modelName: "users",
    sequelize
  }
);

class UserSession extends Model {}
UserSession.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users"
      },
      type: DataTypes.UUID
    },
    expiresAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    modelName: "userSessions",
    paranoid: false,
    sequelize,
    updatedAt: false
  }
);

function syncing() {
  User.sync();
  UserSession.sync();
  console.log("Tables exported !");
}

console.log("Exporting tables ...")

setTimeout(syncing, 15000);

module.exports = {User, UserSession};