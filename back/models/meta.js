const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Meta extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Meta",
        tableName: "metas",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Meta.belongsTo(db.User);
  }
};
