let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let monsters = [{
            area: 1,
            name: "Sam dan Dean Winchester)"
        },
        {
            area: 1,
            name: "Geralt of Rivia"
        },
        {
            area: 1,
            name: "Buffy Summers"
        },
        {
            area: 2,
            name: "Aragorn (Strider)"
        },
        {
            area: 2,
            name: "Dante"
        },
        {
            area: 2,
            name: "Ellen Ripley"
        },
        {
            area: 3,
            name: "Demon"
        },
        {
            area: 3,
            name: "Eren Yeager"
        },
        {
            area: 3,
            name: "Blade (Eric Brooks)"
        },
        {
            area: 4,
            name: "Daryl Dixon"
        },
        {
            area: 4,
            name: "Ezio Auditore da Firenze"
        },
        {
            area: 4,
            name: "Zombie"
        },
        {
            area: 5,
            name: "Nova Swift"
        },
        {
            area: 5,
            name: "Valentina Vortex"
        },
        {
            area: 5,
            name: "Maximus Blade"
        },
        {
            area: 6,
            name: "Ezekiel Graves"
        },
        {
            area: 6,
            name: "Astrid Stormrider"
        },
        {
            area: 6,
            name: "Victor Nightshade"
        },
        {
            area: 7,
            name: "Cecelia"
        },
        {
            area: 7,
            name: "Giant Piranha"
        },
        {
            area: 7,
            name: "Artemis Ember"
        },
        {
            area: 8,
            name: "Selene Thorn"
        },
        {
            area: 8,
            name: "Declan Falcon"
        },
        {
            area: 8,
            name: "Freya Moonlight"
        },
        {
            area: 9,
            name: "Demon"
        },
        {
            area: 9,
            name: "Harpy"
        },
        {
            area: 9,
            name: "Killer Robot"
        },
        {
            area: 10,
            name: "Dullahan"
        },
        {
            area: 10,
            name: "Manticore"
        },
        {
            area: 10,
            name: "Killer Robot"
        },
        {
            area: 11,
            name: "Baby Dragon"
        },
        {
            area: 11,
            name: "Young Dragon"
        },
        {
            area: 11,
            name: "Scaled Baby Dragon"
        },
        {
            area: 12,
            name: "Kid Dragon"
        },
        {
            area: 12,
            name: "Not so young Dragon"
        },
        {
            area: 12,
            name: "Scaled Kid Dragon"
        },
        {
            area: 13,
            name: "Definitely not so young Dragon"
        },
        {
            area: 13,
            name: "Teen Dragon"
        },
        {
            area: 13,
            name: "Scaled Teen Dragon"
        },
    ]
    let player = global.db.data.users[m.sender]
    let pengirim = m.sender.split("@")[0]
    let __timers = (new Date - global.db.data.users[m.sender].lastkill)
    let _timers = (1200000 - __timers)
    let timers = clockString(_timers)

    let area_monsters = monsters[Math.floor(Math.random() * monsters.length)]
    let monster = area_monsters.name
    area_monsters = area_monsters.area
    let monsterName = monster.toUpperCase()

    if (new Date - global.db.data.users[m.sender].lastkill > 1200000) {
        let coins = parseInt(Math.floor(Math.random() * 100000))
        let diamond = parseInt(Math.floor(Math.random() * 1000000))
        let emerald = parseInt(Math.floor(Math.random() * 10000000))       
        let exp = parseInt(Math.floor(Math.random() * 129229800))
        let _healing = `${Math.floor(Math.random() * 100)}`.trim()
        let healing = (_healing * 1)
        player.health -= healing
        player.lastkill = new Date * 1 // waktu kill 2menit

        if (player.health < 0) {
            let pp = 'https://telegra.ph/file/ac048abb076b26dc5a9c1.jpg'
            let msg = `*@${pengirim}* Anda Mati Di Bunuh Oleh.
            *@${m.mentionedJid[0].split`@`[0]}: ${monsterName}`
            if (player.level > 0) {
                if (player.sword > 0) {
                    player.level -= 1
                    player.sword -= 5
                    player.exp -= exp * 1
                    msg += `\nLevel Anda Turun 1 Karena Mati Saat War!\nSword Anda Berkurang 5 Karena Mati Saat War!`
                }
            }
            player.health = 100          
            await conn.reply(m.chat, msg, m, { contextInfo: { mentionedJid: conn.parseMention(msg), forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: '⌂ K I L L', body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
            return
        }

        player.money += coins * 1
        player.diamond += diamond * 1
        player.emerald += emerald * 1
        player.exp += exp * 1


let pp =  'https://telegra.ph/file/f388d0c3f21395b1a285b.jpg'
let pesan = `Berhasil mengekill*
*@${who.split('@')[0]}* Moster: ${monsterName}
      
*@${pengirim}* Karakter: Manusia.

@${pengirim} sudah membunuhnya.
 hasil yang didapatkan:
• Money: ${rp.format(coins)}
• Diamond: ${new Intl.NumberFormat('en-US').format(diamond)}
• Emerald: ${new Intl.NumberFormat('en-US').format(emerald)}
• Exp: ${new Intl.NumberFormat('en-US').format(exp)}
• Berkurang -${healing} Health
• Tersisa ${player.health} Health

`
        await conn.reply(m.chat, pesan, m, { contextInfo: { mentionedJid: [m.sender, m.mentionedJid[0]], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: '⌂ K I L L', body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
    } else throw `Tunggu ${timers} Untuk Mengekill Lagi`
}

handler.help = ['kill']
handler.tags = ['game']
handler.command = /^kill/i
handler.limit = true
handler.group = true
handler.fail = null

export default handler

const rp = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['\n' + d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}