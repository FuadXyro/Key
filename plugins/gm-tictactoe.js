import TicTacToe from '../lib/tictactoe.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!m.isGroup) return
    if (!global.db.data.chats[m.chat].game) {
        return conn.reply(m.chat, "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game", m)
    }
    conn.game = conn.game || {}
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
        throw 'Kamu masih didalam game'
    }
    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))

    if (room) {
        m.reply('Partner ditemukan!')
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'PLAYING'
        let arr = room.game.render().map(v => ({
            X: '❌', O: '⭕',
            1: '1️⃣', 2: '2️⃣', 3: '3️⃣',
            4: '4️⃣', 5: '5️⃣', 6: '6️⃣',
            7: '7️⃣', 8: '8️⃣', 9: '9️⃣'
        })[v])
        let pp = 'https://telegra.ph/file/3b2c4e3a50065c5d78a64.jpg'
        let str = `
Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
Menunggu @${room.game.currentTurn.split('@')[0]}
Ketik *nyerah* untuk nyerah
`.trim()
        await conn.reply(room.x, str, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: '⌂ TIC TAC TOE', body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
        await conn.reply(room.o, str, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: '⌂ TIC TAC TOE', body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        }
        if (text) room.name = text
        let str = 'Menunggu partner' + (text ? ` mengetik command dibawah ini\n${usedPrefix}${command} ${text}` : '')
        await conn.reply(room.x, str, m, { mentions: await conn.parseMention(str) })
        conn.game[room.id] = room
    }
}

handler.help = ['tictactoe', 'ttt'].map(v => v + ' [custom room name]')
handler.tags = ['game']
handler.command = /^(tictactoe|t{3})$/i

export default handler