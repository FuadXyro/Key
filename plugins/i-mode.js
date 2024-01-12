let handler = async (m, { conn }) => {
let fuad = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

    let wm = `${global.wm}`
    let _uptime = process.uptime() * 1000
    let uptimex = clockString(_uptime)

    let mode = `
Mode: ${global.opts['self'] ? 'Self' : 'publik'}\nAktif: ${uptimex}\nPengguna: ${Object.keys(global.db.data.users).length}\nPengguna Terbanned: ${Object.entries(global.db.data.users).filter(user => user[1].banned).length}\nFitur Sering Digunakan: ${Object.entries(global.db.data.stats).length}\n\nNote: Jika bot tidak ada balasan maka bot sedang maintenance.
    `.trim();

    conn.relayMessage(m.chat, {
        extendedTextMessage: {
            text: fuad(mode),
            contextInfo: {
                externalAdReply: {
                    title: uptimex,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://telegra.ph/file/dc5a67d724b016574129b.jpg',
                    sourceUrl: ''
                }
            }, mentions: [m.sender]
        }
    }, {});
};

handler.help = ['mode'];
handler.tags = ['info'];
handler.customPrefix = /^(mode|.mode)$/i;
handler.command = new RegExp;
handler.limit = false;

export default handler;

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Hari " + hours + " Jam " + minutes + " Menit " + sec + " Detik";
}