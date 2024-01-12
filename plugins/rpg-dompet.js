let handler = async (m, { conn, args }) => {
  if (args[0] == 'reset') {
    let list = Object.entries(global.db.data.users)
    let lim = !args || !args[0] ? 1000 : isNumber(args[0]) ? parseInt(args[0]) : 1000
    lim = Math.max(1, lim)
    list.forEach(([user, data]) => data.limit = lim)
    conn.reply(m.chat, `*Berhasil direset ${lim} / user*`, m)
  } else {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let pp = 'https://telegra.ph/file/65398f84db91fd46417f2.png'
    let limit = who.split('@')[0] == nomorbot ? 'Infinity Limit Left=͟͟͞͞💫' : user.premiumTime >= 1 ? 'Infinity' : `${user.limit}`
    let cap = `
*👤 𝑻𝒂𝒈𝒔 :* @${who.split('@')[0]}
*🌌 𝑳𝒊𝒎𝒊𝒕 :* ${limit}
*💵 𝑴𝒐𝒏𝒆𝒚 :* ${rp.format(user.money)}
*✨ 𝑬𝒙𝒑 :* ${user.exp}`
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
          body: '🌱┊ RPG WhatsApp Bot',
          thumbnail: { url: pp },
          thumbnailUrl: pp,
          sourceUrl: false,
          renderLargerThumbnail: true,
        },
      },
    })
  }
}

handler.help = ['dompet', 'limit']
handler.tags = ['rpg']
handler.command = /^(dompet|dp)$/i

const rp = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}

export default handler