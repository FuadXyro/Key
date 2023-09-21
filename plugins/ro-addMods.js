import pkg from '@adiwajshing/baileys'
const { MessageType } = pkg

let handler = async (m, { conn, text }) => {
    if (!text) {
        throw 'Siapa yang ingin dijadikan Moderator Bot?'
    }

    let who

    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    } else {
        who = m.sender
    }

    const userNumber = who.split('@')[0]

    if (global.mods.includes(userNumber)) {
        throw 'Pengguna tersebut sudah menjadi Moderator!'
    }

    global.mods.push(userNumber)

    conn.reply(m.chat, `Hai, @${userNumber}. Kamu sudah menjadi Moderator. Mohon jangan disalahgunakan atau akan dicabut!`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })
}

handler.help = ['addmods <@user>']
handler.tags = ['developer']
handler.command = /^(add|tambah|\+)mods$/i
handler.rowner = true

export default handler