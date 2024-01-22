const rewards = {
    mythic: getRandom(1000),
    money: getRandom(100000),
    diamond: getRandom(5000),
    exp: getRandom(5000),
    trash: getRandom(5000),
    rock: getRandom(5000),
    wood: getRandom(5000),
    string: getRandom(5000),
}

const cooldown = 60 * 60 * 1000

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]

    if (new Date() - user.mulung < cooldown) {
        let remainingTime = new Date(user.mulung + cooldown) - new Date()
        throw `Kamu sudah mulung hari ini. Mohon tunggu selama *${formatTime(remainingTime)}*`
    }

    let pp = 'https://telegra.ph/file/5232284f137c4dc06ac65.jpg'    

    let text = ''

    for (let reward of Object.keys(rewards)) {
        if (!(reward in user)) continue
        let rewardAmount = getRandom(rewards[reward])
        user[reward] += rewardAmount
        text += `*+${rewardAmount}* ${global.rpg.emoticon(reward)}${reward}\n`
    }

    await conn.reply(m.chat, text.trim(), m, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${htki} M U L U N G ${htka}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true }}})
    user.mulung = new Date() * 1
}

handler.help = ['mulung']
handler.tags = ['rpg']
handler.command = /^(mulung)$/i
handler.register = true
handler.group = true
handler.cooldown = cooldown

export default handler

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