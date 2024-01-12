let handler = async (m, { conn, usedPrefix, text, command }) => {
    var user = global.db.data.users[m.sender];
    
    global.skill = ["swordmaster", "necromancer", "witch", "Archer", "magicswordmaster", "thief", "shadow", "fuadxy"];
    
    var bintang = {
        "satu": "⭐",
        "dua": "⭐⭐",
        "tiga": "⭐⭐⭐",
        "empat": "⭐⭐⭐⭐",
        "lima": "⭐⭐⭐⭐⭐",
        "Enam": "⭐⭐⭐⭐⭐⭐",
        "tujuh": "🌟🌟🌟🌟🌟🌟🌟"
    }; // star ratings for skills
    
    let skil = text.trim().toLowerCase(); // to filter text
    
    if (!global.skill.includes(skil)) throw `Select *skill🃏* what do you want/pilih skill apa yg kamu inginkan:\n\n${global.skill.map(skill => `› ${skill}`).join('\n')}\n\nHow To use/Cara menggunakan:\n${usedPrefix + command} <nameskill>\n\nExample/Contoh:\n${usedPrefix + command} shadow`;
    
    if (user.skill == "") {
        user.skill = skil;
        await conn.reply(m.chat, `Anda telah memilih Skill ${skil}`, fkontak);
    } else if (user.skill) {
        await conn.reply(m.chat, `Anda Sudah Punya skill ${user.skill} Tidak bisa diganti`, fkontak);
    }
};

handler.help = ['selectskill <type>'];
handler.tags = ['rpg'];
handler.command = /^(selectskill)$/i;

export default handler;