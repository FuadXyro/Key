const moneyplus = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^atm/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / moneyplus) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].money >= moneyplus * count) {
    global.db.data.users[m.sender].money -= moneyplus * count
    global.db.data.users[m.sender].bank += count
    let info = `
    -${rp.format(moneyplus * count)} Money
    +${rp.format(count)} ATM
    `
    await conn.reply(m.chat, info, fakes)
  } else conn.reply(m.chat, `Money tidak mencukupi untuk menabung ${rp.format(count)} ATM`, m)
}
handler.help = ['atm <jumlah>', 'atmall']
handler.tags = ['rpg']
handler.command = /^atm([0-9]+)|atm|atmall$/i
handler.exp = 0

export default handler

const rp = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})