let handler = async (m, { conn }) => {
    let meta = await conn.groupMetadata(m.chat)
    
let quot = ['- ༺᭄', '- ♫᭄', '- ༄᭄', '- ⏤͟͟͞͞', '- ☆', '- ⫹⫺']
let hsing = quot.getRandom()
let kata = [`*Welcome to ${meta.subject}*`, '*Selamat datang di grup ini🙏🏻*']
let ws = ['𝓕𝓾𝓪𝓭 𝓑𝓸𝓽𝓩', '𝑩𝒐𝑻𝒛', 'Fall']
let foot = ['*Semoga Betah Ya✌🏻*', '*𖤓Salam Dari Admin𖤓*', '*GAK INTRO, KICK!!*']
let krtu = `${hsing} ${kata.getRandom()}
•❅─────✧❅✦❅✧─────❅•

*╔═══════════𖡹*
*║✵* Nama: 
*║✵* Umur: 
*║✵* Askot: 
*║✵* Kelas: 
*║✵* Agama: 
*║✵* Gender: 
*║✵* Waifu: 
*║✵* Husbu: 
*╚═══════════𖡹*

✧───･ﾟ★: *.✦ .* :★.───✧

${foot.getRandom()}
`
conn.fakeReply(m.chat, krtu + '\n' + `${ws.getRandom()}`, m.sender, wm)
}
handler.command = /^(intro)$/i
handler.group = true

export default handler