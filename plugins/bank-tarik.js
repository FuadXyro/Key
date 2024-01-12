const xpperlimit = 1
const rp = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

let handler = async (m, { conn, command, args }) => {
  let user = global.db.data.users[m.sender]
  let pp = 'https://telegra.ph/file/5dd4cb2f23d4c79a99090.jpg'
  let count = command.replace(/^tarik/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)

  if (user.atm == 0) return m.reply('Kamu belum memiliki kartu ATM ( ! )')

  if (global.db.data.users[m.sender].bank >= xpperlimit * count) {
    global.db.data.users[m.sender].bank -= xpperlimit * count
    global.db.data.users[m.sender].money += count
    await conn.reply(m.chat, `${m.name} sukses menarik uang sebesar ${rp.format(count)} 💸\n\nNote ( ! ) : Jika Menemukan Bug/error harap hubungi owner, dengan mengetik *.owner*`, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${namebot}`, body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}})
  } else {
    conn.reply(m.chat, `( ! ) Uang di bank anda tidak mencukupi untuk ditarik sebesar  ${rp.format(count)} 💸`, m)
  }
}

handler.help = ['tarik <jumlah>']
handler.tags = ['rpg']
handler.command = /^tarik([0-9]+)|tarik|tarikall$/i

export default handler