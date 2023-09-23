import { tmpdir } from 'os'
import { join } from 'path'
import fs from 'fs'

let handler = async (m, { args, text }) => {
  m.reply('Berhasil membersihkan file sessions')

  function deleteFiles(sessions) {
    fs.readdir(sessions, (err, files) => {
      if (err) throw err
      for (const file of files) {
        if (file !== 'creds.json') {
          fs.unlink(path.join(sessions, file), err => {
            if (err) throw err
          })
        }
      }
    })
  }
}

handler.help = ['clearsession']
handler.tags = ['mods']
handler.command = /^c(sessi|session)$/i
handler.mods = true

export default handler