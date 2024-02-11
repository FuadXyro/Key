export async function before(m) {
    let senderUser = global.db.data.users[m.sender]

    if (senderUser.afk > -1) {
        m.reply(`Kamu berhenti AFK${senderUser.afkReason ? ' setelah ' + senderUser.afkReason : ''} Selama ${(new Date() - senderUser.afk).toTimeString()}`.trim())
        senderUser.afk = -1
        senderUser.afkReason = ''
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
Anda akan terkena denda ${rp.format(denda)} Karena mengetag user yang sedang AFK
 ${reason ? 'Dengan alasan ' + reason : 'Tanpa alasan'} Selama ${(new Date() - afkTime).toTimeString()}
• Ketik *maaf* Agar Terhindar dari denda
• Waktu meminta maaf: 90 Detik`
const response = await m.reply(pesan)
response.isDendaMessage = true
dendaMessageSent = true
            }
const maafResponse = await waitForMaafResponse(m, 90000)
            if (!maafResponse) {
                m.reply('Anda tidak meminta maaf, maka anda terkena denda')
                senderUser.money = (senderUser.money || 0) - denda
            }
        }
    }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

async function waitForMaafResponse(m, timeout) {
    const start = Date.now()
    while (Date.now() - start < timeout) {
        await sleep(1000)
        const senderUser = global.db.data.users[m.sender]
        if (senderUser.afk === -1) return true
    }
    return false
}