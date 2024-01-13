let handler = async (m, {
    conn,
    command,
    text
}) => {
    conn.temamenu = conn.temamenu ? conn.temamenu : {
        id: 1
    }
    let themes = {
        1: 'Normal',
        2: 'Newsletter',
    };

    if (text) {
        let themeIndex = parseInt(text);
        if (isNaN(themeIndex) || !themes[themeIndex]) {
            conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
            return;
        }
        conn.temamenu = {
            id: themeIndex
        };
        conn.reply(m.chat, 'Tema berhasil diatur\n' + themes[themeIndex], m);
    } else {
        conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
        return;
    }
};
handler.help = ['temabot']
handler.tags = ['developer']
handler.command = /^(temabot)$/i
handler.rowner = true

export default handler