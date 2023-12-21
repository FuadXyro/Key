let handler = async (m, { conn, usedPrefix, command, args }) => {
    const changelogData = conn.changelog || [];

    const reply = (pesan) => {
        conn.reply(m.chat, pesan, m);
    };
    let pp = 'https://telegra.ph/file/3bd425e82956d703f2c60.jpg'

    if (args.length === 0 || args[0] === 'help') {
        reply(`Example: ${usedPrefix + command} list`);
    } else {
        const [action, ...rest] = args.join(" ").split("|");
        const actionType = action.trim().toLowerCase();

        switch (actionType) {
            case 'add':
                if (rest.length === 0) {
                    reply("Mohon berikan list update yang ingin ditambahkan.");
                } else {
                    const featureName = rest.join("|").trim();
                    changelogData.push(featureName);
                    conn.changelog = changelogData;
                    reply(`"${featureName}" telah ditambahkan ke changelog.`);
                }
                break;

            case 'del':
                if (rest.length === 0) {
                    reply("Mohon berikan indeks fitur yang ingin dihapus.");
                } else {
                    const indexToDelete = parseInt(rest[0]) - 1;
                    if (indexToDelete >= 0 && indexToDelete < changelogData.length) {
                        const deletedFeature = changelogData.splice(indexToDelete, 1)[0];
                        conn.changelog = changelogData;
                        reply(`"${deletedFeature}" telah dihapus dari changelog.`);
                    } else {
                        reply("Indeks tidak valid. Mohon berikan indeks yang valid untuk dihapus.");
                    }
                }
                break;

            case 'list':
                if (changelogData.length === 0) {
                    reply("Changelog saat ini kosong.");
                } else {
                    let changelogMessage = "📜 *CHANGELOG:*\n\n";
                    changelogData.forEach((feature, index) => {
                        changelogMessage += `${index + 1}. ${feature}\n`;
                    });
                    await conn.reply(m.chat, changelogMessage, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: ``, body: 'List Pembaruan Bot', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
                }
                break;

            default:
                reply("Perintah tidak valid. Gunakan " + usedPrefix + "changelog help untuk melihat perintah yang tersedia.");
                break;
        }
    }
};

handler.help = ["changelog"];
handler.tags = ["info"];
handler.command = /^(changelog)$/i;

export default handler;