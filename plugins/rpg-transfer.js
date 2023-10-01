const items = [
    'money', 'bank', 'potion', 'trash', 'wood',
    'rock', 'string', 'petFood', 'emerald',
    'diamond', 'gold', 'iron', 'common',
    'uncommon', 'mythic', 'legendary', 'pet',
]

let confirmation = {}

async function handler(m, { conn, args, usedPrefix, command }) {
    if (confirmation[m.sender]) return m.reply('Kamu sedang melakukan transfer!')

    let user = global.db.data.users[m.sender]
    const item = items.filter(v => v in user && typeof user[v] == 'number')
    
    const lol = `Use format ${usedPrefix}${command} [type] [value] [number]
example ${usedPrefix}${command} money 9999 @user

📍 Transferable items
${item.map(v => `${v}`).join('\n')}
`.trim()

    const type = (args[0] || '').toLowerCase()
    if (!item.includes(type)) return m.reply(lol)

    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!who) return m.reply('Tag salah satu, atau ketik Nomernya!!')
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
    if (user[type] * 1 < count) return m.reply(`Your ${type} is less ${count - user[type]}`)

    const pp = 'https://telegra.ph/file/dd6b5ec6e6ce08f2d1c4e.jpg'
    const txt = `Apakah Anda yakin ingin melakukan transfer\n ✅ (Yes) ❌ (No)\n\n`
    const confirm = `
*=======[ TRANSFER ]=======*
*🗂️ Type:* ${type}
*🧮 Count:* ${count} 
*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}

${txt}
⏰ Timeout *60* detik
`.trim()

    const { key } = await conn.reply(m.chat, confirm, m, { mentionedJid: [who], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `Hai Kak ${m.name}`, body: null, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type,
        count,
        key,
        pesan: conn,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, { delete: key })
            delete confirmation[m.sender]
        }, 60 * 1000),
    }
}

handler.before = async m => {
    if (!m.quoted) return
    if (!(m.sender in confirmation)) return

    const { timeout, sender, message, to, type, count, key, pesan } = confirmation[m.sender]
    if (m.id === message.id) return

    const user = global.db.data.users[sender]
    const _user = global.db.data.users[to]

    const textLower = m.text.toLowerCase()
    if (/yes|✅/i.test(textLower)) {
        const previous = user[type] * 1
        const _previous = _user[type] * 1
        
        user[type] -= count * 1
        _user[type] += count * 1

        if (previous > user[type] * 1 && _previous < _user[type] * 1) {
            m.reply(`Transfer successful!`)
        } else {
            user[type] = previous
            _user[type] = _previous
            m.reply(`Transfer failed.`)
        }

        pesan.sendMessage(m.chat, { delete: key })
        clearTimeout(timeout)
        delete confirmation[sender]
    } else if (/no|✖️/i.test(textLower)) {
        pesan.sendMessage(m.chat, { delete: key })
        clearTimeout(timeout)
        delete confirmation[sender]
        return m.reply('Transfer rejected.')
    }
}

handler.help = ['transfer', 'tf'].map(v => v + ' [type] [jumlah] [@tag]')
handler.tags = ['rpg']
handler.command = /^(transfer|tf)$/i
handler.disabled = false

export default handler

function isNumber(x) {
    return !isNaN(x)
}