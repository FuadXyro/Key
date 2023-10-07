import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex')

let info = `*Your SN:* ${sn}\n\n• Mau Unregister? gmpg tinggal ketik\n.unreg <SN>`

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

handler.help = ['ceksn']
handler.tags = ['xp']
handler.command = /^(ceksn)$/i
handler.register = true
export default handler