const rewards = {
    emerald: 5,
    exp: 499999,    
    money: 600000,
    potion: 50,
    iron: 50,
    legendary: 5,
    limit: 50,
}
const cooldown = 24 * 60 * 60 * 1000
let handler = async (m, {
    conn
}) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.login < cooldown) throw `Kamu sudah mengclaim hari ini.. mohon tunggu selama *${((user.login + cooldown) - new Date()).toTimeString()}*`
    let pp = 'https://telegra.ph/file/035518ac5c2281ffca843.jpg'
    let text = ''
    for (let reward of Object.keys(rewards)) {
        if (!(reward in user)) continue
        user[reward] += rewards[reward]
        text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
    }
    await conn.reply(m.chat, text.trim(), m, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${htki} L O G I N ${htka}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true }}})
    user.login = new Date * 1
}
handler.help = ['login']
handler.tags = ['rpg']
handler.command = /^(login)$/i

handler.cooldown = cooldown

export default handler