/* repaired by fuadxy*/
let { MessageType } = (await import('@adiwajshing/baileys')).default

let wm = global.wm

let handler = async (m, { conn, usedPrefix, owner }) => {
    try {
        let __timers = new Date() - global.db.data.users[m.sender].lastfishing
        let _timers = 240000 - __timers
        let timers = clockString(_timers)
        let you = conn.getName(m.sender)
        let user = global.db.data.users[m.sender]

        if (global.db.data.users[m.sender].fishingrod > 0) {
            if (new Date() - global.db.data.users[m.sender].lastfishing > 240000) {

                let ikan = Math.floor(Math.random() * 30)
                let lele = Math.floor(Math.random() * 15)
                let nila = Math.floor(Math.random() * 10)
                let bawal = Math.floor(Math.random() * 10)
                let udang = Math.floor(Math.random() * 39)
                let paus = Math.floor(Math.random() * 2)
                let kepiting = Math.floor(Math.random() * 27)
                let _psepick = pickRandom(['1', '0', '0', '1'])
                let psepick = parseInt(_psepick)
                let _psenjata = pickRandom(['1', '0', '0', '0'])
                let psenjata = parseInt(_psenjata)

                let mcng = `
*📮Hasil tangkapan Mu*
        
🐟Ikan nila : ${nila}
🐡Bawal : ${bawal}
🐟lele : ${lele}
🐟 ikan : ${ikan}
🦐 udang : ${udang}
🐋 Paus: ${paus}
🦀 Kepiting: ${kepiting}

_total pancingan↓_
${nila + bawal + ikan + lele}
        
you can cook it to increase stamina or blood💉
_example:_
${usedPrefix}Cook catfish `
                
                setTimeout(() => {
                    conn.reply(m.chat, mcng, m)
                    if (psepick > 0) {
                        global.db.data.users[m.sender].psepick += psepick
                        m.reply(`You Get 🎁chest weapons epic ${psepick} item`)
                    }
                    if (psenjata > 0) {
                        global.db.data.users[m.sender].psenjata += psenjata
                        m.reply(`You Get 🎁chest weapons ${psenjata} item`)
                    }
                }, 38000)

                setTimeout(() => {
                    m.reply(`*The hook is pulled by the fish, and you try to pull it*`)
                }, 28000)

                setTimeout(() => {
                    m.reply(`*Waiting for the fish to be hooked*`)
                }, 18000)

                setTimeout(() => {
                    m.reply(`*you throw a fishing hook into the river*`)
                }, 8000)

                setTimeout(() => {
                    m.reply(`*you go fishing🎣*`)
                }, 0)

                global.db.data.users[m.sender].nila += nila
                global.db.data.users[m.sender].ikan += ikan
                global.db.data.users[m.sender].lele += lele
                global.db.data.users[m.sender].bawal += bawal
                global.db.data.users[m.sender].udang += udang
                global.db.data.users[m.sender].lastfishing += new Date()
                user.paus += paus
                user.kepiting += kepiting
            } else {
                m.reply(`You're already fishing, wait until ${timers}`)
            }
        } else {
            m.reply(`*[❗] kamu tidak punya kail pancingan 🎣*\n\nHarap ketik\n.craft pancing`)
        }
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error', m)
        if (owner) {
            let file = require.resolve(__filename)
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, `${file} error\nNo: *${m.sender.split`@`[0]}*\nCommand: *${m.text}*\n\n*${e}*`, MessageType.text)
            }
        }
    }
}

handler.help = ['mancing', 'fishing']
handler.tags = ['rpg']
handler.command = /^(mancing|memancing|fish)$/i

export default handler

// JANGAN DIUBAH!
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ ms, h, m, s })
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}