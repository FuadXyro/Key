import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
     if (!text) throw `Masukan nama nabi\nExample: ${usedPrefix + command} adam`
     let pp = 'https://telegra.ph/file/1b313f53ba2178fe73847.jpg'
     let url = await fetch(`https://raw.githubusercontent.com/FuadXyro/Zenith/main/kisahNabi/${text}.json`)
     let kisah = await url.json()
     let hasil = ` Nabi : ${kisah.name}\nTanggal Lahir : ${kisah.thn_kelahiran}\nTempat Lahir : ${kisah.tmp}\nUsia : ${kisah.usia}\nKisah : ${kisah.description}`
     await conn.reply(m.chat, hasil, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: '乂 Kisah Nabi', body: `${text}`, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
     }
handler.help = ['kisahnabi <name>']
handler.tags = ['islamic']
handler.command = /^kisahnabi$/i
handler.register = false
handler.limit = true

export default handler