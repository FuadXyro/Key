/** JANGAN DIHAPUS KONTOL
  * Update tiktok by FuadXy
  * Github: https://github.com/FuadBoTz-MD
  * WhatsApp: wa.me/6283837709331
**/



import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import got from "got"
import fg from "api-dylux"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    if (!text) return conn.reply(m.chat, "Input query link", m)

    try {
        let Fg = await fg.tiktok(text)
        let FgCap = `*乂 Downloader Tiktok*

*Nickname:* ${Fg.nickname}
*Unique ID:* ${Fg.unique_id}
*Download Count:* ${Fg.download_count}
*Duration:* ${Fg.duration}
*Description:* ${Fg.description}`
        await conn.sendFile(m.chat, Fg.play || Fg.hdplay, "", FgCap, m)
    } catch (e) {
        throw e
    }
}

handler.help = ["tiktok"]
handler.tags = ["downloader"]
handler.command = /^t(iktok|t(dl)?)$/i

export default handler