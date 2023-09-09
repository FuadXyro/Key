//Fixed by Dev ×͜×!!
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

export async function all(m) {
  if (!m.isGroup) return !0
  if (!m.fromMe) return !0
  const groupMetadata = (m.isGroup ? ((this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
  const participants = (m.isGroup ? groupMetadata.participants : []) || []
  const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {}
  const isBotAdmin = bot && bot?.admin || false;
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  console.log("Is Bot?:", m.key.id.startsWith('BAE5'))
  if (chat.antiBot) {
    if (m.key.id.startsWith('BAE5')) {
      await m.reply(`*Bot Lain Terdeteksi*\n\nHusshhh Sana Pergi Dari Grup Ini!!!`).then(async v => {
        await delay(1000)
        if (!isBotAdmin) {
          return m.reply('Bot bukan admin..!');
        } else {
          let kick = await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
          console.log("Terkick:", kick)
          await m.reply('Oke..', v ? v : m)
        }
      })
    }
  }
  return !0
}