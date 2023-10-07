import { createHash } from 'crypto'
let handler = async function (m, { args }) {
  if (!args[0]) throw `Hai Kak ${conn.getName(m.sender)} Serial Number Kamu kosong\n• Silahkan ketik\n.ceksn\nuntuk mengetahui Serial Number Kamu ( ! )`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '🚫Serial Number salah'
  user.registered = false
let info = `( ✓ ) Kamu ${conn.getName(m.sender)} Berhasil keluar dari database\n\n${namebot}`
let fpay = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: 'FuadTzy',
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: `Hay kak👋 ${conn.getName(m.sender)}`
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
await conn.reply(m.chat, info, fpay)
}

handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <SN|SERIAL NUMBER>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler