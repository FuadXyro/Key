/* Update By FuadXy */

let handler  = async (m, { conn, usedPrefix: _p }) => {

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
await conn.relayMessage(m.chat, { requestPhoneNumberMessage: {}
                }, {})
}

handler.customPrefix = /^(tes|tess|test)$/i

handler.command = new RegExp



export default handler