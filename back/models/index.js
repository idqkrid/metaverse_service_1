const Sequelize = require('sequelize');
const comment = require("./comment");
const image = require("./image");
const meta = require("./meta");
const notice = require("./notice");
const post = require("./post");
const upost = require("./upost");
const user = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = comment;
db.Image = image;
db.Post = post;
db.User = user;
db.Notice = notice;
db.Upost = upost;
db.Meta = meta;


Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
