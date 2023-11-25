import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let res = await fetch('https://raw.githubusercontent.com/FuadXyro/Zenith/main/text/bot/rules.txt')
let txt = await res.text()
await conn.reply(m.chat, `*Hai kak ${conn.getName(m.sender)}, dibaca ya rulesnya*
${txt}
*────────────────────────*
`.trim(), m)
}
handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules|peraturan)$/i
export default handler