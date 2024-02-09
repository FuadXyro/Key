let handler = async (m, { conn, usedPrefix: _p }) => {
    let user = global.db.data.users[m.sender]

    if (user.intro) {
        return conn.reply(m.chat, 'Kamu sudah intro dan tidak bisa intro lagi', m)
    }

    let bonusMoney = getRandom(300000000000)
    let bonusLimit = getRandom(5000)

    user.money += bonusMoney
    user.limit += bonusLimit
    user.lastintro = Date.now()

    let pp = 'https://telegra.ph/file/0ce4a057f40eae861e260.jpg'
let bonusMessage = `Kamu mendapatkan hadiah intro:
Money ${rp.format(bonusMoney)}
Limit ${bonusLimit}`

    await conn.reply(m.chat, bonusMessage, m, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply: { mediaType: 1, mediaUrl: pp, title: `${htki} S A L K E N  K A K ${htka}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true } } })
    user.intro = Date.now()
}

handler.command = /^(༺᭄|♫᭄|༄᭄|⏤͟͟͞͞|☆|⫹⫺)$/i
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