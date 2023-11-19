import moment from 'moment-timezone'

let handler = async (m, { conn,isOwner, isROwner, text }) => {
//━━━━━━━━[ TIMER ]━━━━━━━━//
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    //batas
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    let pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw 'Imput text!'
    m.reply(`ぞ 𝚂𝚎𝚍𝚊𝚗𝚐 𝙼𝚎𝚗𝚐𝚒𝚛𝚒𝚖 𝙿𝚎𝚜𝚊𝚗 𝙱𝚛𝚘𝚊𝚍𝚌𝚊𝚜𝚝 𝙺𝚎 ${anu.length} 𝙶𝚛𝚘𝚞𝚙𝚜, 𝚆𝚊𝚔𝚝𝚞 𝚂𝚎𝚕𝚎𝚜𝚊𝚒 ${anu.length * 0.5} 𝚍𝚎𝚝𝚒𝚔`)
    let bcbg = 'https://telegra.ph/file/f7d7c05945be0a68e0503.jpg'
    let gc = `${sgc}`
    for (let i of anu) {
  conn.sendMessage(i, {
text: `${pesan}`,
contextInfo: {
externalAdReply: {
title: `━━━━━▢ *BROADCAST* ▢━━━━━`,
body: '#2021-2023',
thumbnailUrl: bcbg,
sourceUrl: gc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m}) 
    }
  m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc <teks>']
handler.tags = ['owner']
handler.command = /^(broadcastgc|bcgc)$/i

handler.owner = true
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default handler