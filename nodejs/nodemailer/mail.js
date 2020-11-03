'use strict'
const nodemailer = require('nodemailer')

//创建发送邮件的请求对象
let transporter = nodemailer.createTransport({
  //发送方邮箱:lib/well-known/services.json
  host: 'smtp.qq.com',
  //端口号
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    //发送方邮箱地址
    user: 'antadams@foxmail.com',
    //mtp验证码
    pass: 'xunjeafbfnxebfbc',
  },
})
//邮件信息
let mailobj = {
  //发送方邮箱
  from: '"Fred Foo 👻" <antadams@foxmail.com>',
  //接受方邮箱，若需发送给多个邮箱，用,拼接
  to: 'antadams@foxmail.com',
  //邮件标题
  subject: '20201029',
  //邮件内容，text只能输入文本
  text: '您的验证码是哈哈哈哈哈哈',
  //邮件发送页面,text和html只能选其中一个发送
  html: '<b>Hello world?</b>',
}
//发送邮件
transporter.sendMail(mailobj, (err, data) => {
  if (!err) {
    console.log('发送成功')
  } else {
    console.log('发送失败')
  }
})
