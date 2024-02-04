import SiBail from "@adiwajshing/baileys"
import Pino from "pino"
import NodeCache from "node-cache"
import WebSocket from 'ws'
import path from "path"
import fs from 'fs'

const {
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  jidNormalizedUser,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC
} = SiBail

const store = makeInMemoryStore({ logger: Pino({ level: "fatal" }).child({ level: "fatal" }) })
global.conns = []

let handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
  isOwner
}) => {
  process.on("unhandledRejection", (err) => console.error(err))

  // Check if the number argument is provided
  if (!args[0]) return m.reply('Input Number.')

  const numJadibot = args[0]
  const { state, saveCreds } = await useMultiFileAuthState('./jadibot/' + numJadibot + '.json')
  const msgRetryCounterCache = new NodeCache()
  // Use 'const' instead of 'let' for better code readability
  const bajing = SiBail.default({
    logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: false,
    mobile: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    browser: ['Chrome (Linux)', '', ''],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid)
      let msg = await store.loadMessage(jid, key.id)

      return msg?.message || ""
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  })
  store.bind(bajing.ev)
  let ev = bajing.ev

  if (conn.user.jid == numJadibot) return m.reply('Cannot create a bot for the jadibot user!')

  let authFile = './jadibot/' + numJadibot + '.json'
  let isInit = !fs.existsSync(authFile)
  let id = global.conns.length

  let date = new Date()
  let timestamp = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
  bajing.timestamp = timestamp

  
  async function needUpdate(update) {
    const {
      connection,
      lastDisconnect
    } = update
    date = new Date()
    console.log(update)
    timestamp = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    bajing.timestamp = timestamp

    if (!bajing.authState.creds.registered) {
      if (!isNaN(global.tryConnect[numJadibot])) global.tryConnect[numJadibot] = 0
      if (global.tryConnect[numJadibot] === 3) {
        global.tryConnect[numJadibot] = 0
        return m.reply('Waktu scan qr kamu sudah habis!')
      }

      let code = await bajing.requestPairingCode(numJadibot)
      code = code?.match(/.{1,4}/g)?.join("-") || code
      console.log(code)

      let scan = await m.reply(code)
      setTimeout(() => {
        bajing.sendMessage(m.chat, {
          delete: scan.key
        })
      }, 30000)
      global.tryConnect[numJadibot] += 1
    }

    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && bajing.ws.readyState !== WebSocket.CONNECTING) {
      global.tryConnect(true)
      m.reply('Connecting...')
    } else if (connection === 'open') {
      global.conns.push(bajing)
      bajing.reply(m.chat, `Berhasil Tersambung dengan WhatsApp mu.\n*NOTE: Cuma Numpang!*\nNomor: ${bajing.user.jid.split`@`[0]}\nJoin: ${timestamp}\n`, m)
      global.tryConnect[numJadibot] = 0
      global.conns[numJadibot] = bajing
    } else if (connection === 'close') {
      m.reply('koneksi terputus!! wait...')
    } else {
      m.reply('Report Owner! BugError: ' + lastDisconnect.error.output)
    }
  }

  global.tryConnect = function tryConnect(restatConn, close) {
    bajing.welcome = 'Hai, @user!\nSelamat datang di grup @subject\n\n@desc'
    bajing.bye = 'Selamat tinggal @user!'
    bajing.spromote = '@user sekarang admin!'
    bajing.sdemote = '@user sekarang bukan admin!'
    bajing.handler = handler.bind(bajing)
    bajing.connectionUpdate = needUpdate.bind(bajing)
    bajing.credsUpdate = saveCreds.bind(conn)

    if (restatConn) {
      try {
        bajing.ws.close()
      } catch {}
      conn = {
        ...bajing
      }
    }

    if (!isInit || !close) {
      ev.off('messages.upsert', bajing.handler)

      ev.off('connection.update', bajing.connectionUpdate)
      ev.off('creds.update', bajing.credsUpdate)
    }
    ev.on('messages.upsert', bajing.handler)
    ev.on('connection.update', bajing.connectionUpdate)
    ev.on('creds.update', bajing.credsUpdate)

    isInit = false
    return true
  }

  await global.tryConnect()
}

handler.help = ['pairing']
handler.tags = ['jadibot', 'baileys']
handler.command = /^(pairing)$/i
handler.private = false
handler.rowner = true 

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)