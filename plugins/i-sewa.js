import fs from 'fs'
import fetch from 'node-fetch'
import * as pkg from '@adiwajshing/baileys'
import PhoneNumber from 'awesome-phonenumber'

const { MessageType } = pkg

let handler = async (m, { conn, namebot, author, nomorown }) => {
  let info = '```乂 P R I C E  S E W A B O T```\n\n'
  info += `➠ *7 Days* : 2.000\n`
  info += `➠ *30 Days* : 4.000\n`
  info += `➠ *Permanent* : 20.000\n\n`
  info += '```-Benefit Features Sewabot :```\n\n'
  info += `*1.* Auto Welcome\n`
  info += `*2.* Auto Kick\n`
  info += `*3.* Auto Open/Close\n`
  info += `*4.* Enable Features\n`
  info += `*5.* Kick List\n`

  let txt = '```乂 P R I C E  P R E M I U M```\n\n'
  txt += `➠ *7 Days* : 1.000\n`
  txt += `➠ *30 Days* : 5.000\n`
  txt += `➠ *Permanent* : 25.000\n\n`
  txt += '```-Benefit Features Premium :```\n\n'
  txt += `*1.* Remini\n`
  txt += `*2.* Search Tiktok\n`
  txt += `*3.* Search Asupan\n`
  txt += `*4.* Unlimited Limit\n`
  txt += `*5.* Get Acces Bug & Join\n\n`
  txt += ` ZenithBot Made By FuadXyro`
  
  let pp = 'https://telegra.ph/file/b5c7ca23f58208af04d22.jpg'
  let fuad = await conn.sendMessage(m.chat, { document: fs.readFileSync("./package.json"), fileName: 'ZenithBotz', mimetype: 'application/msword',
  jpegThumbnail: fs.readFileSync("./media/thumbDoc.jpg"), caption: `${info}\n\n${txt}`, contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: '© ZenithBot v3.0.3 (Public Bot)', body: 'Regards By FuadXyro', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}}, { quoted: m,ephemeralExpiration: 86400})

  let dev = 'Fuad Xyro'
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${dev};;;\nFN:${dev}\nORG:${dev}\nTITLE:\nitem1.TEL;waid=6283837709331:+62 838-3770-9331\nitem1.X-ABLabel:${dev}\nX-WA-BIZ-DESCRIPTION:${htjava} Don't Spam!!\nX-WA-BIZ-NAME:${dev}\nEND:VCARD`

  await conn.sendMessage(m.chat, { contacts: { displayName: wm, contacts: [{ vcard }] }}, { quoted: fuad })
}

handler.help = ['sewabot', 'premium']
handler.tags = ['info']
handler.command = /^(sewa|sewabot|premium)$/i
handler.private = false

export default handler