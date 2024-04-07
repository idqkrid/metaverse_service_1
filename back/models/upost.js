const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Upost extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Upost",
        tableName: "uposts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Upost.belongsTo(db.User);
  }
};
