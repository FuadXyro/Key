import fs from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async(m, { conn, groupMetadata, usedPrefix, command }) => {
await conn.sendMessage(m.chat, {
          react: {
            text: "🦋",
            key: m.key,
          }})


let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = 'https://telegra.ph/file/9ef168fd4482af65558d8.jpg'

let info = `◐ *Adiwajshing*
https://github.com/adiwajshing

◐ *FuadXy*
https://github.com/FuadXyro

◐ *Fokus Id*
https://github.com/Fokusdotid

◐ *AmirulDev*
https://github.com/amiruldev20

◐ *Aiinne*
https://github.com/Aiinne

◐ *The.sad.boy01*
https://github.com/kangsad01

◐ *Nurutomo*
https://github.com/Narutomo

◐ *Bochilgaming*
https://github.com/BochilGaming

◐ *DaveKgw*
https://github.com/davekgw

◐ *Kyami*
https://github.com/KaiZax

◐ *Ken*
https://github.com/KensBot

◐ *Dan semua pemakai bot ini*

Thanks😄
_© Creator By FuadXy~_
`
await conn.reply(m.chat, info, m, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `───━•〔 𝘽𝙄𝙂 𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊 〕•━───`, thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true }}})
}

handler.customPrefix = /^(.tqto|tqto)$/i
handler.command = new RegExp

export default handler