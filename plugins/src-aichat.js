import Aichat from "../lib/aichat.js"
const model = "gpt-3.5-turbo"

let handler = async (m, { text }) => {
  if (!text) throw 'input! text'

  m.reply(wait)
  const messages = [{ role: 'system', content: 'Anda adalah asisten yang membantu.' }, { role: 'user', content: encodeURIComponent(text) }]

  try {
    const output = await Aichat.createAsync(model, messages)
    m.reply(output)
  } catch (error) {
    console.error('Error:', error)
    m.reply(eror)
  }
}

handler.help = ["aichat"]
handler.tags = ["internet"]
handler.command = /^(aichat)$/i

export default handler