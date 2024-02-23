const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys || !m.isGroup) {
        return false
    }

    const chat = global.db.data.chats[m.chat]
    const isGroupLink = linkRegex.exec(m.text)
    let kickMessage = ''

    if (isAdmin) {
        kickMessage = `( ! ) *Tautan Terdeteksi*\nAnda admin grup tidak bisa dikeluarkan dari grup.`
    } else {
        kickMessage = `( ! ) *Tautan Terdeteksi*\nAnda akan dikeluarkan dari grup.`
    }

    if (chat.antiLink && isGroupLink) {
        await this.reply(m.chat, kickMessage, fakes, { mentions: [m.sender] })
        await this.sendMessage(m.chat, { delete: m.key })

        if ((!isBotAdmin && isAdmin) || (isBotAdmin && !isAdmin)) {
            await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            await this.reply(m.chat, kickMessage, fkontak, { mentions: [m.sender] })
            await this.sendMessage(m.chat, { delete: m.key })
        }
    }

    return true
}