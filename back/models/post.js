const { sequelize } = require("./index.js");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MySQL에는 users로 테이블 생성
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
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 어떤 게시글을 어떤 작성자에게 속해있다.
    db.Post.hasMany(db.Comment); // 어떤 게시글에 댓글이 여러개 있을수 있다.
    db.Post.hasMany(db.Image); // 어떤 게시글에 이미지를 여러개 가질 수 있다.

    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }) // 여러 게시글에 여러 해시태그가 속해 있다.
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    
    db.Post.belongsTo(db.Post, {as: 'Retweet'}); // 리트윗
  };

  return Post;
}