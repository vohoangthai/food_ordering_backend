const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email,orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "vhthai.main@gmail.com", // generated ethereal user
      pass: "tjybkzpykhacycua", // generated ethereal password
    },
  });
  transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

  let listItem = '';
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
     <b>${order.amount}</b> <b>${order.name}</b> với giá: <b>${order.price}đ</b></div>
    </div>`
    attachImage.push({path: order.image})
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Cảm ơn bạn đã đặt hàng tại GoFoods", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Đơn hàng của bạn đã đặt thành công!!!</b></div> 
    <p>Đơn hàng bao gồm: </p>
    ${listItem}
    <div>Bên dưới là hình ảnh của sản phẩm:</div>
    `
    ,
    attachments: attachImage,
  });
}

module.exports = {
  sendEmailCreateOrder
}