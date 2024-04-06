const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

// 패스포트 설정파일

module.exports = () => {
  passport.serializeUser((user, done) => { // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    // 쿠키와 유저 id를 들고 있습니다.
    done(null, user.id); // 서버에러 , 성공
  });

  // 로그인이 성공하고 나서 여기에 1번 아이디가 저장되어있는데 매번 실행되면서 사용자 정보를 db에 있는 정보를 복구를 해요
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id }});
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};

// 프론트에서 서버로는 cookie만 보내요(clhxy)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 1 발견
// id: 1이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱