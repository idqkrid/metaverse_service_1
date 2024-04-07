const express = require('express')
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const noticeRouter = require("./routes/notice");
const updateRouter = require("./routes/upost");
const mailRouter = require("./routes/mail");
const metaRouter = require("./routes/meta");

const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");
const dotenv = require("dotenv");

const webSocket = require("./socket");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(hpp());
  app.use(helmet());
} else {
}

app.use(
  cors({
    origin: [
      "http://localhost:3060",
      "http://zepmetaverse.com",
      "http://52.78.27.78",
    ],
    credentials: true, // 쿠키를 같이 전달하고 싶으면 true
    webSocket: true,
  })
);

app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extends: true })); // 프론트에서 보낸 데이터를 req.body 에다가 넣어주는 역할

app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/notice", noticeRouter);
app.use("/upost", updateRouter);
app.use("/mail", mailRouter);
app.use("/meta", metaRouter);

// next(err) 인경우 실행
app.use((err, req, res, next) => {
  // 에러가 났을경우 보여주는 페이지
});

const server = app.listen(80, () => {
  console.log("서버 실행중..");
});

webSocket(server, app);

/**
 * app.get -> 가져오다
 * app.post -> 생성하다
 * app.put -> 전체 수정
 * app.delete -> 제거
 * app.patch -> 부분 수정 (ex: 사용자 정보 수정할때 닉네임만 수정할때)
 */