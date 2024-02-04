import fs from "fs"

let handler = async (m, { conn, usedPrefix: _p }) => {
    const fgif = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "66855593455-1318222635@g.us" } : {})
        },
        message: {
            "videoMessage": {
                "title": namebot,
                "h": `Hmm`,
                'seconds': '999999999',
                'gifPlayback': 'true',
                'caption': wm,
                'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
            }
        }
    }

    let info = `Ada Apa Bree...? (｡>_<｡)`

    /* 1 */
    await conn.reply(m.chat, info, fgif)

    /* 2 */
    await conn.relayMessage(m.sender, {
        protocolMessage: {
            key: m.key,
            type: 11
        }
    }, {})

    /* 3 */
    await conn.sendPresenceUpdate('composing', m.chat)

    /* 4 */
    await conn.relayMessage(m.chat, {
        requestPhoneNumberMessage: {}
    }, {})
}

handler.customPrefix = /^(tes|tess|test)$/i

handler.command = new RegExp

export default handler