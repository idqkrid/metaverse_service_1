const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const router = express.Router();

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  }
});

const mailOptions = {
  from: email,
  to: email,
}

router.post('/' , async (req, res, next) => {
  try {
    console.log('메일 전송하기 왔습니다.')
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.subject);
    console.log(req.body.message);
    
    await transporter.sendMail({
      ...mailOptions,
      subject: req.body.subject,
      text: "This is a test string",
      html: `
      <div style="border: 1px solid #000; padding: 10px;">
        <h1>${req.body.subject}</h1>
        <p>
          <strong>사용자이름 :</strong> ${req.body.name}<br>
          <strong>이메일     :</strong> ${req.body.email}<br>
          <strong>주제       :</strong> ${req.body.subject}<br>
          <strong>내용       :</strong> ${req.body.message}<br>
        </p>
      </div>
    `,
    })

    res.status(201).json({success: true});
  } catch (error) {
    console.log(error);
    next(error);
  }
})


module.exports = router;