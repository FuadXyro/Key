import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { text }) => {
  conn.listAfk = conn.listAfk || {}
  try {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date()
    user.afkReason = text
    const username = m.name || m.pushName
    const id = m.sender || m.key.remoteJid

    conn.listAfk[m.chat] = conn.listAfk[m.chat]
      ? conn.listAfk[m.chat].some(user => user.id === id)
        ? conn.listAfk[m.chat]
        : [...conn.listAfk[m.chat], { username, id }]
      : [{ username, id }]

    let thumb = await conn.profilePictureUrl(id, 'image').catch(_ => hwaifu.getRandom())

    if (!user) {
      console.error('User data not found')
      return
    }

    let anunya = `\n${conn.getName(m.sender)} Sedang AFK\nDᴇɴɢᴀɴ Aʟᴀsᴀɴ ⬕ ${text ? ': ' + text : ''}`
    await conn.reply(m.chat, anunya, false, {
      contextInfo: {
        isForwarded: false,
        forwardingScore: 9999,
        externalAdReply: {
          mediaType: 1,
          mediaUrl: thumb,
          title: `Seseorang AFK!!!`,
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