import axios from "axios"

export async function before(m) {
    const regex = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g
    const matches = m.text.trim().match(regex)

    if (!matches) return false

    try {
        const startTime = Date.now()
        const response = await axios.get(`https://api-gptdownloader.vercel.app/download?url=${matches[0]}`)
        const endTime = Date.now()
        const pingMs = endTime - startTime
        const json = response.data
        const info = `🍟 Ping: ${pingMs} ms`
        await m.reply(wait)
        await conn.sendFile(m.chat, json.url[0].url || '', "", info, m)
    } catch (e) {
        console.error(e)
        throw e
    }

    return true
}