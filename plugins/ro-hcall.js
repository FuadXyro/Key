let handler = async (m, { conn, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'Mohon berikan teks untuk panggilan grup.', m)
  }

  if (command === 'hcall') {
    conn.relayMessage(m.chat, {
      scheduledCallCreationMessage: {
        callType: "AUDIO",
        scheduledTimestampMs: Date.now(),
        title: text
      }
    }, {})
  }
}

handler.help = ['hcall <teks>']
handler.tags = ['group']
handler.command = /^(hcall)$/i
handler.rowner = false
handler.botAdmin = false
handler.group = true

export default handler