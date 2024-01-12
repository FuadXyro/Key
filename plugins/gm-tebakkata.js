import {
    tebakkata
} from '@bochilteam/scraper'
let timeout = 120000
let poin = 4999
let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
if (!global.db.data.chats[m.chat].game) {
      return conn.reply(m.chat, "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game", fkontak )}
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    const json = await tebakkata()
    const pp = 'https://telegra.ph/file/ebabbfbb65bc1f3b07352.jpg'
    let caption = `*${command.toUpperCase()}*
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hkat untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.tebakkata[id] = [
        await conn.reply(m.chat, caption, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: '乂 T E B A K  K A T A', body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}}),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i

export default handler