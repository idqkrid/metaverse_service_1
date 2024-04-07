const express = require('express');
const bcrypt = require('bcrypt');

// 로그인 passport
const passport = require('passport');
const { User, Post } = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/users", (req, res, next) => {
  console.log("789줄");
  console.log(req.user);
  console.log(req.body);

  return res.json(req.user || false);
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // 서버쪽 에러가 있는 경우
      console.error(err);
      return next(err);
    }
    if (info) {
      // 클라이언트 에러
      return res.status(401).send(info.reason);
    }
    // 성공하면 유저의 정보
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        // 패스포트 로그인 했을때 오류가 났을 경우
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword); // 성공하면 프론트에게 넘겨줌
    });
  })(req, res, next);
});

// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.')
    }
    await User.create({ // 테이블 안에 데이터를 넣는것
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060')
    res.status(200).send('ok');
  } catch (error) {
    console.log(error)
    next(error);
  }
});

// 로그아웃
router.post('/logout', (req, res, next) => { req.logout(() => { res.send('ok'); }); });

// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    });
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 비밀번호 수정
router.patch('/password', isLoggedIn, async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await User.update({
      password: hashedPassword,
    }, {
      where: { id: req.user.id },
    });
    res.status(200).json('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;