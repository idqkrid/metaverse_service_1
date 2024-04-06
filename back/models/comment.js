const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // MySQL에는 users로 테이블 생성
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // belongTo를 만들때 UserId , PostId 가 생긴다.
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // 어떤 댓글은 어떤 작성자에게 속해있다.
    db.Comment.belongsTo(db.Post); // 어떤 댓글을 하나의 게시글에 속해 있다.
  };

  return Comment;
}