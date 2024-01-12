let better = {};

async function handler(m, { conn, args, usedPrefix, command }) {
    if (better[m.sender]) return m.reply('Kamu sedang meminta bet!');
    
    const user = global.db.data.users[m.sender];
    const count = (args[0] && isNumber(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1) * 1;

    if (user.money < count) return m.reply('💹 Uang kamu tidak cukup!!');   
    
    const hasil = formatRupiah(Number(count));
    if (count >= 7000000) throw 'Max: 6999999';

    const txt = `Apakah anda yakin mau melakukan judi (Y/n)\n\n*Taruhan:* ${count} 💹\n⏰ 60s Timeout`;
    const confirm = `${txt}`;

    const { key } = await conn.reply(m.chat, confirm, m, { mentions: [m.sender] });

    better[m.sender] = {
        sender: m.sender,
        message: m,
        count,
        hasil,
        key,
        pesan: conn,
        timeout: setTimeout(() => (conn.sendMessage(m.chat, { delete: key }), delete better[m.sender]), 60 * 1000)
    };
}

handler.before = async m => {
    if (m.isBaileys || !(m.sender in better) || !m.text || m.id === better[m.sender].message.id) return;

    const { timeout, sender, message, count, key } = better[m.sender];
    const user = global.db.data.users[m.sender];

    if (/(✔️|y(es)?)/gi.test(m.text.toLowerCase())) {
        const Bot = Math.ceil(Math.random() * 91);
        const Kamu = Math.floor(Math.random() * 71);
        let status = 'Kalah';

        if (Bot < Kamu) {
            user.money += count;
            status = 'Menang';
        } else if (Bot > Kamu) {
            user.money -= count;
        } else {
            status = 'Seri';
            user.money += Math.floor(count / 1.5);
        }
        let pp = 'https://telegra.ph/file/b69bee339ed849d61256e.jpg';
        let teks = `        
| *PLAYERS* | *POINT* |
*🤖 ${namebot} :* ${Bot}
*👤 ${m.name} :* ${Kamu}

⟩ ${m.name} *${status}*, ${m.name} ${status == 'Menang' ? `Mendapatkan *+${count * 2}*` : status == 'Kalah' ? `Kehilangan *-${count * 1}*` : `Mendapatkan *+${Math.floor(count / 1.5)}*`} Money 💹`;
        await conn.reply(m.chat, teks, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: ']=======❏ J U D I ❏=======[', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}});
        clearTimeout(timeout);
        delete better[m.sender];
        return true;
    }

    if (/(✖️|n(o)?)/gi.test(m.text.toLowerCase())) {
        clearTimeout(timeout);
        m.reply('Rejected');
        delete better[m.sender];
        return true;
    }
};

handler.help = ['judi [jumlah]'];
handler.tags = ['rpg'];
handler.command = /^(judi|bet)$/i;

export default handler;

function isNumber(x) {
    return !isNaN(x);
}

function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}