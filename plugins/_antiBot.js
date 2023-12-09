const isNumber = x => typeof x === 'number' && !isNaN(x)

const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

export async function all(m) {
  try {
    if (!m.isGroup || !m.fromMe) return true

    const groupMetadata = (m.isGroup ? ((this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
    
    // Use descriptive variable names
    const { chats: allChats } = conn
    const participants = (m.isGroup ? groupMetadata.participants : []) || []
    const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {}
    const isBotAdmin = bot && bot?.admin || false

    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]

    console.log("Is Bot?:", m.key.id.startsWith('BAE5'))

    if (chat.antiBot) {
      const filteredMessages = getFilteredMessages(allChats)

      const filteredParticipants = getFilteredParticipants(filteredMessages)

      const formattedText = formatText(filteredParticipants)

      await conn.sendMessage(m.chat, { text: formattedText, mentions: filteredParticipants.map(({ participant }) => participant) }, { quoted: m })

      await delay(1000)

      if (!isBotAdmin) {
        return m.reply('Bot bukan admin..!')
      } else {
        let kick = await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        console.log("Terkick:", kick)
        await m.reply('Oke..')
      }
    }

    return true
  } catch (error) {
    console.error("An error occurred:", error)
    return true
  }
}

function getFilteredMessages(allChats) {
  return Object.values(allChats)
    .flatMap(({ messages }) => Object.entries(messages || {}))
    .filter(([messageId]) => messageId.startsWith('BAE5'))
    .reduce((obj, [messageId, message]) => ({ ...obj, [messageId]: message }), {})
}

function getFilteredParticipants(filteredMessages) {
  const seenParticipants = new Set()

  return Object.values(filteredMessages)
    .reduce((arr, { pushName, key: { participant, remoteJid } }) => {
      if (!seenParticipants.has(participant)) {
        seenParticipants.add(participant)
        arr.push({ pushName, participant: participant || remoteJid || '', remoteJid })
      }
      return arr
    }, [])
}

function formatText(filteredParticipants) {
  return filteredParticipants.map(({ pushName, participant, remoteJid }) => (
    `*@${participant.split('@')[0]}\n*ID:* ${remoteJid.split('@')[0]}\nTerdeteksi bot lain, kamu akan dikick`
  )).join('\n')
}