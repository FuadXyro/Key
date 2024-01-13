function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let handler = async (m, {
    conn,
    args,
    usedPrefix
}) => {
    const user = global.db.data.users[m.sender];
    const lastgiftTime = user.lastgift || 0;
    const currentTime = new Date().getTime();
    const cooldownDuration = 3600000;

    conn.redeem = conn.redeem || {};

    if (currentTime - lastgiftTime < cooldownDuration) {
        const remainingCooldown = cooldownDuration - (currentTime - lastgiftTime);
        const remainingTime = getRemainingTime(remainingCooldown);
        return conn.reply(m.chat, `⏰ Maaf, kamu harus menunggu ${remainingTime} lagi sebelum menggunakan Redeem lagi!`, m);
    }

    const today = new Date().toLocaleDateString();
    let redeem = conn.redeem[m.sender] || (conn.redeem[m.sender] = {
        code: [],
        time: today
    });

    if (!args[0]) return conn.reply(m.chat, `❓ Kamu belum memasukkan Kode Redem kamu!\n\nContoh: *${usedPrefix}redeem YA4V0*`, m);

    const validGiftcode = redeem.code.filter(code => args[0] === code);

    if (!validGiftcode.length) {
        const remainingTime = getRemainingTime(cooldownDuration);
        return conn.reply(m.chat, `Maaf, kode Redeem tidak valid atau sudah digunakan. Silahkan coba lagi setelah ${remainingTime}!`, m);
    }

    const maxExp = 10000,
        maxMoney = 10000;
    const pp = 'https://telegra.ph/file/78f25c49a8f96d709fb20.jpg'
    const rewards = shuffle([{
        text: '💠 XP',
        value: Math.min(Math.floor(Math.random() * maxExp), maxExp)
    }, {
        text: '🎫 Limit',
        value: Math.min(Math.floor(Math.random() * 5) + 1, 5)
    }, {
        text: '💹 Money',
        value: Math.min(Math.floor(Math.random() * maxMoney), maxMoney)
    }, {
        text: '🥤 Potion',
        value: Math.min(Math.floor(Math.random() * 5) + 1, 5)
    }]);

    await conn.reply(m.chat, `*🎉 SELAMAT!*\nKamu telah mendapatkan:\n${rewards.map(r => `${r.text}: ${r.value}`).join('\n')}\n\n\nNote ( ! ) Jika menemukan bug/error pada fitur² bot, harap hubungi owner dengan mengetik *.owner*`, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363144038483540@newsletter', newsletterName: author, serverMessageId: -1 }, businessMessageForwardInfo: { businessOwnerJid: "6283837709331" }, externalAdReply: { mediaType: 1, mediaUrl: sch, title: `${namebot}`, body: '#2021-2024', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: sch, renderLargerThumbnail: true }}})


    user.exp += rewards.find(r => r.text === '💠 XP').value;
    user.limit += rewards.find(r => r.text === '🎫 Limit').value;
    user.money += rewards.find(r => r.text === '💹 Money').value;
    user.potion += rewards.find(r => r.text === '🥤 Potion').value;

    redeem.code = redeem.code.filter(code => code !== args[0]); // Remove used code
    user.lastgift = currentTime; // Update lastgift time

    setTimeout(() => conn.reply(m.chat, '⏰ Waktunya menggunakan Redeem lagi!\nKetik *Redeem* untuk mendapatkan hadiah spesial.', m), cooldownDuration);
};

handler.help = ['redeem <kode>'];
handler.tags = ['rpg'];
handler.command = /^redeem$/i;

export default handler;

function getRemainingTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours > 0 ? `${hours} jam ` : ''}${minutes > 0 ? `${minutes} menit` : ''}`.trim();
}