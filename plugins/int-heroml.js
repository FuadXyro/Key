import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, command, text }) => {

  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} gusion`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let fuad = await fetch(`https://api.yanzbotz.my.id/api/cari/hero?query=${text}`)
    let res = await fuad.json()
    let capt = `乂  *H E R O  M L*\n\n`
    capt += `	◦	*Release* : ${res.result.release}\n`
    capt += `	◦	*Role* : ${res.result.role}\n`
    capt += `	◦	*Specialty* : ${res.result.specialty}\n`
    capt += `	◦	*Lane* : ${res.result.lane}\n`
    capt += `	◦	*Price* : ${res.result.price}\n`
    capt += `	◦	*Durability* : ${res.result.gameplay_info.durability}\n`
    capt += `	◦	*Offense* : ${res.result.gameplay_info.offense}\n`
    capt += `	◦	*Gender* : ${res.result.story_info_list.gender}\n\n`
    capt += `𝑺𝒊𝒎𝒑𝒍𝒆 𝑩𝒐𝒕 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑩𝒚 𝑭𝒖𝒂𝒅𝑿𝒚`

    await conn.reply(m.chat, capt, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${namebot}`, body: '#2021-2024', thumbnail: { url: res.result.hero_img }, thumbnailUrl: res.result.hero_img, sourceUrl: sch, renderLargerThumbnail: true }}})
}
handler.help = ['heroml'].map(v => v + ' *<name>*')
handler.tags = ['internet']
handler.command = /^(heroml)$/i

export default handler