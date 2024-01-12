let { MessageType } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan jumlah money yang akan diberi'
  let who

  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat

  if (!who) throw 'Tag salah satu lah'

  let txt = text.replace('@' + who.split`@`[0], '').trim()

  if (isNaN(txt)) throw 'Hanya angka'

  let rald = parseInt(txt)

  if (rald >= 9999999999) throw 'Anjir lu mau bot overload?'
  else if (rald > 0) {
    let users = global.db.data.users

    if (!users[who]) {
      users[who] = {
        emerald: 0,
      }
    }

    users[who].emerald += rald

    conn.reply(
      m.chat,
      `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${rald}Emerald!`,
      m,
      { mentions: [who] },
      {
        contextInfo: {
          mentionedJid: [who],
        },
      }
    )
  }
}

handler.help = ['sendemerald @user <amount>']
handler.tags = ['developer']
handler.command = /^sendemerald$/
handler.premium = false
handler.rowner = true

export default handler