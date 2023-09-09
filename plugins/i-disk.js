import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
let handler = async (m) => {

conn.reply(m.chat, wait, fakes)
    let o
    try {
        o = await exec('cd && du -h --max-depth=1')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) conn.reply(m.chat, stdout, fkontak)
        if (stderr.trim()) conn.reply(m.chat, stderr, fkontak)
    }
}
handler.help = ['disk']
handler.tags = ['info']
handler.command = /^(disk)$/i

export default handler