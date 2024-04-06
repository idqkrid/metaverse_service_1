const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Notice, Upost, Post, Image, Comment, User } = require('../models');
const {isLoggedIn} = require('./middlewares')

const router = express.Router();


// 게시글 추가
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    console.log('공지사항 전송!')
    console.log(req.body);
    console.log(req.body.title)
    console.log(req.body.content)

    const notice = await Notice.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullNotice = await Notice.findOne({
      where: { id: notice.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }]
    })

    res.status(201).json(fullNotice);
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
    const notices = await Notice.findAll({
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
    console.log(notices);
    res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 수정
router.patch('/:noticeId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  try {
    console.log('게시글 수정!')
    console.log(req.body)
    console.log(req.body.title)
    console.log(req.body.content)

    const notices = await Notice.update({
      title: req.body.title,
      content: req.body.content,
    }, {
      where: {
        id: req.params.noticeId,
        UserId: req.user.id,
      },
    });


    res.status(200).json({ NoticeId: parseInt(req.params.noticeId, 10)});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 삭제
router.delete('/:noticeId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
  try {
    await Notice.destroy({
      where: {
        id: req.params.noticeId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ NoticeId: parseInt(req.params.noticeId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 한개 가져오기
router.get('/:noticeId', async (req, res, next) => { // GET /post/1
  try {
    const notices = await Notice.findOne({
      where: { id: req.params.notices },
    });
    if (!notices) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Notice.findOne({
      where: { id: notices.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 검색한 데이터 가져오기
router.get('/', async (req, res, next) => { // GET /posts
  try {
    console.log('검색한 데이터')
    console.log(req.query)
    console.log(req.query.query)

    const search = await Notice.findAll({
      where: {
        title: req.query.query,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });

    const uPost = await Upost.findAll({
      where: {
        title: req.query.query,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        }],
    });

    // search 배열에 속한 요소들에 새로운 속성 추가
    const searchWithSource = search.map(item => ({
      ...item.toJSON(),  // 해당 요소의 데이터를 복사
      source: 'search',  // 새로운 속성 추가
    }));

    // uPost 배열에 속한 요소들에 새로운 속성 추가
    const uPostWithSource = uPost.map(item => ({
      ...item.toJSON(),  // 해당 요소의 데이터를 복사
      source: 'uPost',  // 새로운 속성 추가
    }));

    const combinedSearchResults = searchWithSource.concat(uPostWithSource);

    console.log(combinedSearchResults);
    res.status(200).json(combinedSearchResults);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;