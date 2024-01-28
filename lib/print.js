import { WAMessageStubType } from '@adiwajshing/baileys'
import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import moment from 'moment-timezone'
import { watchFile } from 'fs'
import cl from 'lolcatjs'


const terminalImage = global.opts['img'] ? (await import('terminal-image')).default : ''
const urlRegex = (await import('url-regex-safe')).default({ strict: false })
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))
export default async function (m, conn = { user: {} }) {  
  let _name = await conn.getName(m.sender)
  let yy = ['◈', '⪩', '✽', '◎', '◈', '⿴']
  let y = yy.getRandom()
  let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') //+ (_name ? ' ~' + _name : '')
  let chat = await conn.getName(m.chat)
  let id = `${m.sender}`
  let names = await conn.user.name
  // let ansi = '\x1b['
  let img
  try {
    if (global.opts['img'])
      img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false
  } catch (e) {
    console.error(e)
  }
  let filesize = (m.msg ?
    m.msg.vcard ?
      m.msg.vcard.length :
      m.msg.fileLength ?
        m.msg.fileLength.low || m.msg.fileLength :
        m.msg.axolotlSenderKeyDistributionMessage ?
          m.msg.axolotlSenderKeyDistributionMessage.length :
          m.text ?
            m.text.length :
            0
    : m.text ? m.text.length : 0) || 0
  let user = global.db.data.users[m.sender]
  let me = PhoneNumber('+' + ((conn.user?.jid || conn.user?.id)?.replace('@s.whatsapp.net', '') || '')).getNumber('international')
 let pe = m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''

/**************************** TIME *********************/
 let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
  
  let jumlahRgb = 1200
  cl.options.seed = Math.round(Math.random() * jumlahRgb)
  cl.options.colors = true
  
cl.fromString(`╔⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤ FuadXy࿐ ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╗
${y} Bot Name: ${wm}
${y} User: ${chat} 
${y} Nomor: ${sender}
${y} Ukuran File: ${filesize} kb
${y} Chats id: ${id}
╚⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤ ${wib} ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╝
Type: ${pe}
Message: `)
 // Gausah Tengil Ganti-Ganti Njink Gw Remake Sampe Pusing Ngentod
  
  if (img) console.log(img.trimEnd())
  
  if ((opts["antibot"] || (global.db.data.settings[conn.user.jid]?.antibot && m?.isGroup)) && m?.sender) {
    const idBot = m.msg?.id || m.key?.id || 'N/A' // tambahkan "?." setelah "key"
    if (idBot.includes("BAE5") && m.sender !== conn.user.jid) { 
        const antiBotMessage = `Terdeteksi ( ! ) ada bot lain dan anda akan dikick.`
        await conn.sendMessage(m.chat, {
            text: antiBotMessage,
            mentions: [m.sender]
        }, {
            quoted: m
        })
        await delay(1000)
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        conn.logger.info('Bot detected ' + m.sender.split('@')[0])
    }
}

if (m?.isGroup && m?.sender) {
    const idBot = m.msg?.id || m.key?.id || 'N/A' // tambahkan "?." setelah "key"
    if (idBot.includes("BAE5") && m.sender !== conn.user.jid) {
        conn.user.listbot = conn.user.listbot || []
        const isNewBot = !conn.user.listbot.some(bot => bot.number === m.sender)
        isNewBot && conn.user.listbot.push({
            name: m.name ?? m.pushName ?? conn.user.name ?? 'N/A',
            number: m.sender
        })
        if (isNewBot) {
            conn.logger.info('New bot number ' + m.sender.split('@')[0])
        }
    }
}


    
  if (typeof m.text === 'string' && m.text) {
    let log = m.text.replace(/\u200e+/g, '')
    let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
    let mdFormat = (depth = 4) => (_, type, text, monospace) => {
      let types = {
        _: 'italic',
        '*': 'bold',
        '~': 'strikethrough'
      }
      text = text || monospace
      let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
      // console.log({ depth, type, formatted, text, monospace }, formatted)
      return formatted
    }
    if (log.length < 4096)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
      })
    log = log.replace(mdRegex, mdFormat(4))
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + await conn.getName(user)))
    console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.green(log) : log)
  }
  if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => {
    jid = conn.decodeJid(jid)
    let name = conn.getName(jid)
    return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''))
  }).join(', '))
  if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg.fileName || m.msg.displayName || 'Document'}`)
  else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
  else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
  else if (/audio/i.test(m.mtype)) {
    const duration = m.msg.seconds
    console.log(`${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
  }

  console.log()
  // if (m.quoted) console.log(m.msg.contextInfo)
}

let file = global.__filename(import.meta.url)
watchFile(file, () => {
  console.log(chalk.redBright("Update 'lib/print.js'"))
})