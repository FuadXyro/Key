import { format } from 'util'
import nodemailer from 'nodemailer'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let users = db.data.users[m.sender]
  try {
    if (users.registered) return conn.reply(m.chat, `✅ Kamu sudah terdaftar.`, m)
    if (!args || !args[0]) return conn.reply(m.chat, `${usedPrefix + command} 'email@gmail.com'`, m)
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return conn.reply(m.chat, 'Email tidak valid.', m)
    let emails = Object.values(db.data.users).filter(v => v.email).map(v => v.email)
    if (emails.includes(args[0])) return conn.reply(m.chat, 'Email sudah terdaftar!', m)
    let code = `${getRandom(100, 900)}-${getRandom(100, 900)}`
    let avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
  //
    users.email = args[0]
    users.code = code
    users.codeExpire = new Date() * 1
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fuadbotzmd@gmail.com',
        pass: 'qdtvejbgvuovsxou'
      }
    })

    const mailOptions = {
      from: {
        name: 'FuadBoTz-MD',
        address: 'fuadbotzmd@gmail.com'
      },
      to: args[0],
      subject: 'Email Verification',
      html: `<div style="
    padding: 20px;
    border: 2px solid #3498db;
    background-color: #ecf0f1;
    border-radius: 10px;
    text-align: center;
    font-size: 16px;
    color: #2c3e50;
    max-width: 400px;
    margin: auto;
">

    <img src="${avatar}" alt="Profile" style="
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 20px;
    ">

    <p style="font-size: 18px; font-weight: bold; color: #e74c3c;">
        Hi ${m.pushName} 😘
    </p>

    <p>
        Confirm your email to be able to use ZenithBotz. Send this code to the bot, and it will expire in 3 minutes.
    </p>

    <div style="
        background-color: #3498db;
        padding: 10px;
        border-radius: 5px;
        margin: 20px 0;
    ">
        <h1 style="
            color: #fff;
            font-size: 24px;
            animation: colorChange 2s infinite alternate;
        ">
            ${code}
        </h1>
    </div>

    <p>
        Or click the button below:
    </p>

    <a href="https://wa.me/${conn.user.jid.split('@')[0]}?text=${code}" style="
        text-decoration: none;
        color: #fff;
        background-color: #e74c3c;
        padding: 10px 20px;
        border-radius: 5px;
        display: inline-block;
        margin-top: 10px;
        transition: background-color 0.3s;
    " onmouseover="this.style.backgroundColor='#c0392b'" onmouseout="this.style.backgroundColor='#e74c3c'">
        Confirm Email
    </a>

    <hr style="border: 0; border-top: 1px dashed #95a5a6; margin: 20px 0;">

    <p style="margin-bottom: 0;">
        Regards, <b>FuadXyro</b>
    </p>

    <style>
        @keyframes colorChange {
            from {
                color: #fff;
            }
            to {
                color: #3498db;
            }
        }
    </style>
</div>
`
    }

    transport.sendMail(mailOptions, function(err, data) {
      if (err) return conn.reply(m.chat, `❌ SMTP Error !!\n\n${err}`, m)
      return conn.reply(m.chat, `✅ Check your mailbox to get a verification code.`, m)
    })
  } catch (e) {
    conn.reply(m.chat, format(e), m)
  }
}

handler.help = ['regmail email@gmail.com']
handler.tags = ['xp']
handler.command = ['regmail', 'remail']
handler.private = true

export default handler

function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}