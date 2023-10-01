import { join } from 'path'
import { promises } from 'fs'

let handler = async (m, { args, usedPrefix, __dirname, conn }) => {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let user = global.db.data.users[m.sender]
    if (user.health >= 100) return conn.reply(m.chat, `
Your ❤️health is full!
`.trim())

    let heal = 'https://telegra.ph/file/d4ee07395e533c2a86253.jpg'
    let fullheal = 'https://telegra.ph/file/9afad38879bc169f8e09b.jpg'

    const healingPower = 40 + (user.cat * 4)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / healingPower)))) * 1

    if (user.potion < count) return conn.reply(m.chat, `
*–『 INSUFFICIENT POTION 』–*
ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ʙᴜʏ ${count - user.potion} ᴍᴏʀᴇ 🥤ᴩᴏᴛɪᴏɴ ᴛᴏ ʜᴇᴀʟ.
ʏᴏᴜ'ᴠᴇ ${user.potion} 🥤ᴩᴏᴛɪᴏɴ ɪɴ ʙᴀɢ.
⛊━─┈────────┈─━⛊
💁🏻‍♂ ᴛɪᴩ :
'ʙᴜʏ🥤ᴩᴏᴛɪᴏɴ' | 'ᴀsᴋ ᴛᴏ ᴀʟʟ`, m)

    user.potion -= count * 1
    user.health += healingPower * count

    let text = `*━┈━┈━『 FULL HEALTH 』━┈━┈━*
sᴜᴄᴄᴇssғᴜʟʟʏ ${count} 🥤ᴩᴏᴛɪᴏɴ ᴜsᴇ ᴛᴏ ʀᴇᴄᴏᴠᴇʀ ʜᴇᴀʟᴛʜ.`

    conn.reply(m.chat, text, m, {
        mentionedJid: [m.sender],
        contextInfo: {
            forwardingScore: 9999,
            isForwarded: true,
            externalAdReply: {
                mediaType: 1,
                mediaUrl: fullheal,
                title: `Hai kak ${m.sender}`,
                thumbnail: {
                    url: fullheal
                },
                renderLargerThumbnail: true
            }
        }
    })
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal)$/i


export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}