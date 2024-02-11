const cooldown = 12 * 3600000

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]

    if (new Date() - user.hadiah < cooldown) {
        let remainingTime = new Date(user.hadiah + cooldown) - new Date()
        throw `Kamu sudah mengclaim hadiah. Mohon tunggu selama *${formatTime(remainingTime)}*`
    }

    let bonusCrystal = getRandom(1193292)
    let bonusMoney = getRandom(30000000) // Perbaikan penulisan jumlah bonusMoney
    let bonusLimit = getRandom(5000)
    let bonusJoinLimit = getRandom(20)

    user.money += bonusMoney
    user.darkcrystal += bonusCrystal // Perbaikan penulisan 'darkcrystal'
    user.limit += bonusLimit
    user.joinlimit += bonusJoinLimit
    user.lastbonus = new Date() * 1

    let pp = 'https://telegra.ph/file/48f0627fda12762213502.jpg'
    let bonusMessage = `
Kamu mendapatkan bonus Hadiah:
> *DarkCrystal:* ${bonusCrystal}
> *Money:* ${rp.format(bonusMoney)}
> *Join Limit:* ${bonusJoinLimit}
> *Limit:* ${bonusLimit}
    
    `

    await conn.reply(m.chat, bonusMessage, m, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${htki} H A D I A H ${htka}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true }}})
    user.hadiah = new Date() * 1
}

handler.help = ['hadiah']
handler.tags = ['rpg']
handler.command = /^(hadiah)$/i
handler.cooldown = cooldown
handler.group = true

export default handler

const rp = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

function getRandom(max) {
    return Math.floor(Math.random() * (max + 1))
}

function formatTime(ms) {
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    seconds %= 60
    minutes %= 60

    return `${hours} jam ${minutes} menit ${seconds} detik`
}