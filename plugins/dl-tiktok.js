import { tiktok } from '../lib/fuad.js'

let handler = async(m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`Input Url`)
    if (!/^http(s)?:\/\/(www|v(t|m)).tiktok.com\/[-a-zA-Z0-9@:%._+~#=]/i.test(args[0])) return m.reply('Invalid urls')
    await m.reply('_In Progress Please Wait..._')
    let { nickname, duration, description, play, music } = await tiktok(args[0])
    let caption = `
Nickname : ${nickname}
Duration : ${duration}

${description}
`.trim()
    let video = await conn.sendFile(m.chat, play, false, caption, m)
    await conn.sendFile(m.chat, music, false, false, video, false, { mimetype: 'audio/mpeg' })
 }
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tiktok|tiktok(mp3|mp4|video|audio)|tt|tt(mp3|mp4|video|audio))$/i
handler.limit = true
export default handler