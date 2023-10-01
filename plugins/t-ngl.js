import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [user, msg] = text.split('|')
  if (!(user && msg)) throw `Example: ${usedPrefix + command} username/ngl_link | message`

  let link = /^(http|https):\/\/ngl.link/gi.test(user) ? user : /ngl.link/gi.test(user) ? `https://${user}` : `https://ngl.link/${user}`

  try {
    let data = await cekUser(link)
    if (!data) throw 'User not found/Invalid URL'
    
    await sendNgl(link, msg)
    m.reply(`Success send ngl to *"${user}"*\nMessage: *"${msg}"`)
  } catch (error) {
    console.error(error)
    m.reply('Failed to send ngl')
  }
}

handler.help = ['ngl']
handler.tags = ['tools']
handler.command = /^ngl$/i

export default handler

async function cekUser(url) {
  return await axios(url).catch(_ => null)
}

async function sendNgl(url, text) {
  return await axios({
    url,
    method: 'post',
    data: new URLSearchParams({ question: text }),
  })
}