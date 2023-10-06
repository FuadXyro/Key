let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    command,
}) => {
    let idgc = text.split("|")[0]
    let pesan = text.split("|")[1]
    
    if (!idgc || !pesan) return m.reply(`*Example:* ${usedPrefix + command} idgc|text`)
    
    let get
    try {
        get = await conn.groupMetadata(idgc)
    } catch (e) {
        return m.reply(e)
    }
    
    let participants = get.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    let count = participants.length
    let sentCount = 0
    m.reply(wait)

    for (let i = 0; i < participants.length; i++) {
        setTimeout(function() {
            if (pesan) {
                conn.sendMessage(participants[i], {
                    text: pesan
                })
            } else if (m.quoted) {
                conn.copyNForward(participants[i], m.getQuotedObj(), false)
            } else if (pesan && m.quoted) {
                conn.sendMessage(participants[i], {
                    text: pesan + "\n" + m.quoted.text
                })
            }
            count--
            sentCount++
            if (count === 0) {
                m.reply(`Berhasil Push Kontak:\nJumlah Pesan Terkirim: *${sentCount}*`)
            }
        }, i * 1000) // delay setiap pengiriman selama 1 detik
    }
}

handler.command = handler.help = ["pushkontak"]
handler.tags = ["developer"]
handler.rowner = true
handler.group = false

export default handler