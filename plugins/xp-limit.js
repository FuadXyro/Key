import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m) => {
  let fuad = (text, style = 1) => {
    var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
    var yStr = Object.freeze({
      1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890',
    })
    var replacer = []
    xStr.map((v, i) =>
      replacer.push({
        original: v,
        convert: yStr[style].split('')[i],
      })
    )
    var str = text.toLowerCase().split('')
    var output = []
    str.map((v) => {
      const find = replacer.find((x) => x.original == v)
      find ? output.push(find.convert) : output.push(v)
    })
    return output.join('')
  }

  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  else who = m.sender

  if (typeof global.db.data.users[who] === 'undefined') throw 'Pengguna tidak ada didalam database'

  let user = global.db.data.users[who]
  let limit = `${global.db.data.users[who].limit}`

  let info = `
▸ Limit: *${
    who.split`@`[0] == nomorbot
      ? 'Infinity Limit Left=͟͟͞͞💫'
      : user.premiumTime >= 1
      ? 'Infinity'
      : `${limit}`
  }*
▸ Join Limit: ${global.db.data.users[who].joinlimit} ⚡
  
*𖥂* Status : *${
    m.sender.split`@`[0] == nomorbot
      ? 'Developer'
      : user.premiumTime >= 1
      ? 'Premium User'
      : 'Free User'
  }*
`

  conn.reply(m.chat, fuad(info), m, { contextInfo: { externalAdReply: { title: global.wm, body: null, sourceUrl: sgc, thumbnail: fs.readFileSync('./thumbnail.jpg'), }}})
}

handler.help = ['limit [@user]']
handler.tags = ['xp']
handler.command = /^(limit)$/i
export default handler