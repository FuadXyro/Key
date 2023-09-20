import fetch from "node-fetch"
const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'
let handler = async (m, {
  conn,
  text, 
  usedPrefix, 
  command 
  }) => {
	try {
		let res = await fetch(link+'autogempa.json')
		let anu = await res.json()
		anu = anu.Infogempa.gempa
		let txt = `*${anu.Wilayah}*\n\n`
		txt += `Tanggal : ${anu.Tanggal}\n`
		txt += `Waktu : ${anu.Jam}\n`
		txt += `Potensi : *${anu.Potensi}*\n\n`
		txt += `Magnitude : ${anu.Magnitude}\n`
		txt += `Kedalaman : ${anu.Kedalaman}\n`
		txt += `Koordinat : ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\nDirasakan : ${anu.Dirasakan}` : ''}`
		await conn.reply(m.chat, txt, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: link+anu.Shakemap, title: `${namebot}`, body: '乂 2021-2023', thumbnail: { url: link+anu.Shakemap }, thumbnailUrl: link+anu.Shakemap, sourceUrl: null, renderLargerThumbnail: true }}})
	} catch (e) {
		console.log(e)
		m.reply(`[!] Fitur Error.`)
	}
}
handler.command = handler.help = ['infogempa', 'bmkg', 'gempa']
handler.tags = ['info']
handler.premium = false
handler.limit = true
export default handler