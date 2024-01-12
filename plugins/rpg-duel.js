let handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0] || !m.mentionedJid[0]) {
        return conn.reply(
            m.chat,
            `Ex: ${usedPrefix}duel jumlah @lawan`
        );
    }

    conn.duel = conn.duel || {};

    if (m.chat in conn.duel) {
        return m.reply("Masih ada yang melakukan duel disini, tunggu sampai selesai!!");
    }

    if (!global.db.data.users[m.mentionedJid[0]]) {
        return m.reply(`Lawan tidak terdaftar di database bot atau format salah. ${usedPrefix}duel <jumlah> @lawan`);
    }

    let count = args[0] ? (/all/i.test(args[0]) ? Math.floor(global.db.data.users[m.sender].money / 1) : parseInt(args[0])) : 1;
    count = Math.max(1, count);

    if (global.db.data.users[m.sender].money >= count * 1 && global.db.data.users[m.mentionedJid[0]].money >= count * 1) {
        conn.duel[m.chat] = {
            player_1: m.sender,
            player_2: m.mentionedJid[0],
            count: count,
        };

        let pp = 'https://telegra.ph/file/1de98755e6b66bc56cf3e.jpg';
        let caption = `      
@${m.sender.split`@`[0]} 
     _*MENANTANG*_
@${m.mentionedJid[0].split`@`[0]} 

Untuk Bermain duel Dengan Taruhan ${count}

Reply Pesan Ini  Dan Ketik Di Bawah Untuk *Terima* Atau *Tolak*
`;

        await conn.reply(m.chat, caption, m, {
            contextInfo: {
                mentionedJid: [m.sender, m.mentionedJid[0]],
                forwardingScore: 9999,
                isForwarded: true,
                externalAdReply: {
                    mediaType: 1,
                    mediaUrl: pp,
                    title: ']=======❏ D U E L ❏=======[',
                    body: '🌱┊ RPG WhatsApp Bot',
                    thumbnail: { url: pp },
                    thumbnailUrl: pp,
                    sourceUrl: false,
                    renderLargerThumbnail: true,
                },
            },
        });
    } else {
        if (global.db.data.users[m.sender].money <= count) {
            return m.reply("Money kamu tidak mencukupi untuk duel. Silahkan *.claim* terlebih dahulu!");
        }
        if (global.db.data.users[m.mentionedJid[0]].money <= count) {
            return m.reply("Money lawan kamu tidak mencukupi untuk duel. Silahkan suruh lawan kamu *.claim* terlebih dahulu!");
        }
    }
};

handler.help = ["duel <jumlah> @lawan"];
handler.tags = ["rpg"];
handler.command = /^(duel)$/i;
handler.group = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}