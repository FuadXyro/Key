/*
* 
  ® FuadXy
*
*/
let handler = async(m, { conn, groupMetadata, usedPrefix, command }) => {
await conn.sendMessage(m.chat, {
          react: {
            text: "💰",
            key: m.key,
          }})
  let named = conn.getName(m.sender)
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
  let kled = 'https://telegra.ph/file/5072cfb53188625088bfd.jpg'
  let user = global.db.data.users[m.sender]
  const caption = `
*Name:* ${user.registered ? user.name : conn.getName(m.sender)}
*Atm:* ${user.atm > 0 ? 'Level ' + user.atm : 'Belum memiliki kartu atm'}
*Bank:* ${rp.format(user.bank)}
*Money:* ${rp.format(user.money)}
*Status:* ${user.premiumTime > 0 ? 'Premium' : 'Free'}
*Registered:* ${user.registered ? '✓' : 'No'}

⚚ Simple WhatsApp Bot By FuadXyro
`.trim()
  await conn.sendPresenceUpdate('composing', m.chat)
  await conn.reply(m.chat, caption, fpay, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: kled, title: `BANK ZENITH-V3`, thumbnail: { url: kled }, thumbnailUrl: kled, renderLargerThumbnail: true }}})
}
handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^(bank)$/i
handler.register = false
export default handler

const rp = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})