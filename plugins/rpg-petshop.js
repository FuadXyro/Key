let handler = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]
  global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0
  global.db.data.users[m.sender].pedang = global.db.data.users[m.sender].pedang || 0
  global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0

  // HARGA
  let hdog = 2
  let hcat = 2
  let hhorse = 4
  let hfox = 6
  let hrobo = 10

  let hlion = 10
  let hrhinoceros = 10
  let hdragon = 10
  let hcentaur = 10
  let hkyubi = 10
  let hgriffin = 10
  let hphonix = 10
  let hwolf = 10

  let pp = 'https://telegra.ph/file/75fdf5c2736e32f439a65.jpg'
  let caption = `
  ${htki} PET STORE ${htka}\n${htka}

  ${htjava} N O R M A L ${htjava}
  🐈 *Cat:* ${hcat} 🔖
  🐕 *Dog:* ${hdog} 🔖
  🐎 *Horse:* ${hhorse} 🔖
  🦊 *Fox:* ${hfox} 🔖
  🤖 *Robo:* ${hrobo} 🔖

  ${htjava} S P E C I A L ${htjava}
  🦁 *lion:* ${hlion} 🔖
  🦏 *rhinoceros:* ${hrhinoceros} 🔖
  🐉 *dragon:* ${hdragon} 🔖
  🎠 *centaur:* ${hcentaur} 🔖
  🦊 *kyubi:* ${hkyubi} 🔖
  🦅 *griffin:* ${hgriffin} 🔖
  🦤 *phonix:* ${hphonix} 🔖
  🐺 *wolf:* ${hwolf} 🔖

  ${htjava} A B I L I T Y ${htjava}
  ➞ 🐈 • ᴄᴀᴛ :
  - ɪɴᴄʀᴇᴀsᴇ ʜᴇᴀʟᴛʜ 5% / ʟᴇᴠᴇʟ ᴡʜᴇɴ ᴜsᴇ *.ʜᴇᴀʟ*

  ➞ 🐕 • ᴅᴏɢ :
  - ᴄᴏᴍɪɴɢ sᴏᴏɴ...

  ➞ 🐎 • ʜᴏʀsᴇ :
  - ᴄᴏᴍɪɴɢ sᴏᴏɴ...

  ➞ 🦊 • ғᴏx :
  - ᴄᴏᴍɪɴɢ sᴏᴏɴ...

  • Buy A Pet

  - 🐈 Cat (Adopt A Cat)
  .petshop cat
  - 🐕 Dog (Adopt A Dog)
  .petshop dog
  - 🐎 Horse (Adopt A Horse)
  .petshop horse
  - 🦊 Fox (Adopt A Fox)
  .petshop fox
  - 🤖 Robo (Buy A Robo)

  *◉ SPESIAL PET*

  - 🦁 lion (Adopt A lion)
  .petshop lion
  - 🦏 rhinoceros (Adopt A rhinoceros)
  .petshop rhinoceros
  - 🐉 dragon (Adopt A dragon)
  .petshop dragon
  - 🎠 centaur (Adopt A centaur)
  .petshop centaur
  - 🦊 kyubi (Adopt A kyubi)
  .petshop kyubi
  - 🦅 griffin (Adopt A griffin)
  .petshop griffin
  - 🦤 phonix (Adopt A phonix)
  .petshop phonix
  - 🐺 wolf (Adopt A wolf)
  .petshop wolf
  `

  try {
    if (/petshop/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
      switch (type) {
        case 'cat':
          if (user.cat > 0) return m.reply('Kamu sudah memilik ini')
          if (user.pet < hcat) return m.reply(`Pet Token anda kurang`)
          global.db.data.users[m.sender].pet -= hcat
          global.db.data.users[m.sender].cat += 1
          m.reply("Selamat anda mempunyai pet Baru ! 🎉")
          break
        case 'dog':
          if (user.dog > 0) return m.reply('Kamu sudah memilik ini')
          if (user.pet < hdog) return m.reply(`Pet Token anda kurang`)
          global.db.data.users[m.sender].pet -= hdog
          global.db.data.users[m.sender].dog += 1
          m.reply("Selamat anda mempunyai pet Baru ! 🎉")
          break
        // Tambahkan kasus lain di sini sesuai dengan format yang sama
        default:
          return await conn.reply(m.chat, caption, m, { mentionedJid: [m.sender], contextInfo: { forwardingScore: 9999, isForwarded: true, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `Hai Kak ${m.name}`, body: null, thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: null, renderLargerThumbnail: true }}})
      }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count)
      switch (_type) {
        case 't':
          break
        case '':
          break
        // Tambahkan kasus lain di sini sesuai dengan format yang sama
        default:
          return conn.reply(m.chat, caption, fkontak)
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}

handler.help = ['petshop']
handler.tags = ['rpg']
handler.command = /^(petshop)/i

export default handler