let handler = async (m, { conn, text }) => {
  let premiumList = [
    {
      duration: "1 DAY",
      price: 100000000,
      command: "1D",
    },
    {
      duration: "2 DAY",
      price: 200000000,
      command: "2D",
    },
    {
      duration: "3 DAY",
      price: 300000000,
      command: "3D",
    },
    {
      duration: "4 DAY",
      price: 400000000,
      command: "4D",
    },
    {
      duration: "7 DAY",
      price: 700000000,
      command: "7D",
    },
    {
      duration: "30 DAY",
      price: 1000000000,
      command: "30D",
    },
  ]

  if (!text) {
    let listText = "*PREMIUM LIST:*\n\n"
    premiumList.forEach((premium, index) => {
      listText += `${index + 1}. PREMIUM ${premium.duration}\n`
      listText += `◦  Price : *${premium.price.toLocaleString()}* Money\n`
      listText += `◦  *Command :* .buyprem ${premium.command}\n\n`
    })

    conn.reply(m.chat, listText, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `${global.namebot}`,
          body: "Halo, silakan pilih paket premium Anda.",
          thumbnailUrl: thumb,
          sourceUrl: null,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    })

    return
  }

  let days = parseInt(text)
  if (isNaN(days)) return conn.reply(m.chat, "Invalid input. Masukkan jumlah hari yang ingin Anda beli.", m)

  let selectedPremium = premiumList.find((premium) => premium.command.toLowerCase() === text.toLowerCase())
  if (!selectedPremium) return conn.reply(m.chat, "Paket premium tidak ditemukan.", m)

  let user = global.db.data.users[m.sender]
  if (!user) return conn.reply(m.chat, "Anda tidak terdaftar.", m)

  let money = user.money || 0
  let price = selectedPremium.price * days
  if (money < price) return conn.reply(m.chat, "Money tidak mencukupi.", m)

  user.premium = true
  user.premiumDate = Date.now() + days * 24 * 60 * 60 * 1000
  user.limit += days

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    },
  })

  user.money -= price

  conn.reply(m.chat, `Anda telah berhasil membeli *${selectedPremium.duration}* Premium.\nSetelah membeli, jangan membeli lagi, karena akan membuat premium sebelumnya hangus.`, m)
}

handler.command = /^buyprem$/i
handler.help = ["buyprem [duration]"]
handler.tags = ["xp"]
handler.register = true

export default handler