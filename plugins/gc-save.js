import pkg from '@adiwajshing/baileys'
import PhoneNumber from 'awesome-phonenumber'

const { MessageType } = pkg

let handler = async (m, { conn, text }) => {
  let name = text || conn.getName(m.sender)
  let number = m.sender.split('@')[0]

  const phoneNumber = '+' + number
  if (!PhoneNumber(phoneNumber).isValid()) {
    return conn.reply(m.chat, 'Nomor telepon tidak valid', m)
  }

  let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber(phoneNumber).getNumber('international')}
END:VCARD`

 
  conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [{ vcard }]
    }
  })
}

handler.help = ['mycontact']
handler.tags = ['group']
handler.command = /^(me|save|saveme|mycontact)$/i
handler.group = true
handler.limit = true

export default handler