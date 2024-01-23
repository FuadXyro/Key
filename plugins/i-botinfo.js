import { cpus as _cpus, totalmem, freemem } from 'os'
import util from 'util'
import os from 'os'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import { join } from 'path'
import { promises } from 'fs'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn, usedPrefix, __dirname, text, command }) => {
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let unreg = Object.keys(db.data.users).filter(user => !db.data.users[user].registered).length
    let reg = Object.keys(db.data.users).filter(user => db.data.users[user].registered).length
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
    const used = process.memoryUsage()
    const cpus = _cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
        return cpu
    })
    const cpu = cpus.reduce((last, cpu, _, {
        length
    }) => {
        last.total += cpu.total
        last.speed += cpu.speed / length
        last.times.user += cpu.times.user
        last.times.nice += cpu.times.nice
        last.times.sys += cpu.times.sys
        last.times.idle += cpu.times.idle
        last.times.irq += cpu.times.irq
        return last
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    })
    let NotDetect = 'Not Detect'
    let cpux = osu.cpu
    let cpuCore = cpux.count()
    let drive = osu.drive
    let mem = osu.mem
    let netstat = osu.netstat
    let HostN = osu.os.hostname()
    let OS = osu.os.platform()
    let cpuModel = cpux.model()
    let cpuPer
    let p1 = cpux.usage().then(cpuPercentage => {
        cpuPer = cpuPercentage
    }).catch(() => {
        cpuPer = NotDetect
    })
    let driveTotal, driveUsed, drivePer
    let p2 = drive.info().then(info => {
        driveTotal = (info.totalGb + ' GB'),
            driveUsed = info.usedGb,
            drivePer = (info.usedPercentage + '%')
    }).catch(() => {
        driveTotal = NotDetect,
            driveUsed = NotDetect,
            drivePer = NotDetect
    })
    let ramTotal, ramUsed
    let p3 = mem.info().then(info => {
        ramTotal = info.totalMemMb,
            ramUsed = info.usedMemMb
    }).catch(() => {
        ramTotal = NotDetect,
            ramUsed = NotDetect
    })
    let netsIn, netsOut
    let p4 = netstat.inOut().then(info => {
        netsIn = (info.total.inputMb + ' MB'),
            netsOut = (info.total.outputMb + ' MB')
    }).catch(() => {
        netsIn = NotDetect,
            netsOut = NotDetect
    })
    await Promise.all([p1, p2, p3, p4])
    let _ramTotal = (ramTotal + ' MB')
    let cek = await (await fetch("https://api.myip.com")).json().catch(_ => 'error')

    let ip = (cek == 'error' ? 'ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ' : cek.ip)
    let cr = (cek == 'error' ? 'ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ' : cek.country)
    let cc = (cek == 'error' ? 'ɴᴏᴛ ᴅᴇᴛᴇᴄᴛ' : cek.cc)

  let bot = global.db.data.settings[conn.user.jid]
  let old = performance.now()
  let neww = performance.now()
  let speed = neww - old
  let mentionedJid = [m.sender]
  let pp = 'https://telegra.ph/file/74e827ac80fad3a1ad2ec.jpg'
let info = `
*_• BOT INFO_*
*Nama :* ${namebot}
*Versi :* V3
*Library :* Baileys
*Developer :* 
    *- FuadXyro* 🇮🇩
        • +62 838-377-09331
    *- Fall* 🇮🇩
        • +62 831-3838-1932

*_• DATA BOT_*
*❍*: *Database :* ${totalreg} Pengguna
     • User Registrasi: ${reg}
     • User Yang Tidak Registrasi: ${unreg}
*❍*: *Size Database :* ${megabit()} MB

*_• PENGATURAN_*
*Group Only:* ${global.opts['gconly'] ? '✓' : '❌'}
*Restrict:* ${global.opts['restrict'] ? '✓' : '❌'}

*_• OS INFO_*
*Uptime :* ${uptime}
*Platform :* ${os.platform()}

*_• SERVER INFO_*
*Ping:* ${Math.round(neww - old)} ms
*OS :* ${OS}
*Country :* ${cr}
*CPU Model :* ${cpuModel}
*CPU Core :* ${cpuCore} Core
*CPU :* ${cpuPer}%
*Ram :* ${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})
*Drive :* ${driveUsed} / ${driveTotal} (${drivePer})
*Internet IN :* ${netsIn}
*Internet OUT :* ${netsOut}
`.trim() 
await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: `${htki} B O T  I N F O ${htka}`, body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
}
handler.help = ['botinfo']
handler.tags = ['info']
handler.command = /^(botinfo)$/i

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function megabit() {
    let stats = fs.statSync("database.json")
    let ukuran_mb = stats.size / (1024 * 1024)
    return ukuran_mb.toFixed(1)
}