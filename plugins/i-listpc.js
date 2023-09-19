import fetch from "node-fetch"
let handler = async (m, { conn }) => {
  let pc = Object.keys(await conn.chats)

  const groups = Object.keys(await conn.groupFetchAllParticipating())

  conn.reply(
    m.chat,
    "List Chat private:\n\n" +
      `Total: ${
        pc == undefined
          ? "*0* Chat private"
          : "*" + `${pc.length - groups.length}` + "* Chat private"
      }\n` +
      pc.map((v) => "⭔ @" + v.replace(/@.+/, "")).join`\n`,
    m,
    { mentions: pc }
  )
}
handler.help = ["listpc"]
handler.tags = ["info"]
handler.command = /^listpc|pclist|daftarpc|pc$/i
handler.premium = true

export default handler