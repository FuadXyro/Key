import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {

let pp = await conn.profilePictureUrl(m.sender, 'image')

const anu = {
	"key": {
		"fromMe": false,
		"participant": "0@s.whatsapp.net",
		"remoteJid": "0@s.whatsapp.net"
	},
	"message": {
		"groupInviteMessage": {
			"groupJid": "6285240750713-1610340626@g.us",
			"inviteCode": "mememteeeekkeke",
			"groupName": "P", 
            "caption": `${namebot}`, 
            'jpegThumbnail': await ( await fetch(pp)).buffer()
		}
	}
}

let text = 'V3 (latest update)'

conn.sendMessage(m.chat, { text: text} , { quoted: anu })
}

handler.help = ['cekversi']
handler.tags = ["info"]

handler.command = /^cekversi$/i
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

export default handler