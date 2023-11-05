import { minify } from 'terser'

let handler = async (m, { conn, args }) => {
  if (args.length === 0) {
    return conn.reply(m.chat, `Input Code`, m)
  }

  const inputCode = args.join(' ')

  const options = {
    mangle: {
      properties: {
        keep_quoted: true
      }
    },
    compress: false,
    format: {
      beautify: true
    }
  };

  try {
    const result = await minify(inputCode, options);
    if (result.error) {
      conn.reply(m.chat, eror, m);l
    } else {
      conn.reply(m.chat, 'Done:\n\n' + result.code, m)
    }
  } catch (error) {
    conn.reply(m.chat, eror, m)
  }
}

handler.help = ["terser", "beautify"]
handler.tags = ["developer"]
handler.command = /^(terser|beautify)$/i
handler.rowner = true

export default handler;