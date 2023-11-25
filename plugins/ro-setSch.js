import fs from "fs"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      m.reply(`*Example*: ${usedPrefix}${command} https://chat.whatsapp.com/channel`)
      return
    }

    const configFile = './config.js'
    let configData = fs.readFileSync(configFile, 'utf8')

    const newValue = `global.sch = "${text}"`

    // Use a regular expression with proper escaping for newValue
    configData = configData.replace(/global\.sch\s*=\s*".*"/, newValue)

    fs.writeFileSync(configFile, configData, 'utf8')

    m.reply('Berhasil mengubah link channel di config.js')
  } catch (error) {
  }
}

handler.help = ["setsch <link channel>"]
handler.tags = ["developer"]
handler.rowner = true
handler.command = /^setsch$/i

export default handler