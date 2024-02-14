const user = {
    exp: Math.floor(Math.random() * 9999999999) + 1,
    limit: Math.floor(Math.random() * 9999) + 1,
    atm: Math.floor(Math.random() * 99999) + 1,
    money: Math.floor(Math.random() * 999999999999) + 1,
    lastfree: Date.now()
}

const cooldown = 24 * 60 * 60 * 1000

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (args.length == 0) return conn.reply(m.chat, `Harap masukkan kode gift Anda..!!`, m)
    let kodes = args[0] == 'Host' || args[0] == 'FuadXyro' || args[0] == 'Zenith' || args[0] == 'Fall' || args[0] == 'abc_20y'

    if (kodes) {
        if (user.lastfree + cooldown < Date.now()) {
            let pp = 'https://telegra.ph/file/8858c13461f64ecd30ce1.jpg'
            let redeemedMessage = `*SELAMAT!*\n\nKamu telah mendapatkan:\n> ${user.exp} Xp\n> ${user.limit} Limit\n> ${user.atm} Atm\n> ${user.money} Money`
            await conn.reply(m.chat, redeemedMessage, m, {
                mentionedJid: [m.sender],
                contextInfo: {
                    forwardingScore: 9999,
                    isForwarded: true,
                    externalAdReply: {
                        mediaType: 1,
                        mediaUrl: pp,
                        title: `${htka} F R E E  G I F T ${htki}`,
                        body: '🌱┊ RPG WhatsApp Bot',
                        thumbnail: {
                            url: pp
                        },
                        thumbnailUrl: pp,
                        sourceUrl: false,
                        renderLargerThumbnail: true
                    }
                }
            })
            user.lastfree = Date.now()
        } else {
            return m.reply('Anda hanya dapat menggunakan redeem 1 kali dalam 24 jam.')
        }
    } else {
        return m.reply('KODE SALAH!!')
    }
}

handler.help = ['freegift']
handler.tags = ['rpg']
handler.command = /^(freegift)$/i
handler.register = true

export default handler