import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, text, usedPrefix }) => {

    conn.emailotp = conn.emailotp ? conn.emailotp : {}
    let id = m.chat
    if (id in conn.emailotp) {
        conn.reply(m.chat, 'Masih ada OTP belum terjawab di chat ini', conn.emailotp[id][0])
        throw false
    }
    if (!text) return m.reply(
        `Example: ${usedPrefix + command} email@gmail.com`
    )
    let generateOTP = (Math.floor(Math.random() * 9000) + 1000).toString()
    let avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
    let pp = 'https://telegra.ph/file/8a1019f00fc836b09bdd7.jpg'
    let res = await sendEmail(namebot, generateOTP, conn.user.jid.split("@")[0], avatar, text)

    let json = {
        jawaban: generateOTP,
        soal: "Reply pesan ini dan masukkan kode OTP"
    }
    if (res.success == true) {
  let caption = `✅ Check your mailbox to get a verification code.
  
  ${json.soal}
    `.trim()
    conn.emailotp[id] = [
        await conn.reply(m.chat, caption, m, { mentions: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: thumb, title: `${namebot}`, body: `By FuadXy`, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}}),
        json, poin,
        setTimeout(() => {
            if (conn.emailotp[id]) conn.reply(m.chat, `Waktu habis!\nOTP adalah *${json.jawaban}*`, conn.emailotp[id][0])
            delete conn.emailotp[id]
        }, timeout)
    ]
    }
}
handler.help = ['remail']
handler.tags = ['xp']
handler.command = /^remail/i

export default handler

async function sendEmail(Name, OTP, Number, PP, Mail) {
let html = `<!DOCTYPE html>
<html>
<head>
  <title>Pengirim Kode OTP</title>
</head>
<body style="background-color: #f2f2f2; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
  <div class='container' style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); padding: 20px; width: 300px; text-align: center;">
    <div class='profile-pic' style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 10px; background-color: #e5e5e5; background-image: url('${PP}'); background-size: cover; background-position: center;"></div>
    <div class='name' style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${Name}</div>
    <div class='description' style="font-size: 14px; color: #888888; margin-bottom: 10px;">KODE OTP ANDA</div>
    <div class='otp-code' style="font-size: 24px; font-weight: bold; margin-bottom: 20px;"><strong>${OTP}</strong></div>
    <a href='https://wa.me/${Number}?text=${OTP}' style="text-decoration: none;">
      <button class='send-button' style="background-color: #4caf50; color: #ffffff; border: none; border-radius: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Kirim Kode</button>
    </a>
  </div>
</body>
</html>
`
    try {
        return await fetch("https://send.api.mailtrap.io/api/send/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 46fae2154055e6df3901c95919531b2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "from": {
                        "email": "notifier@boyne.dev",
                        "name": Name
                    },
                    "to": [{
                        "email": Mail,
                        "name": Name
                    }],
                    "subject": "KODE OTP MU ( " + OTP + " )",
                    "html": html,
                    "category": "Notification"
                })
            })
            .then(response => response.json())
    } catch (error) {
        console.error("Request failed:", error)
        throw error
    }
}
async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}