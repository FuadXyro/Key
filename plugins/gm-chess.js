let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
if (!global.db.data.chats[m.chat].game) {
      return conn.reply(m.chat, "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game", fkontak )}
    conn.chessgame = conn.chessgame || {}
    
    switch (text) {
        case 'end':
            if (!conn.chessgame[m.chat]) return m.reply('Anda tidak sedang dalam sesi Chess. 🤔')
            delete conn.chessgame[m.chat]
            await m.reply('Berhasil keluar dari sesi Chess. 👋')
            break

        case 'start':
            if (conn.chessgame[m.chat]) return conn.reply(m.chat, 'Anda masih berada dalam sesi Chess. 🤖', conn.chessgame[m.chat].msg)
            try {
                const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
                conn.chessgame[m.chat] = {
                    fen,
                    player1: m.sender,
                    player2: null,
                    msg: null,
                    acc: null,
                    turn: null
                }
                let txt = `🎮 *Chess Game* 🎮\n\n@${m.sender.split('@')[0]}\n\n`
                txt += '- accept\n'
                txt += '- cancel\n'
                txt += `*${usedPrefix + command} end* untuk keluar dari sesi chess. 🚪\n\n`
                txt += 'Ketik *accept* untuk memulai permainan.'
                txt += '\nContoh penggunaan:\n```' + `${usedPrefix + command} start` + '```\n'
                txt += 'Jika sudah, tunggu lawan Anda untuk bergabung. ⌛'
                let soal = await conn.sendMessage(m.chat, {
                    text: txt,
                    mentions: [m.sender]
                }, {
                    quoted: m
                })
                conn.chessgame[m.chat].msg = soal
            } catch (e) {
                console.log(e)
                await m.reply('Terjadi kesalahan. 🚨')
            }
            break

        default:
            let helpTxt = `🎮 *Chess Game* 🎮\n\n`
            helpTxt += `*Commands:*\n- *${usedPrefix + command} start :* Memulai permainan.\n- *${usedPrefix + command} end :* Keluar dari sesi permainan.\n\n`
            helpTxt += '*Contoh Penggunaan:*\n'
            helpTxt += `*${usedPrefix + command} start* - Memulai permainan.\n`
            helpTxt += `*${usedPrefix + command} end* - Keluar dari sesi permainan.`

            await m.reply(helpTxt)
    }
}

handler.menu = ['chessgame']
handler.tags = ['game']
handler.command = /^(chessgame|chess|catur)$/i
handler.group = true
handler.limit = true

export default handler