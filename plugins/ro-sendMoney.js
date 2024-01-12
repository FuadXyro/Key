let { MessageType } = (await import('@adiwajshing/baileys')).default;

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan jumlah money yang akan diberi';
  let who;

  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw 'Tag salah satu lah';

  let txt = text.replace('@' + who.split`@`[0], '').trim();

  if (isNaN(txt)) throw 'Hanya angka';

  let mny = parseInt(txt);

  if (mny > 0) {
    let users = global.db.data.users;

    if (!users[who]) {
      users[who] = {
        money: 0,
      };
    }

    users[who].money += mny;

    conn.reply(
      m.chat,
      `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${mny} Money!`,
      m,
      { mentions: [who] },
      {
        contextInfo: {
          mentionedJid: [who],
        },
      }
    );
  }
};

handler.help = ['sendmoney @user <amount>'];
handler.tags = ['developer'];
handler.command = /^sendmoney$/;
handler.premium = false;
handler.rowner = true;

export default handler;