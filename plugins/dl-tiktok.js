import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `Masukkan URL`, m)
  }
  if (!text.match(/tiktok/gi)) {
    return conn.reply(m.chat, 'Pastikan link berasal dari TikTok', m)
  }
  try {
    let old = new Date()
    let p = await tiktok2(`${text}`)
    let info = `乂  *T I K T O K*\n\n• *Judul* : ${p.title}\n• *Waktu Pengambilan* : ${((new Date() - old) * 1)} ms`
    await conn.sendFile(m.chat, p.no_watermark, 'tiktok.mp4', info, m)
    conn.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key,
      }
    })
   } catch (e) {
    console.log(e)
    conn.sendMessage(m.chat, {
      react: {
        text: '🍉',
        key: m.key,
      }
    })
  }
}

handler.help = ['tiktok'].map(v => v + ' *<url>*')
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i
handler.limit = false
handler.group = false

export default handler

async function tiktok2(url) {
  try {
    const response = await fetch('https://tiktokder.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch TikTok video')
    }

    const data = await response.json()
    return {
      title: data.title,
      no_watermark: data.downloadLink
    }
  } catch (error) {
    console.error('Error fetching TikTok video:', error.message)
    throw error
  }
}