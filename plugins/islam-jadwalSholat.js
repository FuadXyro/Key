import { jadwalsholat } from '@bochilteam/scraper'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} sampang`
    let pp = 'https://telegra.ph/file/f9f4edee92151c09cbf44.jpg'
    const res = await jadwalsholat(text)
    let txt = `乂 *J A D W A L - S H O L A T*\n\n`
      txt += `*◉ Area: ${text}*\n\n`
      txt += `${Object.entries(res.today).map(([name, data]) => ` ◦ *Jadwal ${name}:* ${data}`).join('\n').trim()}
`.trim()
await conn.reply(m.chat, txt, m, { mentions: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${namebot}`, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
}
handler.help = ['salat <daerah>']
handler.tags = ['islamic']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

export default handler