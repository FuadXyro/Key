const handler = async (m, {
    conn,
    text,
    groupMetadata
}) => {
    await conn.sendPresenceUpdate('composing', m.chat);
    const lama = 86400000 * 7;
    const now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    const milliseconds = new Date(now).getTime();

    let member = groupMetadata.participants.map(v => v.id);
    const pesan = text ? text : "🚩 Please be active in the group because there will be member cleaning at any time";
    let total = 0;
    const sider = [];
    for (let i = 0; i < member.length; i++) {
        let users = m.isGroup ? groupMetadata.participants.find(u => u.id == member[i]) : {};
        if ((typeof global.db.data.users[member[i]] == 'undefined' || milliseconds - global.db.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) {
            if (typeof global.db.data.users[member[i]] !== 'undefined') {
                if (global.db.data.users[member[i]].banned == true) {
                    total++;
                    sider.push(member[i]);
                }
            } else {
                total++;
                sider.push(member[i]);
            }
        }
    }
    if (total == 0) return conn.reply(m.chat, `🚩 *There are no siders in this group.*`, m);
    conn.reply(m.chat, `*${total}/${member.length}* anggota grup *${await conn.getName(m.chat)}* adalah sider dengan alasan :\n1. Tidak aktif selama lebih dari 7 hari\n2. Baru join tetapi tidak pernah nimbrung\n\n_“${pesan}”_\n\n*LIST SIDER :*\n${sider.map(v => '  ○ @' + v.replace(/@.+/, '' + typeof global.db.data.users[v] == "undefined" ? ' Sider ' : ' Off ' + msToDate(milliseconds - global.db.data.users[v].lastseen))).join('\n')}`, m, {
        contextInfo: {
            mentionedJid: sider
        }
    });
};
handler.help = ['gcsider'];
handler.tags = ['group'];
handler.command = /^(gcsider)$/i;
handler.group = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function msToDate(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    if (d == 0 && h == 0 && m == 0) {
        return "Baru Saja";
    } else {
        return [d, 'H ', h, 'J '].map(v => v.toString().padStart(2, 0)).join('');
    }
}