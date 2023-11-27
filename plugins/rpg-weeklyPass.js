const rewards = {
		exp: 20000000,
		money: 20000000,
		health: 20000000,
		potion: 20000000,
		wood: 20000000,
		rock: 20000000,
		string: 20000000,
		trash: 20000000,
		iron: 20000000,
		aqua: 20000000,
		sand: 20000000,
		bibitmangga: 20000000,
		bibitapel: 20000000,
		bibitpisang: 20000000,
		bibitjeruk: 20000000,
		bibitanggur: 20000000,
		gardenboxs: 20000000,
		joinlimit: 2,
	}
const cooldown = 604800000

let handler = async (m) => {
	let user = db.data.users[m.sender]
	if (new Date() - user.weeklypass < cooldown) {
		throw `You have already claimed this weekly claim! Wait for *${((user.weeklypass + cooldown) - new Date()).toTimeString()}*`
	}	

	let pp = 'https://telegra.ph/file/35067b38d7d0387a95201.jpg'
	let text = ''

	for (let reward of Object.keys(rewards)) {
		if (!(reward in user)) continue
		user[reward] += rewards[reward]
		text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
	}
    await conn.reply(m.chat, text.trim(), fkontak, { contextInfo: { isForwarded: true, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: pp, title: `${m.name} claiming weekly pass`, thumbnail: { url: pp }, thumbnailUrl: pp, renderLargerThumbnail: true }}})
	user.weeklypass = new Date() * 1
}

handler.help = ['weekly--pass']
handler.tags = ['rpg']
handler.command = /^(weekly--pass)$/i

handler.vvip = true
handler.cooldown = cooldown

export default handler