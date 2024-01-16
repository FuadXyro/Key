const activePolls = {}

async function createPoll(conn, groupId, question, options) {
  const pollId = Math.floor(Math.random() * 999999) + 1

  const poll = {
    pollId: pollId.toString(),
    title: question,
    options: options,
    rowId: 'poll_' + pollId,
    min: 1,
    max: 1,
    type: 'quiz',
    question: question,
    duration: 600,
    closeTime: 0,
  }

  activePolls[groupId] = poll

  const pollMessage = {
    poll: poll,
  }

  await conn.sendMessage(groupId, pollMessage, 'extendedTextMessage')
}

let handler = async (m, { conn, text }) => {
  const groupId = m.chat
  const participant = m.participant || m.sender

  if (!text) {
    throw 'Format yang benar: *poll* | *pertanyaan* | *pilihan1* | *pilihan2* | ...'
  }

  const args = text.split('|').map(arg => arg.trim())
  const question = args[1]
  const options = args.slice(2)

  try {
    await createPoll(conn, groupId, question, options)

    await conn.sendMessage(
      groupId,
      `Poll telah dibuat oleh @${participant.split('@')[0]}. Gunakan *vote pollId* untuk memilih.`,
      'text',
      { quoted: m }
    )
  } catch (error) {
    await conn.sendMessage(groupId, error, 'text', { quoted: m })
  }
}

handler.help = ['poll']
handler.tags = ['group']
handler.command = /^poll$/i

export default handler