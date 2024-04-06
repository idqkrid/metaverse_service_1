const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const Upost = sequelize.define('Upost', { // MySQL에는 users로 테이블 생성
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
  });
  Upost.associate = (db) => {
    db.Upost.belongsTo(db.User); // 어떤 게시글을 어떤 작성자에게 속해있다.
  };

  return Upost;
}