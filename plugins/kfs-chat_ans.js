/*
export async function before(m, { match }) {
    // if (match) return !1
    if (!m.chat.endsWith('@s.whatsapp.net'))
        return !0
    this.menfes = this.menfes ? this.menfes : {}
    let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(room.b) && room.state === 'CHATTING')
    if (room) {
        if (/^.*(menfesleave|menfesstart)/.test(m.text))
            return
        let other = [room.a, room.b].find(user => user !== m.sender)
        await m.copyNForward(other, true)
    }
    return !0
}
*/


const delay = time => new Promise(res => setTimeout(res, time));

export async function before(m) {
  if (!m.chat.endsWith('@s.whatsapp.net')) return true;
  this.menfess = this.menfess ? this.menfess : {};
  let mf = Object.values(this.menfess).find(v => v.status === false && v.penerima == m.sender);
  if (!mf) return true;

  console.log({ text: m.text, type: m.quoted?.mtype });

  if ((m.text === 'BALAS PESAN' || m.text === '') && m.quoted.mtype == 'buttonsMessage') {
    await m.reply("Silahkan kirim pesan balasan kamu.\nKetik suatu pesan lalu kirim, maka pesan otomatis masuk ke target balas pesan.");
  } else {
    let pp = 'https://telegra.ph/file/b35b8bcc5fab94e1b6acb.png';
    let link = 'https://chat.whatsapp.com/EAR7T7H59vOJz8KcwMP179';
    let imgr = ''; // tidak jelas apa yang dimaksud dengan 'fla.getRandom()'
    let txt = `Hai ${mf.dari.split('@')[0]}, kamu menerima balasan nih.\n\nPesan sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n\nKalo ingin balas pesan, ketik lagi *.menfess tujuan|nama|isipesan*`;

    await conn.reply(mf.dari, txt, null, {
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        externalAdReply: {
          mediaType: 1,
          mediaUrl: pp,
          title: '', // tidak jelas apa yang dimaksud dengan 'wm'
          thumbnail: { url: pp },
          thumbnailUrl: pp,
          sourceUrl: link,
          renderLargerThumbnail: true
        }
      }
    });

    await m.reply('Berhasil Mengirim balasan.');
    await delay(1500);
    delete this.menfess[mf.id];
  }

  return true;
}