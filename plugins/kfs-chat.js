let handler = async(m, { conn, text, usedPrefix, command, args }) => {
	// Batas
    let [jid, name, pesan] = text.split(/[^\w\s]/g)
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
    if (jid == m.sender) throw 'tidak bisa mengirim pesan Menfes ke diri sendiri.'
    
    let pp = 'https://telegra.ph/file/0e828908df8961f38e136.jpg'
    
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	let tujuan = `👋 Hᴀɪ Kᴀᴋ ${data.jid.split('@')[0]}, ᴋᴀᴍᴜ ᴍᴇɴᴇʀɪᴍᴀʜ ᴘᴇsᴀɴ ᴍᴀɴғᴇss ɴɪʜ.

👤 Nama: ${name}
💌 Pesan:
${pesan}
`
	let cap = `PESAN RAHASIA
Anda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/
mantan?, tapi Tidak ingin tau siapa Pengirimnya?
Kamu bisa menggunakan Bot ini
Contoh Penggunaan: ${usedPrefix + command} ${nomorown} pesan untuknya

Contoh: ${usedPrefix + command} ${nomorown} hai`
let suks = `Mengirim Pesan *${mime ? mime : 'Teks'}*
👥 Dari : @${m.sender.replace(/@.+/, '')}
👥 Untuk : @${jid.replace(/@.+/, '')}

💌 Pesan:
${pesan ? pesan : 'Pesan Kosong'}
`
    // Batas
    command = command.toLowerCase()
    conn.menfes = conn.menfes ? conn.menfes : {}
        switch (command) {
            case 'menfes-leave': {
            let room = Object.values(this.menfes).find(room => room.check(m.sender))
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.reply(other, room.b + ' *Meninggalkan chat*', null)
            delete this.menfes
            if (command === 'menfes-leave') break
        }
        case 'menfes-start': {
            if (Object.values(conn.menfes).find(room => room.check(m.sender))) return conn.reply(m.chat, '*Kamu masih berada di dalam menfes chat, menunggu Balasan*', null)
            let room = Object.values(conn.menfes).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                room.b = m.sender
                room.state = 'CHATTING'
                await conn.reply(room.a, '*Menfes Chat Tersambung!*\nDengan: ' name, null)
                await conn.reply(m.sender, '*Menfes Chat Tersambung!*\nDengan: ' + room.a, null)
            } else {
            // Batas
	if (!m.quoted) {
		await conn.reply(jid, tujuan+'\n'+cap, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${namebot}`, body: '乂 2021-2023', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
	} else {
		await conn.reply(jid, tujuan+'\n'+cap, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${namebot}`, body: '乂 2021-2023', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
		let media = q ? await m.getQuotedObj() : false || m
		await conn.copyNForward(jid, media, false).catch(_ => _)
	}
	await conn.reply(m.chat, suks, m, { mentions: conn.parseMention(suks) })
            // Batas
                let id = + new Date
                conn.menfes[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [conn.a, conn.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === conn.a ? conn.b : who === conn.b ? conn.a : ''
                    },
                }
                await conn.reply(m.chat, '*Menunggu Balasan...*', null)
            }
            break
        }
    }
}
handler.help = ['menfes-start', 'menfes-leave']
handler.tags = ['konfess']
handler.command = ['menfes-start', 'menfes-leave']

handler.private = true

export default handler