let handler = async (m, {
    conn,
    usedPrefix,
    text,
    command,
    args
}) => {
    let pc = Object.entries(conn.chats)
    .map(([nama, isi]) => ({
        nama,
        ...isi
    }))
    .filter(v => !v.nama.endsWith('g.us') && v.nama.endsWith('s.whatsapp.net'));

if (!args[0]) {
    let list = pc.map((chat, index) => {
        const messagesCount = chat.messages ? Object.keys(chat.messages).length : 0;
        return `${index + 1}. 👤 *Name:* ${chat.name || 'xxxx'}\n📞 *Number:* ${chat.id.split('@')[0] || 'xxxx'}\n🔵 *Presences:* ${chat.presences || 'xxx'}\n✉️ *Messages:* ${messagesCount}`;
    }).join('\n\n');
    m.reply(`📺 Private List:\n\n${list}`);
} else {
    let i = parseInt(args[0]) - 1;
    if (!pc[i]) {
        return m.reply('Invalid index!');
    }

    let pp = await conn.profilePictureUrl(pc[i].id, 'image').catch(_ => false);
    let name = pc[i].name || 'Tidak diketahui';
    let id = pc[i].id.replace('@s.whatsapp.net', '');
    let presences = pc[i].presences || 'Tidak diketahui';

    let str = `*Information about ${await conn.getName(pc[i].id)}*\n\n`;
    str += `👤 *Name:* ${name}\n📞 *ID:* @${id}\n🔵 *Presences:* ${presences}`;

    if (pp) {
        await conn.sendFile(m.chat, pp, 'profile.jpg', str, m, null, {
            caption: str,
            mentions: [pc[i].id]
        });
    } else {
        m.reply(str);
    }s
}

}
handler.help = ['listpc']
handler.tags = ['info']
handler.command = ['listpc']

export default handler