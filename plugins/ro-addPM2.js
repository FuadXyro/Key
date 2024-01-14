import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} <ip>`, m)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
const ipValue = text
const url = 'https://cekilhost.net/api/config'
axios.post(url, `ip=${ipValue}`)
.then(response => {
if (response.data.status === 'success') {
const successMessage = `Berhasil Mendaftar pm2 dengan IP: ${ipValue}`
conn.reply(m.chat, successMessage, m)
} else {
const errorMessage = 'Terjadi kesalahan: ' + response.data.message
conn.reply(m.chat, errorMessage, m)
}
})
}
handler.help = ['addpm2 *<ip>*']
handler.tags = ['developer']
handler.command = /^(addpm2)$/i
handler.register = true
handler.limit = false
handler.rowner = true

export default handler