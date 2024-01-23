let handler = async (m, { conn }) => {
  if (!m.quoted) throw `_*Mau cek device siapa?*_\n_*Reply Pesan Nya*_`
    try {
    var id = m.quoted.id
    var deviceType = id.length > 21 ? '_*Android*_' : id.substring(0, 2) === '3A' ? '_*iOS*_' : '_*WA Web*_'
    await conn.reply(m.chat, deviceType, m)
  } catch (e) {
    throw 'Id Tidak Ditemukan, mungkin dia bukan orang 🗿'
  }
}

handler.help = ['device']
handler.tags = ['tools']
handler.command = /^device$/i

export default handler