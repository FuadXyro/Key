let handler = async (m, { conn, usedPrefix }) => {

let fla = 'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=List+Block'
await conn.fetchBlocklist().then(async data => {
let txt = `\n*Total:* ${data.length}\n\n┌─\n`
	for (let i of data) {
	txt += `├ wa.me/${i.split("@")[0]}\n`
}
	txt += "└────"
await conn.reply(m.chat, txt, m, { contextInfo: { mentionedJid: conn.parseMention(txt), forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: fla, title: '「  Daftar Nomor Yang Diblokir  」', body: '#2021-2024', thumbnail: { url: fla }, thumbnailUrl: fla, sourceUrl: false, renderLargerThumbnail: true }}})
	}).catch(err => {
		console.log(err);
		throw 'tidak ada yang diblokir!'
	})
}

handler.help = ['listblock']
handler.tags = ['info']
handler.command = /^(listblock|blocklist|bloklist)$/i
handler.vvip = true

export default handler