let handler = async (m, { conn, args }) => {
  if (args[0] == 'reset') {
    let list = Object.entries(global.db.data.users)
    let lim = !args || !args[0] ? 1000 : isNumber(args[0]) ? parseInt(args[0]) : 1000
    lim = Math.max(1, lim)
    list.map(([user, data], i) => (Number(data.limit = lim)))
    conn.reply(m.chat, `*berhasil direset ${lim} / user*`, m)
  } else {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let pp = 'https://telegra.ph/file/d1c39e48bc6c4af28d86c.jpg'
    let cap = `
*👤 𝑻𝒂𝒈𝒔 :* @${who.split(`@`)[0]}
*🌌 𝑳𝒊𝒎𝒊𝒕 :* ${user.limit}
*💵 𝑴𝒐𝒏𝒆𝒚 :* ${user.money}
*✨ 𝑬𝒙𝒑 :* ${user.exp}

乂 Regards By FuadXy
`
    await conn.sendPresenceUpdate('composing', m.chat)
    await conn.reply(m.chat, cap, m, {
      contextInfo: {
        mentionedJid: [who],
        forwardingScore: 9999,
        isForwarded: true,
        externalAdReply: {
          mediaType: 1,
          mediaUrl: pp,
          title: ']=======❏ Dompet ❏=======[',
          thumbnail: { url: pp },
          thumbnailUrl: pp,
          sourceUrl: false,
          renderLargerThumbnail: true,
        },
      },
    })
  }
}

handler.help = ["dompet"]
handler.tags = ["rpg"]
handler.command = /^(dompet|dp)$/i

export default handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}