import fetch from 'node-fetch'
import canvafy from 'canvafy'
import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function(m, {
    text,
    usedPrefix
}) {
    let user = global.db.data.users[m.sender]
    let name = 'user' + makeId(5)
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg")
    let age = `0`

    if (user.registered === true) throw '```✅ Nomor Kamu Udah Terverifikasi```'

    user.regTime = +new Date()
    user.registered = true
    user.age = age

    let sn = createHash('md5').update(m.sender).digest('hex')
    let capt = `乂  *G U E S*\n\n`
    capt += `┌  ◦ *Name* : ${name}\n`
    capt += `│  ◦ *Number* : ${m.sender.split("@")[0]}\n`
    capt += `│  ◦ *Age* : ${age}\n`
    capt += `└  ◦ *Serial Number* : ${sn}\n\n`
    capt += `${namebot} By ${author}`

    let p = await new canvafy.Security()
        .setAvatar(pp)
        .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp")
        .setCreatedTimestamp(Date.now())
        .setSuspectTimestamp(1)
        .setBorder("#f0f0f0")
        .setLocale("id")
        .setAvatarBorder("#f0f0f0")
        .setOverlayOpacity(0.9)
        .build()

    await conn.sendFile(m.chat, p, '', capt, m)
}

handler.help = ['guest']
handler.tags = ['xp']
handler.command = /^(guest)$/i

export default handler

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length) {
    var result = ''
    var characters = '0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}