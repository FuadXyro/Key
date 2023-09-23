let handler = async (m, {
    conn
}) => {
await conn.reply(m.chat, "Itu Adalah nomor Moderator Bot", m)
}

handler.command = handler.help = ['mods']
handler.tags = ['info']
handler.limit = true

export default handler