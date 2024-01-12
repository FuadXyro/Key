let handler = async (m, { conn, text, usedPrefix, command }) => {
    let dapat = Math.floor(Math.random() * 100000)
    let nomor = m.sender
    let who
    
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat

    if (!who) throw 'Tag salah satu lah'

    if (nomor === '6283138381932') {
        throw 'Anda merampok developer bot, dan anda terkena denda Rp: 30000000'
        global.db.data.users[m.sender].money -= 30000000 // Decrease money by 30000000
    }

    if (typeof db.data.users[who] === 'undefined') throw 'Pengguna tidak ada didalam database'

    let __timers = new Date() - global.db.data.users[m.sender].lastrob
    let _timers = 3600000 - __timers
    let timers = clockString(_timers)
    let users = global.db.data.users

    if (new Date() - global.db.data.users[m.sender].lastrob > 3600000) {
        if (10000 > users[who].money) throw 'ᴛᴀʀɢᴇᴛ ɢᴀᴀᴅᴀ 💰ᴜᴀɴɢ ʙᴏᴅᴏʜ, ᴋɪꜱᴍɪɴ ᴅɪᴀ'
        
        users[who].money -= dapat * 1
        users[m.sender].money += dapat * 1
        global.db.data.users[m.sender].lastrob = new Date() * 1

        conn.reply(m.chat, `ʙᴇʀʜᴀꜱɪʟ ᴍᴇʀᴀᴍᴘᴏᴋ ᴍᴏɴᴇʏ ᴛᴀʀɢᴇᴛ ꜱᴇʙᴇꜱᴀʀ 💰${dapat}`, m)
    } else {
        conn.reply(m.chat, `Anda Sudah merampok dan berhasil sembunyi, tunggu ${timers} untuk merampok lagi`, m)
    }
}

handler.help = ['rampok *@tag*']
handler.tags = ['rpg']
handler.command = /^rampok|rob$/
handler.limit = true
handler.group = true

export default handler

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60

    return [
        '\n' + d, ' *Days ☀️*\n ',
        h, ' *Hours 🕐*\n ',
        m, ' *Minute ⏰*\n ',
        s, ' *Second ⏱️* '
    ].map(v => v.toString().padStart(2, 0)).join('')
}