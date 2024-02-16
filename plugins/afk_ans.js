export async function before(m) {
    this.listAfk = this.listAfk || {}
    let user = global.db.data.users[m.sender]
    
    if (user.afk > -1) {
        const idToRemove = m.sender
        this.listAfk[m.chat] = this.listAfk[m.chat]
            ? this.listAfk[m.chat].filter(u => u.id !== idToRemove)
            : []
        m.reply(`Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''} Selama ${(new Date() - user.afk).toTimeString()}`.trim())
        user.afk = -1
        user.afkReason = ''
    }
    
    const textLower = m.text.toLowerCase()
    const rp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    let mentionedJids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]

    if (/^maaf$/i.test(textLower)) {
        global.db.data.users[m.sender].afk = -1
        m.reply('Anda telah meminta maaf dan terhindar dari denda.')
    }

    if (mentionedJids.length > 0) {
        let dendaMessageSent = false

        for (let jid of mentionedJids) {
            let taggedUser = global.db.data.users[jid]

            if (!taggedUser || taggedUser.afk < 0) continue

            let afkTime = taggedUser.afk
            let reason = taggedUser.afkReason || ''
            let maxDenda = 100000000
            let denda = Math.floor(Math.random() * maxDenda) + 1

            if (!dendaMessageSent) {
                let pesan = `
Anda akan terkena denda ${rp.format(denda)} karena mengetag user yang sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'} selama ${(new Date() - afkTime) / 1000} detik.
• Ketik *maaf* agar terhindar dari denda
• Waktu meminta maaf: 90 detik`
                const response = await m.reply(pesan)
                response.isDendaMessage = true
                dendaMessageSent = true
            }

            const maafResponse = await waitForMaafResponse(m, 90000)

            if (!maafResponse) {
                m.reply('Anda tidak meminta maaf, maka anda terkena denda')
                user.money = (user.money || 0) - denda
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitForMaafResponse(m, timeout) {
    const start = Date.now()
    while (Date.now() - start < timeout) {
        await sleep(1000)
        const user = global.db.data.users[m.sender]
        if (user.afk === -1) return true
    }
    return false
}