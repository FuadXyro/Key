import fs from "fs"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      m.reply(`*Example*: ${usedPrefix}${command} https://chat.whatsapp.com/id`)
      return
    }

    const configFile = './config.js'
    let configData = fs.readFileSync(configFile, 'utf8')

    const newValue = `global.sgc = "${text}"`

    // Use a regular expression with proper escaping for newValue
    configData = configData.replace(/global\.sgc\s*=\s*".*"/, newValue)

    fs.writeFileSync(configFile, configData, 'utf8')

    m.reply('Berhasil mengubah link group di config.js')
  } catch (error) {
  }
}

handler.help = ["setsgc"]
handler.tags = ["developer"]
handler.rowner = true
handler.command = /^setsgc$/i

export default handler