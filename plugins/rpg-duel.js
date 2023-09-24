let { MessageType } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, args, command }) => {
  try {
    conn.duel = conn.duel || []
    const mentionedJid = m.mentionedJid ? m.mentionedJid[0] : (args[0] ? args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net' : "")
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : (m.fromMe ? conn.user.jid : m.sender))
    const enemy = global.db.data.users[who]
    const user = global.db.data.users[m.sender]
    const count = args[1] && args[1].length > 0 ? Math.min(100, Math.max(parseInt(args[1]), 1)) : 1
    const nama = conn.getName(m.sender)

    const randomaku = `${Math.floor(Math.random() * 101)}`.trim()
    const randomkamu = `${Math.floor(Math.random() * 81)}`.trim()
    const Aku = (randomaku * 1)
    const Kamu = (randomkamu * 1)

    const __timers = (new Date() - user.lastduel)
    const _timers = (300000 - __timers)
    const timers = clockString(_timers)

    if (/duel/.test(command)) {
      if (!who) return m.reply('Tag Yang Ingin Di Ajak Duel!')

      const pler = `@${m.sender.replace(/@.+/, '')} Mengajak Duel ${args[0]}\n\nKetik dya Untuk Terima\nAtau dno Untuk Membatalkan`
      if (new Date() - user.lastduel > 300000) {
        conn.reply(m.chat, pler, m, false, { contextInfo: { mentionedJid } })
      } else {
        conn.reply(m.chat, `Kamu Sudah Berduel Tunggu Hingga *${timers}*`, m)
      }
    }

    if (/dya/.test(command)) {
      const kenal = !who.includes(m.sender)
      if (kenal) throw 'Lah Lu Siapa?\nLu Itu Ga Di Ajak'
      user.lastduel = new Date() * 1

      if (Aku > Kamu) {
        user.money -= 900
        enemy.money += 900
        delete conn.duel[m.sender]
        conn.reply(m.chat, `@${who.split("@")[0]} Menang Gelud\n*Hadiah:*\nRp.900 Buat Beli Gorengan`.trim(), m)
      } else if (Aku < Kamu) {
        user.money += 450
        enemy.money -= 450
        delete conn.duel[m.sender]
        conn.reply(m.chat, `@${who.split("@")[0]} Kalah Gelud\n*Hadiah:*\nRp.450 Mayan Buat Beli Limit`.trim(), m)
      } else {
        user.money += 250
        enemy.money += 250
        delete conn.duel[m.sender]
        conn.reply(m.chat, `@${who.split("@")[0]}\n *Seri*\n Masing Masing Rp.250`.trim(), m)
      }
    }

    if (/dno/.test(command)) {
      const kenal = !who.includes(m.sender)
      if (kenal) return conn.reply(m.chat, `Lah Lu Siapa?\nLu Itu Ga Di Ajak`, m)
      conn.reply(m.chat, `@${who.split("@")[0]} Membatalkan Ajakan Duel`, m)
      delete conn.duel[m.sender]
    }
  } catch (e) {
    return m.reply(`Terjadi kesalahan: ${e}`)
  }
}

handler.help = ['duel']
handler.tags = ['rpg']
handler.command = /^(duel|dya|dno)/i
handler.group = true

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ ms, h, m, s })
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}