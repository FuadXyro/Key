const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

export async function all(m) {
  if (!m.isGroup || !m.fromMe) return true;

  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];

  // Ensure m.key exists before accessing its properties
  if (!m.key) return true;

  console.log("Is Bot?:", m.key.id.startsWith('BAE5'))

  // If antiBot is not enabled, no need for further processing
  if (!chat.antiBot) return true;

  const groupMetadata = (this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null) || {};
  const participants = groupMetadata.participants || [];
  const bot = participants.find(u => this.decodeJid(u.id) == this.user.jid) || {};
  const isBotAdmin = bot.admin || false;

  if (m.key.id.startsWith('BAE5')) {
    await m.reply(`*Bot Lain Terdeteksi*\n\nHusshhh Sana Pergi Dari Grup Ini!!!`).then(async v => {
      await delay(1000);
      if (!isBotAdmin) {
        return m.reply('Bot bukan admin..!');
      } else {
        let kick = await this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        console.log("Terkick:", kick);
        await m.reply('Oke..', v ? v : m);
      }
    });
  }

  return true;
}