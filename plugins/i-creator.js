import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

let fuadxy = `6283837709331`
 let ig = 'https://instagram.com/fuadxy99'
  let admin = await conn.profilePictureUrl(fuadxy + '@s.whatsapp.net', 'image').catch(_ => hwaifu[1])

const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${author};;;\nFN:${author}\nORG:${author}\nTITLE:\nitem1.TEL;waid=6283837709331:+62 838-3770-9331\nitem1.X-ABLabel:${author}\nX-WA-BIZ-DESCRIPTION:${htjava} ᴛɪᴅᴀᴋ ᴍᴇɴᴇʀɪᴍᴀ sᴀᴠᴇ ᴋᴏɴᴛᴀᴋ.\nX-WA-BIZ-NAME:${author}\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: wm, contacts: [{ vcard }] }}, { quoted: fkontak })
//Text
let fxy = `🔥𝗧𝗵𝗶𝘀 𝗶𝘀 𝗠𝘆 𝗢𝘄𝗻𝗲𝗿 𝗙𝘂𝗮𝗱𝗫𝘆ヅ\n\n     📮 *Note :*\n• *ᴏᴡɴᴇʀ ʏᴀɴɢ ʙᴀɪᴋ ʜᴀᴛɪ!!*\n• ᴏᴡɴᴇʀ ᴛɪᴅᴀᴋ ᴍᴇɴᴇʀɪᴍᴀ sᴀᴠᴇ ᴄᴏɴᴛᴀᴄᴛ!\n• ᴏᴡɴᴇʀ ʙᴇʀʜᴀᴋ ʙʟᴏᴄᴋɪʀ ᴛᴀᴍᴘᴀ ᴀʟᴀsᴀɴ\n• ʙᴇʀʙɪᴄᴀʀᴀʟᴀʜ ʏᴀɴɢ sᴏᴘᴀɴ & ᴛɪᴅᴀᴋ sᴘᴀᴍ\n• ᴏᴡɴᴇʀ ʜᴀɴʏᴀ ᴍᴇʀᴇsᴘᴏɴs ʏᴀɴɢ ʙᴇʀᴋᴀɪᴛᴀɴ ᴅᴇɴɢᴀɴ ʙᴏᴛ\n• Nᴏ ᴛᴇʟᴘ\n• ᴄʜᴀᴛ ɢᴀᴊᴇʟᴀs = ʙʟᴏᴄᴋ\n\n\n❀𝑫𝒂𝒕𝒆 ${new Date().toLocaleString('id-ID', {timeZone: 'Asia/Jakarta' })}\n${namebot} #2021-2023`

await conn.reply(m.chat, fxy, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: admin, title: `D e v e l o p e r`, body: `${namebot}`, thumbnail: { url: admin }, thumbnailUrl: admin, sourceUrl: ig, renderLargerThumbnail: true }}})
}
handler.tags = ['info']
handler.command = /^(owner|own)$/i
export default handler