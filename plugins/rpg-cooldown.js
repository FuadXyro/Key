import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
    let { 
        lasthourly, 
        lastberburu, 
        lastbansos, 
        lastadventure, 
        lastfishing, 
        lastwar, 
        lastduel, 
        lastmining, 
        lastdungeon, 
        lastclaim, 
        lastweekly, 
        lastmonthly,
        lastyearly,
        lastkill,
        lastbonus,
        warn
    } = global.db.data.users[m.sender]
    
    let pp = 'https://telegra.ph/file/97d7afd78a29650d6344b.jpg'
    let str = `
*Last Berburu :* ${lastberburu > 0 ? '❌' : '✓'}
*Last Memancing :* ${lastfishing > 0 ? '❌' : '✓'}
*Last Adventure :* ${lastadventure > 0 ? '❌' : '✓'}
*Last Duel :* ${lastduel > 0 ? '❌' : '✓'}
*Last Kill :* ${lastkill > 0 ? '❌' : '✓'}
*Last War :* ${lastwar > 0 ? '❌'  : '✓'}
*Last Dungeon :* ${lastdungeon > 0 ? '❌' : '✓'}
*Last Mining :* ${lastmining > 0 ? '❌' : '✓'}
*Last Bansos :* ${lastbansos > 0 ? '❌' : '✓'}
*Last Bonus :* ${lastbonus > 0 ? '❌' : '✓'} 
*Last Hourly :* ${lasthourly > 0 ? '❌' : '✓'}
*Last Claim :* ${lastclaim > 0 ? '❌' : '✓'}
*Last Weekly :* ${lastweekly > 0 ? '❌' : '✓'}
*Last Monthly :* ${lastmonthly > 0 ? '❌' : '✓'}
*Last Yearly :* ${lastyearly > 0 ? '❌' : '✓'}
\n${readMore}
⚠️ *Warn:* ${warn}
⛔ *Banned:* No
`.trim()
    await conn.sendMessage(m.chat, { document: fs.readFileSync("./package.json"), fileName: 'ZenithBotz', mimetype: 'application/msword',
  jpegThumbnail: fs.readFileSync("./media/thumbDoc.jpg"), caption: str, contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${htki} C O O L D O W N ${htka}`, body: `🌱┊ RPG WhatsApp Bot`, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}}, { quoted: m,ephemeralExpiration: 86400})
}
handler.help = ['cd','cooldown']
handler.tags = ['rpg']
handler.command = /^(cd|cooldown)$/i
handler.register = false
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)