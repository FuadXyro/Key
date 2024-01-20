import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    if (!text) return conn.reply(m.chat, "Input query link", m)

    try {
        const response = await fetch(`https://api-gptdownloader.vercel.app/download?url=${text}`)

        if (!response.headers.get('content-type').includes('application/json')) {
            return conn.reply(m.chat, 'Invalid response format. Please check the link.', m)
        }

        const json = await response.json()

        let Fuad = `*乂 Tiktok Downloader*
        ${json.caption}`
        
        await conn.sendFile(m.chat, json.url[1].url || '', "", Fuad, m)
    } catch (e) {
        throw e
    }
}

handler.help = ["tiktok"]
handler.tags = ["downloader"]
handler.command = /^t(iktok|t(dl)?)$/i

export default handler