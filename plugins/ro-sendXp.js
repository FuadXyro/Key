let { MessageType } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan jumlah exp yang akan diberi'
  let who

  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat

  if (!who) throw 'Tag salah satu lah'

  let txt = text.replace('@' + who.split`@`[0], '').trim()

  if (isNaN(txt)) throw 'Hanya angka'

  let xp = parseInt(txt)

  if (xp >= 9999999999) throw 'Anjir lu mau bot overload?'
  else if (xp > 0) {
    let users = global.db.data.users

    if (!users[who]) {
      users[who] = {
        exp: 0,
      }
    }

    users[who].exp += xp

    conn.reply(
      m.chat,
      `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${xp}XP!`,
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

handler.help = ['sendxp @user <amount>']
handler.tags = ['developer']
handler.command = /^sendxp$/
handler.premium = false
handler.rowner = true

export default handler