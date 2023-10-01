import PhoneNumber from 'awesome-phonenumber' 
 import fetch from 'node-fetch' 
 let handler = async (m, { conn, args, usedPrefix, command }) => { 
 if (!args[0]) throw `Use example ${usedPrefix + command} 083837709331` 
   let _pp = './src/avatar_contact.png' 
   let user = db.data.users[m.sender] 
   let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
     let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png') 
     let { premium, level, limit, exp, lastclaim, registered, regTime, age } = global.db.data.users[m.sender] 
     let username = conn.getName(who)
     let str = ` 
 ]──❏ *NOMER LINK* ❏──[ 
 💌 • *Name:* ${m.name}  
 📧 • *nomer:* @${who.replace(/@.+/, '')} 
 🔗 • *Link:* https://wa.me/${who.split`@`[0]} 
 ⌚ • *jam:* ${global.wibb} 
  
 ${global.botdate} 
 `.trim() 
     await conn.reply(m.chat, str, m, { mentionedJid: [who], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `Hai kak ${m.name}`, body: '乂 2021-2023', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: `https://wa.me/${who.split`@`[0]}`, renderLargerThumbnail: true }}})
 } 
handler.help = ['nomerlink','nrl'].map(v => v + ' <nomer>') 
handler.tags = ['group'] 
handler.command = /^nomerlink|nrl$/i 
handler.group = true

export default handler
  
const more = String.fromCharCode(8206) 
const readMore = more.repeat(4001) 
  
function clockString(ms) { 
   let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) 
   let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24 
   let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60 
   let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60 
   return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('') 
}