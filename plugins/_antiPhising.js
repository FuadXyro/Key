export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true

    if (!m.isGroup) return false

    let chatData = global.db.data.chats[m.chat]
    let botSettings = global.db.data.settings[this.user.jid] || {}

    let participantToRemove = m.key.participant
    let messageId = m.key.id
    let phishingRegex = /(n_Followers|bit.ly|xxnx|50gb|mediaflare|okep_|kartel|50gb|805.000|[ssimontok])/i
    
    let isPhishingOn = phishingRegex.exec(m.text)

    if (chatData.antiPhishing && isPhishingOn && !m.fromMe) {
        await this.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participantToRemove
            }
        })
        

        await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        await this.reply(m.chat, `Link Phishing Detected ( ! )\nThe message will be automatically deleted by the bot.`, m)

        if (isBotAdmin && botSettings.restrict) {
            await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            return m.reply('')
        } else if (!botSettings.restrict) {
            return m.reply('Maybe they are an admin!')
        }
    }

    return true
}