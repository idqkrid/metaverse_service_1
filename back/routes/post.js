const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});
const upload = multer({
  storage: multer({
    s3: new AWS.S3(),
    bucket: "zepmetaverse",
    key(req, file, cb) {
      cb(null, `original/${Data.now()} ${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 게시글 추가
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    console.log("게시글 전송!");
    console.log(req.body.text);

    const post = await Post.create({
      title: req.body.text,
      content: req.body.content,
      UserId: req.user.id,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 이미지 추가 array , single , none
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.location));
});

// 댓글 추가
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 게시글 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  // PATCH /post/10
  try {
    console.log("게시글 수정!");
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.image);

    const post = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(
          req.body.image.map((image) =>
            Image.create({ src: image, PostId: req.params.postId })
          )
        );
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({
          src: req.body.image,
          PostId: req.params.postId,
        });
      }
    }

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 이미지 삭제
router.delete("/image/:imageId", isLoggedIn, async (req, res, next) => {
  console.log("이미지 삭제");
  console.log(req.params);
  console.log(req.params.data);
  console.log(req.params.imageId);
  console.log(req.params.index);
  try {
    await Image.destroy({
      where: {
        id: parseInt(req.params.imageId, 10),
      },
    });
    res.status(200).json({ ImageId: parseInt(req.params.imageId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 수정
router.patch(
  "/:postId/comment/:commentId",
  isLoggedIn,
  async (req, res, next) => {
    // PATCH /post/10
    try {
      console.log("게시글 수정!");
      console.log(req.params);
      console.log(req.params.postId);
      console.log(req.params.commentId);
      console.log(req.body.content);

      const comment = await Comment.update(
        {
          content: req.body.content,
        },
        {
          where: {
            id: req.params.commentId,
            PostId: req.params.postId,
          },
        }
      );

      res.status(200).json({ CommentId: parseInt(req.params.commentId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 댓글 삭제
router.delete(
  "/:postId/comment/:commentId",
  isLoggedIn,
  async (req, res, next) => {
    // DELETE /post/10
    console.log("서버 댓글 삭제");
    console.log(req.params);
    console.log(req.params.postId);
    console.log(req.params.commentId);

    try {
      await Comment.destroy({
        where: {
          id: req.params.commentId,
          PostId: req.params.postId,
        },
      });
      res.status(200).json({ CommentId: parseInt(req.params.commentId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 게시글 삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 한개 가져오기
router.get("/:postId", async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;