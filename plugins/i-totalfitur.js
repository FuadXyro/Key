let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const tags = Object.values(global.plugins)
      .flatMap(p => p.help ? p.tags : [])
      .filter(tag => tag != undefined && tag.trim() !== '')

    const counts = tags.reduce((c, tag) => {
      c[tag] = (c[tag] || 0) + 1
      return c
    }, {})

    const tagList = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => `⭔ ${(tag.charAt(0).toUpperCase() + tag.slice(1)).padEnd(13)} - ${count.toString().padStart(3)}`)
      .join('\n')

    const totalCommands = Object.values(counts).reduce((a, b) => a + b, 0)
    const responseText = "```" + `${tagList}\n` + "```"

    let pp = 'https://telegra.ph/file/950e9059d9d32f6d411d7.jpg'
   
    await conn.reply(m.chat, `*[ FEATURE LIST ]*\n\n${responseText}\n\n*Total fitur: ${totalCommands} Commands*`, fkontak, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: `${namebot}`, body: `${author}`, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
    // ( -_- )
  } catch (error) {
    console.error(error)
    await conn.reply(m.chat, eror, m, adReply)
  }
}

handler.help = ['totalfitur']
handler.tags = ['main', 'info']
handler.command = /^(feature|totalfitur)$/i
export default handler