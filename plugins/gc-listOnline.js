let handler = async (m, { conn }) => {
  try {
    const c = conn.chats[m.chat]
    if (!c || !c.metadata || !c.metadata.participants) return m.reply('Gagal mendapatkan informasi grup.')
   
    const online = Object.entries(conn.chats)
      .filter(([k, v]) => k.endsWith('@s.whatsapp.net') && v.presences && (c.metadata.participants.some(p => k.startsWith(p.id)) || k.includes(k)))
      .sort((a, b) => a[0].localeCompare(b[0], 'id', { sensitivity: 'base' }))
      .map(([k], i) => `*${i + 1}.* @${k.split('@')[0]}`)
      .join('\n')

    let pp = 'https://telegra.ph/file/9f50049ad40262de75168.jpg'
    let info = `${online || 'Tidak ada pengguna online saat ini.'}`

    await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: await conn.parseMention(info), forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: '⌂ L I S T  O N L I N E', body: 'List pengguna online', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
  } catch (e) {
    console.error(e)
    m.reply('Terjadi kesalahan.')
  }
}

handler.help = ['listonline', 'online']
handler.tags = ['group']
handler.command = /^(list)?online$/i
handler.group = true

export default handler