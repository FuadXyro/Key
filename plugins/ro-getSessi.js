import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
let exec = promisify(_exec).bind(cp)

let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return
  m.reply('Executing...')

  const compressedFilePath = 'sessions.tar.gz'
  if (!fs.existsSync(compressedFilePath)) {
    try {
      await exec('tar', ['-czf', 'sessions.tar.gz', 'sessions'])
      m.reply('Successfully created sessions.tar.gz!')
    } catch (e) {
      m.reply('Failed to create sessions.tar.gz')
      return // Stop execution if tar command failed
    }
  } else {
    m.reply('sessions.tar.gz already exists, skipping creation...')
  }

  // Check again if the file exists after compression attempt
  if (fs.existsSync(compressedFilePath)) {
    const compressedData = fs.readFileSync(compressedFilePath)
    await conn.sendMessage(
      m.chat,
      {
        document: compressedData,
        mimetype: 'application/gz',
        fileName: 'sessions.tar.gz',
      },
      {
        quoted: m,
      }
    )
  } else {
    m.reply('File not found. Compression may have failed.')
  }
}

handler.help = ['getsessi']
handler.tags = ['developer']
handler.command = /^(getsessi)$/i
handler.rowner = true

export default handler