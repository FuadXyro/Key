const delay = 1000

let handler = async (m, { conn, text, usedPrefix }) => {
  try {
    if (!m.isGroup) return
    if (!global.db.data.chats[m.chat].game) {
      return conn.reply(
        m.chat,
        "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game",
        fkontak
      )
    }

    const user = global.db.data.users[m.sender]
    if (!user) throw 'Anda tidak terdaftar di database'

    const betAmount = parseInt(text)
    if (isNaN(betAmount) || betAmount <= 0) {
      throw `Example: ${usedPrefix}spin 1000`
    }

    if (user.money < betAmount) throw '🐱 Money Anda tidak mencukupi'

    const result = Math.random() >= 0.5
    const wonAmount = result ? Math.ceil(betAmount * 1.31919) : -betAmount
    user.money += wonAmount

    if (user.lastSpin && new Date() - user.lastSpin < delay) {
      const time = (user.lastSpin + delay - new Date()) / 1000
      throw `🐱 Harap tunggu ${time.toFixed(1)} detik sebelum melakukan spin berikutnya`
    }
    user.lastSpin = new Date()

    const pp = 'https://telegra.ph/file/b8b4041ce176a2e32ab0a.jpg'

    let caption = `•  S P I N  -  R E S U L T\n\n`
    caption += `- ${betAmount.toLocaleString()}\n`
    caption += result ? `+ ${wonAmount.toLocaleString()}\n\n` : `\n\n`
    caption += `• Total : ${user.money.toLocaleString()} Money`

    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `${namebot}`,
          body: "Ini adalah hasil dari spin Anda",
          thumbnailUrl: pp,
          sourceUrl: null,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
}

handler.help = ['spin']
handler.tags = ['game']
handler.command = /^(spin)$/i

export default handler