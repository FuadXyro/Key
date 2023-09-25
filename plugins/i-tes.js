import fs from 'fs'

let handler = async (m, { conn }) => {
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})

  await delay(2000)
  
conn.sendMessage(m.chat, {
    video: fs.readFileSync('./src/tes.mp4'),
    mimetype: 'video/mp4',
    fileLength: 100000000000,
    caption: 'Ada Apa bro?',
    gifPlayback: true,
    gifAttribution: 5,
    contextInfo: {
      forwardingScore: 2023, 
      isForwarded: false,
      mentionedJid: [m.sender]
    }
  },
  )

  await delay(2000)
  m.reply(' ')
}

handler.help = ["tes"]
handler.tags = ["info"]
handler.command = /^(tes)$/i

export default handler

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}