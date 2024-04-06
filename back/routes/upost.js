const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Upost, Post, Image, Comment, User } = require('../models');
const {isLoggedIn} = require('./middlewares')

const router = express.Router();


// 업데이트 추가
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    console.log('업데이트 전송!')
    console.log(req.body);
    console.log(req.body.title)
    console.log(req.body.content)

    const update = await Upost.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullUpdate = await Upost.findOne({
      where: { id: update.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }]
    })

    res.status(201).json(fullUpdate);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

// 공지사항 가져오기
router.get('/all', async (req, res, next) => { // GET
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const updates = await Upost.findAll({
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
    console.log(updates);
    res.status(200).json(updates);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 수정
router.patch('/:updateId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  try {
    console.log('게시글 수정!')
    console.log(req.body)
    console.log(req.body.title)
    console.log(req.body.content)

    const updates = await Upost.update({
      title: req.body.title,
      content: req.body.content,
    }, {
      where: {
        id: req.params.updateId,
        UserId: req.user.id,
      },
    });


    res.status(200).json({ UpdateId: parseInt(req.params.updateId, 10)});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 삭제
router.delete('/:updateId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
  try {
    await Upost.destroy({
      where: {
        id: req.params.updateId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ UpdateId: parseInt(req.params.updateId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 한개 가져오기
router.get('/:updateId', async (req, res, next) => { // GET /post/1
  try {
    const updates = await Upost.findOne({
      where: { id: req.params.updates },
    });
    if (!updates) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullUpdate = await Upost.findOne({
      where: { id: updates.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(200).json(fullUpdate);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;