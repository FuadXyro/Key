import {
    createCanvas,
    registerFont
} from 'canvas';
import {
    promises as fsPromises
} from 'fs';

import {
    createHash
} from "crypto"
import fetch from "node-fetch"
let Reg = /\|?(.*)([^\w\s])([0-9]*)$/i

let confirmation = {}
async function handler(m, {
    conn,
    text,
    usedPrefix,
    command
}) {
    if (confirmation[m.sender]) return m.reply('Kamu sedang meminta verifikasi!')
    let user = global.db.data.users[m.sender]
    if (user.registered === true) throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`
    const umurRandom = Math.floor(Math.random() * 100) + 1;
    const formatSalah = `( ! ) Format salah\n\n◉ Penggunaan perintah : *${usedPrefix + command} nama.umur*\n📌Contoh : *${usedPrefix + command}* ${m.name.split('\n')[0]}.${umurRandom}`
    if (!Reg.test(text)) throw formatSalah
    let [_, name, splitter, age] = text.match(Reg)
    if (!name) throw `Hai kak ${m.name} Nama tidak boleh kosong (Alphanumeric)`
    if (!age) throw `Hai kak ${m.name} Umur tidak boleh kosong (Angka)`
    age = parseInt(age)
    if (age > 1000) throw "*Gak boleh!*,\nTua amat dah 🗿"
    if (age < 5) throw "*Gak boleh!*,\nBanyak pedo 🗿"
    if (user.name && user.name.trim() === name.trim()) throw "Nama sudah dipakai"

    let sn = createHash("md5").update(m.sender).digest("hex")
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    let cap = `
╭━━「 *ᴜsᴇʀs* 」
│▸ *sᴛᴀᴛᴜs:* ✓ sᴜᴄᴄᴇssғᴜʟ
│▸ *ɴᴀᴍᴇ:* ${m.name.split('\n')[0]}
│▸ *ᴀɢᴇ:* ${age} ʏᴇᴀʀs
│▸ *sɴ:* ${sn}
╰═┅═━––––––๑

ᴅᴀᴛᴀ ᴜsᴇʀ ʏᴀɴɢ ᴛᴇʀsɪᴍᴘᴀɴ ᴅɪᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ, ᴅɪᴊᴀᴍɪɴ ᴀᴍᴀɴ ᴛᴀɴᴘᴀ ᴛᴇʀsʜᴀʀᴇ (. ❛ ᴗ ❛.)
`
    const json = await createOtpCanvas();

    let confirm = "💡 Reply pesan ini dengan mengetik kode Captcha yang ada pada gambar di atas ( ! )";
    
     let { key } = await conn.sendFile(m.chat, json.image, '', confirm, m)
    confirmation[m.sender] = {
        message: m,
        sender: m.sender,
        otp: json.otp,
        caption: cap,
        pesan: conn,
        age,
        user,
        name,
        key,
        timeout: setTimeout(() => (
        conn.sendMessage(m.chat, { delete: key }),
        delete confirmation[m.sender]
        ), 60 * 1000)
    }
}

handler.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let {
        timeout,
        otp,
        message,
        sender,
        pesan,
        caption,
        user,
        name,
        age,
        key
    } = confirmation[m.sender]
    if (m.id === message.id) return

    if (m.text == otp) {
        user.name = name.trim()
        user.age = age
        user.regTime = +new Date
        user.registered = true
        let pp = 'https://telegra.ph/file/1ce64fe1a822f203e4ef6.jpg'
        let benar = `( ✓ ) OTP Benar!\n${m.name.split('\n')[0]} Berhasil di verifikasi!`
        pesan.reply(m.chat, benar + '\n\n' + caption, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: `${namebot}`, body: '#2021-2023', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
        clearTimeout(timeout)
        pesan.sendMessage(m.chat, { delete: key })
        delete confirmation[sender]
    } else {
        m.reply(`️( ✘ ) OTP Salah!\n${m.name.split('\n')[0]} Gagal verifikasi!`)
        clearTimeout(timeout)
        pesan.sendMessage(m.chat, { delete: key })
        delete confirmation[sender]
    }
}

handler.help = ["daftar", "register"].map(v => v + " <nama>.<umur>")
handler.tags = ["xp"]
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function isNumber(x) {
    return !isNaN(x)
}

function generateRandomCharacter() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return characters[Math.floor(Math.random() * characters.length)];
}

async function createOtpCanvas() {
    const files = await fsPromises.readdir('./src/font/');
    const canvas = createCanvas(150, 50);
    const ctx = canvas.getContext('2d');
    const codetext = Array.from({
        length: 4
    }, generateRandomCharacter).join('');
    const randomFont = `./src/font/${files[Math.floor(Math.random() * files.length)]}`;
    registerFont(randomFont, {
        family: randomFont
    });

    ctx.fillStyle = '#27292b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Captcha';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(codetext, 75, 35, 140);

    return {
        image: canvas.toBuffer(),
        otp: codetext
    }
}