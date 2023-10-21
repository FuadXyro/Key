let handler = async (m, { conn, text, usedPrefix, command }) => {
const tags = Object.values(global.plugins)
  .flatMap(p => p.help ? p.tags : [])
  .filter(tag => tag != undefined && tag.trim() !== '')
const counts = tags.reduce((c, tag) => (c[tag] = -~c[tag], c), {})
await conn.reply(m.chat, `*[ FRACTION LIST ]*\n\n${Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([tag, count]) => `⭔ *${tag.charAt(0).toUpperCase() + tag.slice(1)}:* ${count} fitur`).join('\n')}\n\n*Total fitur:${Object.values(counts).reduce((a, b) => a + b, 0)} Commands*`, m, adReply)
}
handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = /^(feature|totalfitur)$/i
export default handler