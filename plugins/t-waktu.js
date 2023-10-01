import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Masukkan Nama Daerahnya', m)
    axios.get(`https://worldtimeapi.org/api/timezone/Asia/${text}`).then((res) => {
        let hasil = `
            Waktu Daerah *${text}*
            Tanggal dan Waktu : ${res.data.datetime}
            Time Zone : ${res.data.timezone}
        `
        conn.reply(m.chat, hasil, m)
    }).catch((err) => {
        conn.reply(m.chat, `Daerah '${text}' tidak ditemukan atau terjadi kesalahan.`, m)
    })
}

handler.help = ['waktu'].map(v => v + ' <daerah>')
handler.tags = ['tools']
handler.command = /^(waktu)$/i
handler.limit = true

export default handler