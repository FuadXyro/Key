const free = 200000
const prem = 400000
const limitfree = 200
const limitprem = 400
const moneyfree = 200000
const moneyprem = 8000000
const rp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })

let handler = async (m, { isPrems }) => {
    let time = global.db.data.users[m.sender].lastyearly + 31536000000
    if (new Date() - global.db.data.users[m.sender].lastyearly < 31536000000) throw `Anda sudah mengklaim, klaim tahunan ini\ntunggu selama ${msToTime(time - new Date())} lagi`

    global.db.data.users[m.sender].exp += isPrems ? prem : free
    global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree
    global.db.data.users[m.sender].limit += isPrems ? limitprem : limitfree
    let pp = 'https://telegra.ph/file/f3df4ca49eb4450a2781f.jpg'
    let txt = `Selamat kamu mendapatkan:
${isPrems ? prem : free} Exp
${rp.format(isPrems ? moneyprem : moneyfree)} Money
${isPrems ? limitprem : limitfree} Limit`
    await conn.reply(m.chat, txt, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${namebot}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}})
  
    global.db.data.users[m.sender].lastyearly = new Date() * 1
}

handler.help = ['yearly']
handler.tags = ['rpg']
handler.command = /^(yearly)$/i
handler.limit = true
handler.fail = null

export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        yearly = Math.floor((duration / (1000 * 60 * 60 * 24)) % 720)

    yearly = (yearly < 10) ? "0" + yearly : yearly
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return yearly + " hari " + hours + " jam " + minutes + " menit"
}