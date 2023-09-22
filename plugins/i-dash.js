let handler = async (m, { conn }) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  let handlers = stats.slice(0, 100).map(({ name, total }) => {
    return `*Command*: *${name}*\n• *Global HIT*: ${total}`
  }).join('\n\n')

  conn.sendMessage(m.chat, {
    text: handlers,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        thumbnailUrl: hwaifu,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.command = handler.help = ['dashboard', 'dash', 'views']
handler.tags = ['info']
handler.register = true
handler.limit = true

export default handler