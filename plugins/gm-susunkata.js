import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
if (!m.isGroup) return
    if (!global.db.data.chats[m.chat].game) {
      return conn.reply(m.chat, "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game", fkontak )}

    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    const pp = 'https://telegra.ph/file/125fbf682939b908ce794.jpg'
    let caption = `*${command.toUpperCase()}*
  ${json.soal}
  ${json.tipe}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsus untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.susunkata[id] = [
        await conn.reply(m.chat, caption, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: '乂 S U S U N  K A T A', body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}}),
        json, poin,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i

export default handler