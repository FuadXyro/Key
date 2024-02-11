import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { text }) => {
  try {
    let name = m.pushName || conn.getName(m.sender)
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[m.sender]

    let thumb = await conn.profilePictureUrl(who, 'image').catch(error => {
      console.error('Error getting profile picture:', error)
      return hwaifu.getRandom()
    })

    if (!user) {
      console.error('User data not found')
      return
    }

    user.afk = +new Date
    user.afkReason = text

    let anunya = `\n${conn.getName(m.sender)} Sedang AFK\nDᴇɴɢᴀɴ Aʟᴀsᴀɴ ⬕ ${text ? ': ' + text : ''}`
    await conn.reply(m.chat, anunya, false, {
      contextInfo: {
        isForwarded: false,
        forwardingScore: 9999,
        externalAdReply: {
          mediaType: 1,
          mediaUrl: thumb,
          title: `Seseorang AFK!`,
          thumbnail: { url: thumb },
          thumbnailUrl: thumb,
          renderLargerThumbnail: true
        }
      }
    })
  } catch (error) {
    console.error('Error in AFK handler:', error)
  }
}

handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler