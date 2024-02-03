const { MessageType } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan jumlah money yang akan diberi'
    let who

    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'

    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (isNaN(txt)) throw 'Hanya angka'

    let pp = 'https://telegra.ph/file/4d7ee3d7b468c7cc7e9e4.jpg'
    let mny = countSupport(txt)
    if (mny > 0) { 
        let users = global.db.data.users
        if (!users[who]) { 
            users[who] = { money: 0 } 
        }
        users[who].money += mny
        await conn.reply(m.chat, `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${formatMoney(mny)} Money!`, m, { 
            contextInfo: { 
                mentionedJid: [who], 
                forwardingScore: 9999, 
                isForwarded: true, 
                externalAdReply: { 
                    mediaType: 1,
                    mediaUrl: pp, 
                    title: `${namebot}`, 
                    body: '#2021-2024', 
                    thumbnail: { url: pp }, 
                    thumbnailUrl: pp, 
                    sourceUrl: false, 
                    renderLargerThumbnail: true 
                }
            }
        })
    }
}

handler.help = ['sendmoney @user <amount>']
handler.tags = ['developer']
handler.command = /^sendmoney$/i
handler.premium = false
handler.rowner = true

export default handler

function countSupport(txt) {
    let mny = parseInt(txt)
    if (txt.toLowerCase().endsWith('k')) {
        mny *= 1000
    } else if (txt.toLowerCase().endsWith('m')) {
        mny *= 1000000
    } else if (txt.toLowerCase().endsWith('t')) {
        mny *= 1000000000000
    }
    return mny
}

function formatMoney(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
}