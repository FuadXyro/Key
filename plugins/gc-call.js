let handler = async (m, { conn, command }) => {
 
let txt = `${namebot} Telah memulai panggilan.`
conn.relayMessage(m.chat, { scheduledCallCreationMessage: { callType: "AUDIO", scheduledTimestampMs: Date.now(),
title: txt}}, {})
}

handler.help = ['callgc']
handler.tags = ['group']
handler.command = /^(callgc)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler