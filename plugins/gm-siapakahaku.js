import fetch from 'node-fetch'
import {
    siapakahaku
} from '@bochilteam/scraper'

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
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
        throw false
    }
    const json = await siapakahaku()
    const pp = 'https://telegra.ph/file/89e5fc6e1736b439e46de.jpg'
    let caption = `*${command.toUpperCase()}*
Siapakah aku? ${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsi untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.siapakahaku[id] = [
        await conn.reply(m.chat, caption, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: '乂 S I A P A K A H  A K U', body: '乂 2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}}),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapakahaku/i

export default handler