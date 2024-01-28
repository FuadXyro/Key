let handler = async (m, {
    conn,
    usedPrefix,
    command,
    args,
    isOwner,
    isAdmin,
    isROwner
}) => {
    const features = ["adminonly", "antibot", "antiFoto", "antiVideo", "antiAudio", "antiCall", "antiluar", "antiDelete", "antiLink", "antiLinkFb", "antiLinkHttp", "antiLinkIg", "antiLinkTel", "antiLinkTik", "antiLinkWa", "antiLinkYt", "antiSatir", "antiSticker", "antiVirtex", "antiToxic", "antibule", "antivirus", "antiphising", "owneronly", "autoBio", "autoPresence", "autoReply", "autoSticker", "autoVn", "viewStory", "bcjoin", "detect", "getmsg", "nsfw", "antiSpam", "simi", "updateAnime", "updateAnimeNews", "viewonce", "welcome", "autoread", "gconly", "nyimak", "pconly", "self", "game", "swonly", "lastAnime", "latestNews"];
    const activeFeatures = ["antiDelete", "detect", "getmsg", "lastAnime", "latestNews", "welcome"];

    const result = features.map((f, i) => {
        const isActive = activeFeatures.includes(f) ? !global.db.data.chats[m.chat][f] : global.db.data.chats[m.chat][f];
        return `${(i + 1).toString().padEnd(2)}. ${f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).padEnd(18)} ${isActive ? "ON" : "OFF"}`;
    }).join('\n').trimEnd();

    const isEnable = !/false|disable|(turn)?off|0/i.test(command);
    const chat = global.db.data.chats[m.chat];
    const _chat = global.db.data.settings[conn.user.jid];

    const input = args[0];
    const isNumber = !isNaN(input);
    const featureName = isNumber ? features[parseInt(input) - 1] : input;
    const responseText = "```" + `${result}\n` + "```";
    const featureStatus = `*# Feature*            *Mode*\n${"-".repeat(33)}\n${responseText}`;
    const pp = 'https://telegra.ph/file/88f9d8cf821c7e39c16fb.jpg'
    const listEnab = `🛠️ *DAFTAR FITUR*\n${featureStatus}\n*📝 CARA MENGGUNAKAN:*\n→ ${usedPrefix + command} [nomor atau nama fitur]`.trimStart();

    if (!features.includes(featureName)) return await conn.reply(m.chat, listEnab, fkontak);

    if (activeFeatures.includes(featureName)) {
        chat[featureName] = !isEnable;
    } else {
        if (["autoChat"].includes(featureName)) {
            conn.autochat = conn.autochat || {};
            conn.autochat.status = isEnable;
        } else if (["self", "pconly", "gconly", "swonly", "rpg", "autoread", "jadibot", "restrict", "autorestart", "autorestart", "antibot"].includes(featureName)) {
            _chat[featureName] = isEnable;
        } else {
            chat[featureName] = isEnable;
        }
    }      
    await conn.reply(m.chat, `Feature *${featureName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON' : 'OFF'}*`, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${namebot}`, body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}})
    
}

handler.help = ["en", "dis"].map(v => v + "able <nomor atau nama fitur>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;

export default handler;