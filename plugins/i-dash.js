let handler = async (m, { conn }) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  let teks = stats.slice(0, 100).map(({ name, total }) => {
    return `*Command*: *.${name}*\n• *Global HIT*: ${total}`
  }).join('\n\n')

  let pp = 'https://telegra.ph/file/c11b355795e01444b5bf2.jpg'

  await conn.reply(m.chat, teks, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: '乂 DASHBOARD', body: `${namebot}`, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
}

handler.command = handler.help = ['dashboard', 'dash', 'views']
handler.tags = ['info']
handler.register = true
handler.limit = true

export default handler