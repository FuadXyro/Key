import pkg from '@adiwajshing/baileys'
const { MessageType } = pkg

let handler = async (m, { conn, text }) => {
  try {
    let user = global.db.data.users[m.sender]
    if (new Date() - user.lastpractice < 3600000) {
      conn.reply(m.chat, '⏰ Anda hanya dapat berlatih sekali dalam 1 jam.', m)
      return
    }
    user.lastpractice = new Date()    
    let userAttack = Math.floor(Math.random() * 100) + 50 
    let healthIncrease = userAttack * 3
    user.health += healthIncrease
    
    let pp = 'https://telegra.ph/file/33d2200f8f6cde38be0f0.jpg'
    let message = `🏋️ Anda sedang berlatih dan mendapatkan peningkatan kesehatan:\n\n`
    message += `❤️ Kesehatan pengguna sekarang: ${user.health}\n`
    message += `⚔️ Serangan yang dihasilkan: ${userAttack}\n`
    message += `🔄 Anda dapat berlatih lagi dalam 1 jam.\n`
   
    await conn.reply(m.chat, message, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${namebot}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}})
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, 'Error', m)
  }
}

handler.help = ['berlatih']
handler.tags = ['rpg']
handler.command = /^berlatih$/i
handler.limit = true
handler.group = true
handler.fail = null

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}