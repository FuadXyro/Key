import fs from 'fs'
import os from 'os'
import { sizeFormatter } from 'human-readable'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
//Reacticon
await conn.sendMessage(m.chat, {
          react: {
            text: `${pickRandom(['👻', '🦋', '🏁'])}`,
            key: m.key,
          }})
let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

//Uptime
let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime = await new Promise(resolve => {
      process.once('message', resolve)
      setTimeout(resolve, 1000)
    })
    _muptime *= 1000
  }
let muptime = clockString(_muptime)

//Total Feature
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
//m.sender
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
   else who = m.sender
let name = conn.getName(who)
//thumbnail 
let img1 = 'https://telegra.ph/file/4d5cf54515dd1eab55c47.jpg'
let img2 = 'https://telegra.ph/file/55d519d8ec7f25ba6c4bb.jpg'
let img3 = 'https://telegra.ph/file/7108d5804a49b4fcdae27.jpg'
let img4 = 'https://telegra.ph/file/7108d5804a49b4fcdae27.jpg'
let img5 = 'https://telegra.ph/file/37dc838d0e326bc21e95d.jpg'
let img6 = 'https://telegra.ph/file/fa171fb51d5b188f3acce.jpg'
let img7 = 'https://telegra.ph/file/b2bcf52752d273683c002.jpg'
let pp = `${pickRandom([`${img1}`, `${img2}`, `${img3}`, `${img4}`, `${img5}`, `${img6}`, `${img7}`])}`

let ucpn = `${ucapan()}`
let info = `Hai Kak *${m.name}*
sᥱᥣᥲmᥲ𝗍 ძᥲ𝗍ᥲᥒg ძі ${namebot}
ᑲ᥆𝗍 іᥒі sᥱძᥲᥒg ძᥲᥣᥲm 𝗍ᥲһᥲ⍴ ⍴ᥱᥒgᥱmᑲᥲᥒgᥲᥒ!!

乂 I N F O  S E R V E R
  ✬ Library: Baileys
  ✬ Mode: Public
  ✬ Platform: ${os.platform()}
  ✬ Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}
  ✬ Memory Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
  ✬ Runtime: ${muptime}
  ✬ Size Database: ${megabit()} MB
  ✬ NodeJs: ${process.version}
  ✬ Total Fitur: ${totalf}
𖢖 ═════════════════ 𖢖



 💫 *ɴᴏᴛᴇ (ʜᴀʀᴀᴘ ᴅɪʙᴀᴄᴀ) :*
ʙᴇʀʜᴜʙᴜɴɢ ʙᴜᴛᴛᴏɴ ᴛɪᴅᴀᴋ ʟᴀɢɪ
ᴛᴇʀʟɪʜᴀᴛ ᴅɪ ᴡʜᴀᴛsᴀᴘᴘ ᴏʀɪ, ᴋᴀᴍɪ
ᴅᴇᴠᴇʟᴏᴘᴇʀ sᴇᴛᴜᴊᴜ ᴜᴛᴋ ᴍᴇᴍʙᴜᴀᴛ
ʙᴏᴛ ɪɴɪ ᴛᴀɴᴘᴀ ʙᴜᴛᴛᴏɴ ᴊᴀᴅɪ ᴋᴀᴍɪ
ʜᴀʀᴀᴘ ᴜsᴇʀ sᴋᴀʟɪᴀɴ ᴊɢɴ ᴍᴀɢᴇʀ ᴜᴛᴋ
ᴍᴇɴɢᴇᴛɪᴋ ᴄᴏᴍᴍᴀɴᴅ & ᴍᴇᴍʙᴀᴄᴀ ᴋᴇᴛᴇʀᴀɴɢᴀɴ² ʙᴏᴛ ɪɴɪ,
◉ SILAHKAN KETIK CMD
 .allmenu
( Untuk Menampilkan Semua Fitur BOT )

🦋 *ᴘᴇʀᴀᴛᴜʀᴀɴ :*
1. Jɢɴ Sᴘᴀᴍ!!
2. ʙᴇʀɪ ᴊᴇᴅᴀ 5 ᴅᴇᴛɪᴋ ᴊɪᴋᴀ ᴛᴅᴋ ᴍᴇʀᴇsᴘᴏɴ
3. ɢᴜɴᴀᴋᴀɴ ʙᴏᴛ ᴅᴇɴɢᴀɴ *ʙɪᴊᴀᴋ*
4. ᴊᴀɴɢᴀɴ ᴛᴇʟғᴏɴ/ᴄᴀʟʟ ʙᴏᴛ!


𖢖====❏ *Tʜᴀɴᴋs Tᴏ* ❏====𖢖
      • *𝐀𝐥𝐥𝐚𝐡 𝐒𝐖𝐓*
      • *𝐎𝐫𝐚𝐧𝐠 𝐓𝐮𝐚*
      • *𝐅𝐮𝐚𝐝𝐗𝐲 (𝐌𝐞)*
      • *𝐊𝐲𝐚𝐦𝐢*
      • *𝐃𝐚𝐯𝐞 𝐊𝐠𝐰*
      • *𝐍𝐚𝐫𝐮𝐭𝐨𝐦𝐨*
      • *𝐁𝐨𝐜𝐡𝐢𝐥𝐆𝐚𝐦𝐢𝐧𝐠*
      • *𝐀𝐠𝐮𝐬 𝐅𝐚𝐦𝐢𝐥𝐢𝐚*
      • *𝐁𝐨𝐜𝐡𝐢𝐥𝐭𝐞𝐚𝐦*
 
ᴍᴏᴛɪᴠᴀsɪ 🦋:
${motivasi.getRandom()}

❀𝑫𝒂𝒕𝒆 ${new Date().toLocaleString('id-ID', {timeZone: 'Asia/Jakarta' })}`
await conn.sendPresenceUpdate('recording', m.chat)
await conn.reply(m.chat, info, m, { mentionedJid: [who], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${namebot}`, body: '乂 2021-2023', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: `${global.sch}`, renderLargerThumbnail: true }}})
  }
handler.help = ['menu']
handler.tags = ['info', 'main']
handler.command =  /^(menu|help)$/i

handler.register = false
handler.premium = false
handler.limit = false

export default handler

function ucapan() {
	const time = moment.tz('Asia/Jakarta').format('HH')
	let res = "Selamat Dinihari🌃"
	if (time >= 4) {
		res = "Selamat Pagi🌄"
	}
	if (time >= 10) {
    res = "Selamat Siang☀️"
  }
  if (time >= 15) {
    res = "Selamat Sore🌇"
  }
  if (time >= 18) {
    res = "Selamat Malam🌙"
  }
  return res
}
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, '0')).join('');
}
function megabit() {
    let stats = fs.statSync("database.json")
    let ukuran_mb = stats.size / (1024*1024)
    return ukuran_mb.toFixed(1)
}
function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
}