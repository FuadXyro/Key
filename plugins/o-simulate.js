let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    let event = args[0]
    if (!event) return await conn.reply(m.chat, `contoh:
${usedPrefix + command} welcome @user
${usedPrefix + command} bye @user
${usedPrefix + command} promote @user
${usedPrefix + command} demote @user`.trim(), m)
    
    let mentions = text.replace(`@${event}`, '').trimStart()
    let who = conn.parseMention(mentions)
    let part = who.length ? who : [m.sender]
    let act = ''

    m.reply(`*Simulating ${event}...*`)

    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            act = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            act = 'remove'
            break
        case 'promote':
            act = 'promote'
            break
        case 'demote':
            act = 'demote'
            break
        default:
            throw new Error('Event tidak valid')
    }

    if (act) {
        return conn.participantsUpdate({
            id: m.chat,
            participants: part,
            action: act
        })
    }
}

handler.help = ['simulate <event> [@mention]']
handler.tags = ['owner']
handler.command = /^simulate$/i

export default handler