const cooldown = 30 * 60 * 1000

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]

    if (new Date() - user.bonus < cooldown) {
        let remainingTime = new Date(user.bonus + cooldown) - new Date()
        throw `Kamu sudah mengclaim bonus. Mohon tunggu selama *${formatTime(remainingTime)}*`
    }

    let bonusMoney = getRandom(300000)
    let bonusLimit = getRandom(500)

    user.money += bonusMoney
    user.limit += bonusLimit
    user.lastbonus = new Date() * 1

    let pp = 'https://telegra.ph/file/22771bdf4e98ee31b419c.jpg'
    let bonusMessage = `Kamu mendapatkan bonus: Money ${rp.format(bonusMoney)} dan Limit ${bonusLimit}`

    await conn.reply(m.chat, bonusMessage, m, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${htki} B O N U S ${htka}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true }}})
    user.bonus = new Date() * 1
}

handler.help = ['bonus']
handler.tags = ['rpg']
handler.command = /^(bonus)$/i
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