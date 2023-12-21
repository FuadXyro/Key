import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
if (!text) throw `Input warna & teks atau reply teks yang ingin di jadikan quote!`;
    let [warna, teks] = text.split('|')
    if (!text) throw `Example: .${command} #00ff00|teks`
    await m.reply(wait)

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')

   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": warna,
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "text": teks,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stiker = await sticker(buffer, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}

handler.help = ['qcr warna|teks']
handler.tags = ['sticker']
handler.command = /^(qcr)$/i
export default handler