const nodemailer = require('nodemailer');
// nodemailer
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  port: 25,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const accountCreationHtml = `

<div class="ml-5">
<h1><i class="fa fa-home" style="font-size:60; color="#9400D3" "></i>&nbsp; WELCOME TO JF PRO</h1>
<div class="mt-5">
<h6>
    Congratulations, your account has been created. Welcome to JF PRO, %name%!
</h6>
<p>`+
`</p><br />
<p>Your new password is %pwd% </p><br /><br />
<small>JF PRO advice you to update this password after first login in JF Pro mobile app</small>
</div>
</div>`;

const passwordForgotPwd = `

<div class="ml-5">
<h1><i class="fa fa-home" style="font-size:60; color="#9400D3" "></i>&nbsp; WELCOME TO JF PRO</h1>
<div class="mt-5">
<h6>
    Hello %name%,
</h6>
<p>`+
`</p><br />
<p>Your new password is %pwd% </p><br /><br />
<small>JF PRO advice you to update this password after login in JF Pro mobile app</small>
</div>
</div>`;

const changePwdHtml = `

<div class="ml-5">
<h1><i class="fa fa-home" style="font-size:60; color="#9400D3" "></i>&nbsp; WELCOME TO JF PRO</h1>
<div class="mt-5">
<h6>
    Congratulations, your password has been updated. Welcome to JF PRO, %name%!
</h6>
<p>`+
`</p><br />
</div>
</div>`;

const sendEmail = (html, body) => {
  const mailOptions = {
    from: body.sender,
    to: body.email,
    subject: body.subject,
    html: html,
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log('mail not sent...', error);
    } else {
      console.log('mail sent...');
    }
  });
}

exports.sendMail = (body) => {
    let html = accountCreationHtml;
    html = html.replace('%name%', body.name);
    html = html.replace('%pwd%', body.pwd);
    sendEmail(html, body);
}

exports.sendMailWhenPwdForgot = (body) => {
  let html = passwordForgotPwd;
  html = html.replace('%name%', body.name);
  html = html.replace('%pwd%', body.pwd);
  sendEmail(html, body);  
}

exports.sendMailWhenPwdUpdates = (body) => {
  let html = changePwdHtml;
  html = html.replace('%name%', body.name);
  sendEmail(html, body);
}  