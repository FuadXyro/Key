import axios from 'axios'
import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} mabar`
    let res = await carigroup(text, 'name')
    if (!res.length) throw 'Group tidak ditemukan!'
    let teks = res.map(res => res.subject + '\n' + res.link).join('\n────────────\n')
    let image = 'https://telegra.ph/file/f5ec51bac808f543ef1d7.png'
 
    let kled = 'https://telegra.ph/file/6b88b117cec3f45b3571f.jpg'
    await conn.reply(m.chat, teks, fkontak, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply: { mediaType: 1, mediaUrl: kled, title: `Hai Kak ${m.name}`, thumbnail: { url: kled }, thumbnailUrl: kled, renderLargerThumbnail: true } } })
}
handler.help = ['carigrup <pencarian>']
handler.tags = ['search']

handler.command = /^carig(ro?up|c)/i
handler.register = true
export default handler

async function carigroup(search, searchby = 'name') {
    let { data } = await axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php', {
        params: {
            search: encodeURIComponent(search),
            searchby,
        },
    })
    let $ = cheerio.load(data)
    let results = []
    $('#content > div.entry.clearfix > div.wa-chat').each(function (index, element) {
        let subject = $(this).find('div > div.wa-chat-title-container > a > div > div').text().trim()
        let link = $(this).find('div > div.wa-chat-message > a').attr('href').trim()
        results.push({
            subject,
            link
        })
    })
    return results
}