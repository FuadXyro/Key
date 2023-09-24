import similarity from "similarity"
import { createHash } from "crypto"
import fetch from "node-fetch"

const threshold = 0.72

export async function before(m) {
  let id = m.chat
  let user = global.db.data.users[m.sender]
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
  
  if (!m.quoted) return true
  
  this.emailotp = this.emailotp ? this.emailotp : {}
  
  if (!(id in this.emailotp)) {
    return
  }
  
  if (m.quoted.id == this.emailotp[id][0].id) {
    if (m.quoted.sender == this.emailotp[id][0].sender) {
      let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
      if (isSurrender) {
        clearTimeout(this.emailotp[id][3])
        delete this.emailotp[id]
        return this.reply(m.chat, "*OTP Dihapus!*", m)
      }
      
      let json = JSON.parse(JSON.stringify(this.emailotp[id][1]))
      if (m.text.toLowerCase() == json.code.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += this.emailotp[id][2]
        
        user.name = m.name.trim()
        user.age = 20
        user.regTime = +new Date()
        user.registered = true
        let sn = createHash("md5").update(m.sender).digest("hex")
        /* ® FuadXy */
        let freegift = '*Selamat!🥳*\nKamu mendapatkan _kode gift_ gratis karna telah mendaftar dalam database FuadBoTz.\nKode dapat di claim setiap hari...\nCara claim kode sbagai berikut: *.freegift <code>*\n\nCode: fxy01a4bk'

        let pp = 'https://telegra.ph/file/b497b05a8c5df726fa7b9.jpg'
        let cap = `
━━━ 「 *Successful Registration* 」━━
     
╭━━「 *ᴜsᴇʀs* 」
│▸ *sᴛᴀᴛᴜs:* ✓ sᴜᴄᴄᴇssғᴜʟ
│▸ *ɴᴀᴍᴇ:* ${m.name}
│▸ *ᴀɢᴇ:* ${user.age} ʏᴇᴀʀs
│▸ *sɴ:* ${sn}
╰═┅═━––––––๑


http://bīt.ly/ᯤ

ᴅᴀᴛᴀ ᴜsᴇʀ ʏᴀɴɢ ᴛᴇʀsɪᴍᴘᴀɴ ᴅɪᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ, ᴅɪᴊᴀᴍɪɴ ᴀᴍᴀɴ ᴛᴀɴᴘᴀ ᴛᴇʀsʜᴀʀᴇ (. ❛ ᴗ ❛.)`
        await conn.reply(m.chat, cap, m, { contextInfo: { mentionedJid: [who], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: `${m.name}`, body: `sᴇʟᴀᴍᴀᴛ +${this.emailotp[id][2]} xᴘ`,thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
        clearTimeout(this.emailotp[id][3])
        delete this.emailotp[id]
      } else if (similarity(m.text.toLowerCase(), json.code.toLowerCase().trim()) >= threshold) {
        this.reply(m.chat, "*OTP hampir sama!*", m)
      } else {
        this.reply(m.chat, "*OTP salah!*", m)
      }
    } else {
      this.reply(m.chat, "*Bukan request OTP anda!*", m)
    }
  }
  
  return true
}

export const exp = 0