import fetch from 'node-fetch';
import { tebakgambar } from '@bochilteam/scraper';
import { webp2png } from '../lib/webp2mp4.js';

let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
    if (!m.isGroup) return;
    if (!global.db.data.chats[m.chat].game) {
        return conn.reply(m.chat, "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game", fkontak);
    }

    conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {};
    let id = m.chat;
    if (id in conn.tebakingambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakingambar[id][0]);
        throw false;
    }
    let json = await tebakgambar();
    let caption = `*${command.toUpperCase()}*
Rangkailah Gambar Ini
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgam untuk bantuan
Bonus: ${poin} XP
    `.trim();
    let pp = await imageUrl(json.img);
    conn.tebakingambar[id] = [
        await conn.reply(m.chat, caption, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: '乂 T E B A K  G A M B A R', body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true } } }),
        json, poin,
        setTimeout(() => {
            if (conn.tebakingambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakingambar[id][0]);
            delete conn.tebakingambar[id];
        }, timeout)
    ];
};

handler.help = ['tebakgambar'];
handler.tags = ['game'];
handler.command = /^tebakgambar/i;

export default handler;

async function imageUrl(url) {
    try {
        let Blobs = await (await fetch(url)).blob();
        let arrayBuffer = await Blobs.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);
        let pngBuffer = await webp2png(buffer);
        return pngBuffer;
    } catch (error) {
        console.error("Error:", error);
    }
}