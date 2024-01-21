const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys || !m.isGroup) {
        return false
    }

    const chat = global.db.data.chats[m.chat]
    const isGroupLink = linkRegex.test(m.text)
    let kickMessage = ''
    
    if (chat.linkCounter && chat.linkCounter[m.sender] >= 3) {
        kickMessage = `( ! ) *Tautan Terdeteksi*\nJika Anda mengirim lebih dari 3 kali, Anda akan dikeluarkan dari grup.`
    } else {
        kickMessage = isAdmin
            ? `( ! ) *Tautan Terdeteksi*\nAnda admin grup, tidak bisa dikeluarkan dari grup.`
            : `( ! ) *Tautan Terdeteksi*\nAnda akan dikeluarkan dari grup.`

        if (chat.antiLink && isGroupLink) {
            chat.linkCounter[m.sender] = (chat.linkCounter[m.sender] || 0) + 1

            await handleKickAndReply.call(this, m, isAdmin, isBotAdmin, kickMessage)
        }
    }

    return true
}

async function handleKickAndReply(m, isAdmin, isBotAdmin, kickMessage) {
    await this.reply(m.chat, kickMessage, fakes, { mentions: [m.sender] })
    await this.sendMessage(m.chat, { delete: m.key })

    if ((!isBotAdmin && isAdmin) || (isBotAdmin && !isAdmin)) {
        await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        await this.reply(m.chat, kickMessage, fkontak, { mentions: [m.sender] })
        await this.sendMessage(m.chat, { delete: m.key })
    }
}