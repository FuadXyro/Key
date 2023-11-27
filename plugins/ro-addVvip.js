import pkg from '@adiwajshing/baileys'
const { MessageType } = pkg

let handler = async (m, { conn, text }) => {
    if (!text) {
        throw 'Siapa yang ingin dijadikan vvip?'
    }

    let who

    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    } else {
        who = m.sender
    }

    const userNumber = who.split('@')[0]

    if (global.mods.includes(userNumber)) {
        throw 'Pengguna tersebut sudah menjadi vvip!'
    }

    global.vvip.push(userNumber)

    conn.reply(m.chat, `Hai, @${userNumber}. Kamu sudah menjadi vvip. Mohon jangan disalahgunakan atau akan dicabut!`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })
}

handler.help = ['addvvip <@user>']
handler.tags = ['developer']
handler.command = /^(add|tambah|\+)vvip$/i
handler.rowner = true

export default handler