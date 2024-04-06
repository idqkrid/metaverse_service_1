const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Meta, User } = require('../models');
const {isLoggedIn} = require('./middlewares')

const router = express.Router();

// 댓글 추가
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const meta = await Meta.create({
      title: req.body.title,
      UserId: req.user.id,
    })
    const fullMeta = await Meta.findOne({
      where: { id: meta.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullMeta);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

// 메타버스 가져오기
router.get('/', async (req, res, next) => { // GET
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const metas = await Meta.findAll({
      where,
      limit: 8,
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });
    console.log(metas);
    res.status(200).json(metas);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;