const xpperlimit = 1
const rp = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

let handler = async (m, { conn, command, args }) => {
	let user = global.db.data.users[m.sender]
  let count = command.replace(/^nabung/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.atm == 0) return m.reply('kamu belum mempunyai kartu ATM ( ! )')
  if (user.bank > user.fullatm) return m.reply('Uang Di ATM sudah penuh!')
  if (count > user.fullatm - user.bank) return m.reply('Uangnya nya sudah mencapai batas')
  if (global.db.data.users[m.sender].money >= xpperlimit * count) {
    global.db.data.users[m.sender].money -= xpperlimit * count
    global.db.data.users[m.sender].bank += count
    conn.reply(m.chat, `${m.name} sukses menabung sebesar ${rp.format(count)} 💸`, fkontak)
  } else conn.reply(m.chat, `( ! ) Uang anda tidak mencukupi untuk menabung sebesar ${rp.format(count)} 💸`, m)
}
handler.help = ['nabung <jumlah>']
handler.tags = ['rpg']
handler.command = /^nabung([0-9]+)|nabung|nabungall$/i

export default handler