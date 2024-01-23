import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else {
        throw "Input teks atau reply teks yang ingin dijadikan quote!"
    }

    await m.reply(wait)

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": getRandomHexColor().toString(),
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
            "text": text,
            "replyMessage": {}
        }]
    }

    try {
        const json = await axios.post('https://77c5fa6b-cc53-43a3-bd61-6cde09de38c0-00-2899vjklmkp6a.sisko.replit.dev/generate', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const buffer = Buffer.from(json.data.result.image, 'base64')
        let stiker = await sticker(buffer, false, global.packname, global.author)

        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
        }
    } catch (error) {
        console.error("Error generating quote sticker:", error)
        throw "Failed to generate quote sticker. Please try again later."
    }
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i
export default handler

function getRandomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
}