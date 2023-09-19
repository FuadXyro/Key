/*let handler = async(m, { conn, text, usedPrefix, command, args }) => {
	// Batas
    let [jid, name, pesan] = text.split(/[^\w\s]/g)
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw `Cara penggunaan :*\n\n${usedPrefix}menfess nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix}menfess ${m.sender.split`@`[0]}|Anonymous|Hai.\n\n.leave ${m.sender.split`@`[0]} (untuk keluar dari sessi menfess).`;
    if (jid == m.sender) throw 'tidak bisa mengirim pesan Menfes ke diri sendiri.'
    
    let pp = 'https://telegra.ph/file/0e828908df8961f38e136.jpg'
    
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	let tujuan = `👋 Saya *${conn.user.name}*, Pesan Untuk Kamu
👥 Dari : *${name}*

💌 Pesan:
${pesan}

Silahkan ketik
${userPrefix}menfess <nomor>
untuk menghubungkan sessi menfess
`
	let cap = `PESAN RAHASIA
Anda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/
mantan?, tapi Tidak ingin tau siapa Pengirimnya?
Kamu bisa menggunakan Bot ini
Contoh Penggunaan: 
${usedPrefix + command} ${nomorown} Hai

${usedPrefix}leave (untuk keluar dari sessi menfess).
`
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
        case 'leave': {
            let room = Object.values(conn.menfes).find(room => room.check(m.sender))
            if (!room) return conn.reply(m.chat, '*Kamu tidak sedang berada di menfes chat*', null)
            m.reply('Sukses Hapus Menfes')
            let other = room.other(m.sender)
            if (other) await conn.reply(other, room.b + ' *Meninggalkan chat*', null)
            delete conn.menfes[room.id]
            if (command === 'leave') break
        }
        case 'menfess': {
            if (Object.values(conn.menfes).find(room => room.check(m.sender))) return conn.reply(m.chat, '*Kamu masih berada di dalam menfes chat, menunggu Balasan*', null)
            let room = Object.values(conn.menfes).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                room.b = m.sender
                room.state = 'CHATTING'
                await conn.reply(room.a, '*Menfes Chat Tersambung!*\nDengan: ' + m.sender, null)
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
                await conn.reply(m.chat, `*Menunggu Balasan Dari wa.me/${jid.replace(/@.+/, '')}*`, null)
            }
            break
        }
    }
}
handler.help = ['menfess', 'leave']
handler.tags = ['menfes']
handler.command = ['menfess', 'leave']

handler.private = true

export default handler
*/


let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonymous|Hai.`;
    let [jid, name, pesan] = text.split('|');
    if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note: *Jika Penggunaan Kata Terdeteksi Toxic Otomatis Tidak Akan Dikirim Oleh Bot!*\n*Harap Yang Sopan Kak!*\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonymous|Hai.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
    if (jid == m.sender) throw 'tidak bisa mengirim pesan menfess ke diri sendiri.'
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let pp = 'https://telegra.ph/file/2870f05b11447e5c80fb1.jpg'
        let link = 'https://chat.whatsapp.com/EAR7T7H59vOJz8KcwMP179'
        let tek = `Hai Kak ${data.jid.split('@')[0]}, kamu menerima pesan Menfess nih.\n\nDari: *${name}*\nPesan: \n${pesan}\n\nMau balas pesan ini? bisa kok. tulis aja sesuatu lalu kirim nanti terkirim otomatis ke ${name}`
        await conn.reply(data.jid, tek, m, { contextInfo: { mentionedJid: [who], isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: '*「 Konfess 」*', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: 'https://chat.whatsapp.com/EAR7T7H59vOJz8KcwMP179', renderLargerThumbnail: true }}})
        .then(() => {
            m.reply('Berhasil mengirim pesan menfess.')
            conn.menfess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        m.reply('Maaf Ada Yang Error');
    }
}
handler.tags = ['konfess']
handler.help = ['menfess', 'menfes'].map(v => v + ' <nomor|nama pengirim|pesan>')
handler.command = /^(menfess|menfes)$/i
handler.private = true

export default handler