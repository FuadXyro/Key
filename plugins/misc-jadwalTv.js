import { jadwalTV } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix: _p }) => {
    if (!text) throw 'Input Chanel TV Name!'

    try {
        let res = await jadwalTV(text)
        let txt = res.result.map((v) => `「${v.date.replace('WIB', ' WIB')}」➦  ${v.event}`).join('\n')
        let ch = `\n\t\t 「📺」 Jadwal TV ${res.channel}\t\t\n`

        await conn.reply(m.chat, ch + txt, m, { contextInfo: { mentionedJid: [m.sender] } })
    } catch (error) {
        console.error('Terjadi kesalahan:', error)
        throw `${eror}`
    }
}

handler.alias = ['jtv', 'jadwaltv']
handler.tags = ['misc']
handler.command = /^(jtv|jadwaltv)$/i

export default handler