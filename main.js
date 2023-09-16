process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import './config.js';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
    return createRequire(dir)
}

import * as ws from 'ws';
import {
    readdirSync,
    rmSync,
    statSync,
    unlinkSync,
    existsSync,
    readFileSync,
    watch
} from 'fs';

import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import { Boom } from "@hapi/boom";
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import {
    Low,
    JSONFile
} from 'lowdb';
import {
    mongoDB,
    mongoDBV2
} from './lib/mongoDB.js';
import pino from 'pino';
// import store from './lib/store-single.js';
const { 
    DisconnectReason,
    useMultiFileAuthState,
    MessageRetryMap,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    proto,
    jidNormalizedUser,
    PHONENUMBER_MCC
} = await import('@adiwajshing/baileys');
import readline from "readline";
import { parsePhoneNumber } from "libphonenumber-js";

// Pake node . --qr aja
const pairingCode = process.argv.includes("--use-pairing-code");
const useMobile = process.argv.includes("--mobile");
const useQr = process.argv.includes("--qr");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
import NodeCache from "node-cache";
const msgRetryCounterCache = new NodeCache(); // for retry message, "waiting message"

const { CONNECTING } = ws;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();
const {
    chain
} = lodash;

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')
global.timestamp = {
    start: new Date
}

const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const symbolRegex = /^[^\w\s\d]/;
const emojiRegex = /^(\p{Emoji}|[\uFE0F\u200D])/u;
global.prefix = new RegExp(`(${symbolRegex.source})|(${emojiRegex.source})`, 'u');

// Read
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))


global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function() {
        if (!global.db.READ) {
            clearInterval(this)
            resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
        }
    }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(global.db.data || {})
    }
    global.db.chain = chain(global.db.data)
}
loadDatabase()

// global.authFile = `${opts._[0] || 'session'}.data.json`
const authFolder = `${opts._[0] || 'sessions'}`;

/*
const {
    state,
    saveState
} = store.useSingleFileAuthState(global.authFile)

const connectionOptions = {
    printQRInTerminal: true,
    auth: state
}*/
const { state, saveState, saveCreds } = await useMultiFileAuthState(authFolder);
const msgRetryCounterMap = (MessageRetryMap) => {};
const { version } = await fetchLatestBaileysVersion();

if (!pairingCode && !useMobile && !useQr) {
    console.log('Contoh: node . --use-pairing-code/--mobile/--qr')
}

const connectionOptions = {
    ...(!pairingCode && !useMobile && !useQr && {
        printQRInTerminal: false,
        mobile: false
    }),
    ...(pairingCode && {
        printQRInTerminal: !pairingCode
    }),
    ...(useMobile && {
        mobile: true
    }),
    ...(useQr && {
        printQRInTerminal: true
    }),
    patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
        if (requiresPatch) { message = { viewOnceMessage: {
            message: {
            messageContextInfo: {
            deviceListMetadataVersion: 2,
            deviceListMetadata: {}
        },
        ...message }}};
        }
        return message;
    },
    msgRetryCounterMap, logger: pino({ level: 'fatal' }),
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({
        level: 'fatal'
        })),
    },
    browser: ['ZenithBotz', 'Safari', '1.0.0'],
    version,
    generateHighQualityLinkPreview: true, // make high preview link
    markOnlineOnConnect: false,
    getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid)
        let msg = await store.loadMessage(jid, key.id)
    return msg?.message || ""
    },
    msgRetryCounterCache, // Resolve waiting messages
    defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
};

global.conn = makeWASocket(connectionOptions)
conn.isInit = false


// login use pairing code
// source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
if (pairingCode && !conn.authState.creds.registered) {
    if (useMobile) throw new Error('Cannot use pairing code with mobile api')
    conn.logger.info(chalk.cyan('╭───────────────────────────────────────╮'));
    conn.logger.info(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
    conn.logger.info(chalk.cyan('├───────────────────────────────────────┤'));
    let phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
    conn.logger.info(chalk.cyan('╰───────────────────────────────────────╯'));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    // Ask again when entering the wrong number
    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        conn.logger.info(chalk.cyan('╭──────────────────────────────────────────────────╮'));
        conn.logger.info(`💬 ${chalk.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
        conn.logger.info(chalk.cyan('╰──────────────────────────────────────────────────╯'));
        conn.logger.info(chalk.cyan('╭───────────────────────────────────────╮'));
        conn.logger.info(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
        conn.logger.info(chalk.cyan('├───────────────────────────────────────┤'));
        phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
        conn.logger.info(chalk.cyan('╰───────────────────────────────────────╯'));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    }

    let code = await conn.requestPairingCode(phoneNumber)
    code = code?.match(/.{1,4}/g)?.join("-") || code
    conn.logger.info(chalk.cyan('╭───────────────────────────────────────╮'));
    conn.logger.info(` 💻 ${chalk.redBright('Your Pairing Code')}:`);
    conn.logger.info(chalk.cyan('├───────────────────────────────────────┤'));
    conn.logger.info(`   ${chalk.cyan('- Code')}: ${code}`);
    conn.logger.info(chalk.cyan('╰───────────────────────────────────────╯'));
    rl.close()
}

// login mobile API (prone to bans)
// source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L72
if (useMobile && !conn.authState.creds.registered) {
const { registration } = conn.authState.creds || { registration: {} }

    if (!registration.phoneNumber) {
        conn.logger.info(chalk.cyan('╭───────────────────────────────────────╮'));
        conn.logger.info(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
        conn.logger.info(chalk.cyan('├───────────────────────────────────────┤'));
        let phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
        conn.logger.info(chalk.cyan('╰───────────────────────────────────────╯'));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

        // Ask again when entering the wrong number
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            conn.logger.info(chalk.cyan('╭──────────────────────────────────────────────────╮'));
            conn.logger.info(`💬 ${chalk.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
            conn.logger.info(chalk.cyan('╰──────────────────────────────────────────────────╯'));
            conn.logger.info(chalk.cyan('╭───────────────────────────────────────╮'));
            conn.logger.info(`📨 ${chalk.redBright('Please type your WhatsApp number')}:`);
            conn.logger.info(chalk.cyan('├───────────────────────────────────────┤'));
            phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
            conn.logger.info(chalk.cyan('╰───────────────────────────────────────╯'));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        }

        registration.phoneNumber = "+" + phoneNumber
    }

    const phoneNumber = parsePhoneNumber(registration.phoneNumber)
    if (!phoneNumber.isValid()) throw new Error('Invalid phone number: ' + registration.phoneNumber)

    registration.phoneNumber = phoneNumber.format("E.164")
    registration.phoneNumberCountryCode = phoneNumber.countryCallingCode
    registration.phoneNumberNationalNumber = phoneNumber.nationalNumber

    const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode]
    registration.phoneNumberMobileCountryCode = mcc

    async function enterCode() {
        try {
            const code = await question(chalk.bgBlack(chalk.greenBright(`Please Enter Your OTP Code : `)))
            const response = await conn.register(code.replace(/[^0-9]/g, '').trim().toLowerCase())
            conn.logger.info(chalk.cyan('╭──────────────────────────────────────────────────╮'));
            conn.logger.info(`💬 ${chalk.redBright("Successfully registered your phone number.")}`);
            conn.logger.info(chalk.cyan('╰──────────────────────────────────────────────────╯'));
            conn.logger.info(response)
            rl.close()
        } catch (e) {
            console.error('Failed to register your phone number. Please try again.\n', e)
            await askOTP()
        }
    }

    async function askOTP() {
        let code = await question(chalk.bgBlack(chalk.greenBright('What method do you want to use? "sms" or "voice"')))
        code = code.replace(/["']/g, '').trim().toLowerCase()

        if (code !== 'sms' && code !== 'voice') return await askOTP()

        registration.method = code

        try {
            await conn.requestRegistrationCode(registration)
            await enterCode()
        } catch (e) {
            conn.logger.error('Failed to request registration code. Please try again.\n', e)
            await askOTP()
        }
    }

    await askOTP()
}

if (!opts['test']) {
    setInterval(async () => {
        if (global.db.data) await global.db.write().catch(console.error)
        if (opts['autocleartmp']) try {
            clearTmp()

        } catch (e) {
            console.error(e)
        }
    }, 3600000)
    // Tiap 1 jam
}
if (opts['server'])(await import('./server.js')).default(global.conn, PORT)

/* Clear */
async function clearTmp() {
    const tmp = './tmp'
    readdirSync(tmp).forEach(f => rmSync(`${tmp}/${f}`));
}
setInterval(async () => {
    await clearTmp();
    console.log(chalk.cyanBright('The tmp folder has been cleaned'));
}, 3600000);
// Tiap 1 jam
const hehe = async (jid, options) => {
  let wm = 'ᴋʏᴀᴍɪ࿐';
  let gambar = 'https://telegra.ph/file/08a98476cca5dcd0d5115.png';
  try {
    gambar = await conn.profilePictureUrl(jid, 'image');
  } catch (e) {

  } finally {
  	const peth = (await import('node-fetch')).default
    gambar = await (await peth(gambar)).buffer()
    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...({ remoteJid: 'status@broadcast' })
      },
      message: {
        'contactMessage': {
          'displayName': wm,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${jid.split`@`[0]}:${jid.split`@`[0]}\nitem1.X-ALabell:Ponsel\nEND:VCARD`,
          'jpegThumbnail': gambar,
          'thumbnail': gambar,
          'sendEphemeral': true
        }
      }
    }
    const txt = `\n[ ✓ ] 𝑩𝒆𝒓𝒉𝒂𝒔𝒊𝒍 𝑻𝒆𝒓𝒉𝒖𝒃𝒖𝒏𝒈 𝑲𝒆 𝑺𝒄𝒓𝒊𝒑𝒕 ᴋʏᴀᴍɪ×͜×࿐\n\n𝑺𝒂𝒚𝒂 𝑩𝒆𝒓𝒋𝒂𝒏𝒋𝒊 𝑻𝒊𝒅𝒂𝒌 𝑨𝒌𝒂𝒏 𝑴𝒆𝒏𝒋𝒖𝒂𝒍 𝑩𝒆𝒍𝒊𝒌𝒂𝒏 𝑺𝒄𝒓𝒊𝒑𝒕 𝑩𝒐𝒕 𝑰𝒏𝒊.\n𝑻𝒓𝒊𝒎𝒂𝒌𝒂𝒔𝒊𝒉 @${jid.split`@`[0]}, 𝑲𝒂𝒓𝒆𝒏𝒂 𝑺𝒖𝒅𝒂𝒉 𝑴𝒆𝒎𝒃𝒆𝒓𝒊𝒌𝒂𝒏 𝑺𝒄𝒓𝒊𝒑𝒕 𝑰𝒏𝒊.\n\n\n𝑺𝒖𝒎𝒃𝒆𝒓 𝑺𝒄𝒓𝒊𝒑𝒕 ✓\n@${jid.split`@`[0]} \n\ns ᴛ ᴀ ᴛ ᴜ s | s ᴇ ʀ ᴠ ᴇ ʀ\n~ ᴍᴇᴍᴏʀʏ ᴜsᴇᴅ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n𝑮𝒊𝒕𝒉𝒖𝒃: https://github.com/ShionMdv`
    return await conn.sendMessage(jid, { text: txt, mentions: [jid], ...options }, { quoted: fkontak, ephemeralExpiration: 86400, ...options })
  }
}

/* Update */
/* 
async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  console.log(code)
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true).catch(console.error))
    global.timestamp.connect = new Date
    return await hehe('6287734910547' + '@s.whatsapp.net').catch(err => { return !0 })
  }
  if (global.db.data == null) loadDatabase()
} // Gausah Dihapus Njink Susah Susah Update Ngentod
*/

async function connectionUpdate(update) {
  const { lastDisconnect, isNewLogin, connection, qr } = update;
  if (isNewLogin) conn.isInit = true
  if (!pairingCode && !useMobile && useQr && qr != 0 && qr != undefined) {
    conn.logger.info(chalk.yellow('🚩ㅤPindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik.'));
  }
  if (connection) {
    conn.logger.info(`Connection Status : ${connection}`)
  }

  if (connection === "close") {
    let reason = new Boom(lastDisconnect?.error)?.output.statusCode
    if (reason === DisconnectReason.badSession) {
        conn.logger.info(`Bad Session File, Please Delete Session and Scan Again`)
        process.send('reset')
    } else if (reason === DisconnectReason.connectionClosed) {
        conn.logger.info("Connection closed, reconnecting....")
        await global.reloadHandler(true).catch(logErrorDetails)
    } else if (reason === DisconnectReason.connectionLost) {
        conn.logger.info("Connection Lost from Server, reconnecting...")
        await global.reloadHandler(true).catch(logErrorDetails)
    } else if (reason === DisconnectReason.connectionReplaced) {
        conn.logger.info("Connection Replaced, Another New Session Opened, Please Close Current Session First")
        process.exit(1)
    } else if (reason === DisconnectReason.loggedOut) {
        conn.logger.info(`Device Logged Out, Please Scan Again And Run.`)
        process.exit(1)
    } else if (reason === DisconnectReason.restartRequired) {
        conn.logger.info("Restart Required, Restarting...")
        await global.reloadHandler(true).catch(logErrorDetails)
    } else if (reason === DisconnectReason.timedOut) {
        conn.logger.info("Connection TimedOut, Reconnecting...")
        process.send('reset')
    } else if (reason === DisconnectReason.multideviceMismatch) {
        conn.logger.info("Multi device mismatch, please scan again")
        platform() === "win32" ? process.kill(process.pid, "SIGINT") : process.kill()
    } else {
        conn.logger.info(reason)
        process.send('reset')
    }
}

if (connection === "open") {
    let jid = '6287734910547@s.whatsapp.net';
    let txt = `${conn?.user?.name || "Fuad Bot"} Has Connected...`;
    conn.sendMessage(jid, { text: txt, mentions: [jid] }, { quoted: null });
  }
};

process.on('uncaughtException', (error) => {
    logErrorDetails(error);
    process.exit(1); // Keluar dengan kode kesalahan
});
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
    } catch (e) {
        console.error(e)
    }
    if (restatConn) {
        const oldChats = global.conn.chats
        try {
            global.conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        global.conn = makeWASocket(connectionOptions, {
            chats: oldChats
        })
        isInit = true
    }
    if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler)
        conn.ev.off('group-participants.update', conn.participantsUpdate)
        conn.ev.off('groups.update', conn.groupsUpdate)
        conn.ev.off('message.delete', conn.onDelete)
        conn.ev.off('connection.update', conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
    }

     conn.welcome = `]======❏ *WELCOME* ❏======[\n\n◉ Group @subject\n\n👋 Hallo @user\n*SEMOGA BETAH YA*😆\n\n@desc`
  conn.bye = '👋 Byee @user\n\n*Awas Aja Lu Balik lagi😒*'
  conn.spromote = '*@user* Sekarang jadi admin!'
  conn.sdemote = '*@user* Sekarang bukan lagi admin!'
  conn.sDesc = 'Deskripsi telah diubah menjadi \n@desc'
  conn.sSubject = 'Judul grup telah diubah menjadi \n@subject'
  conn.sIcon = 'Icon grup telah diubah!'
  conn.sRevoke = 'Link group telah diubah ke \n@revoke'
  conn.sAnnounceOn = 'Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.'
  conn.sAnnounceOff = 'Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.'
  conn.sRestrictOn = 'Edit Info Grup di ubah ke hanya admin!'
  conn.sRestrictOff = 'Edit Info Grup di ubah ke semua peserta!'
  
  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  //conn.credsUpdate = saveState.bind(global.conn, true)
  conn.credsUpdate = saveCreds.bind(global.conn, true)
  
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on("creds.update", saveCreds)
  //conn.ev.on('creds.update', conn.credsUpdate)
  
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
    for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
        try {
            let file = global.__filename(join(pluginFolder, filename))
            const module = await import(file)
            global.plugins[filename] = module.default || module
        } catch (e) {
            conn.logger.error(e)
            delete global.plugins[filename]
        }
    }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        let dir = global.__filename(join(pluginFolder, filename), true)
        if (filename in global.plugins) {
            if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
            else {
                conn.logger.warn(`deleted plugin - '${filename}'`)
                return delete global.plugins[filename]
            }
        } else conn.logger.info(`new plugin - '${filename}'`)
        let err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
        })
        if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
        else try {
            const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
            global.plugins[filename] = module.default || module
        } catch (e) {
            conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
        } finally {
            global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
        }
    }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

/* QuickTest */
async function _quickTest() {
    let test = await Promise.all([
        spawn('ffmpeg'),
        spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'),
        spawn('magick'),
        spawn('gm'),
        spawn('find', ['--version'])
    ].map(p => {
        return Promise.race([
            new Promise(resolve => {
                p.on('close', code => {
                    resolve(code !== 127)
                })
            }),
            new Promise(resolve => {
                p.on('error', _ => resolve(false))
            })
        ])
    }))
    let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
    console.log(test)
    let s = global.support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find
    }

    Object.freeze(global.support)

    if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
    if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
    if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

/* QuickTest */
_quickTest()
    .then(() => conn.logger.info('Quick Test Done'))
    .catch(console.error)

function logErrorDetails(error) {
    console.log(chalk.cyan('╭───────────────────────────────────────╮'));
    console.log(`📌 ${chalk.redBright('Terjadi Kesalahan')}:`);
    console.log(chalk.cyan('├───────────────────────────────────────┤'));
    console.log(`   ${chalk.cyan('- Pesan Kesalahan')}: ${error.message}`);
    console.log(`   ${chalk.cyan('- Tipe Kesalahan')}: ${error.name}`);
    console.log(`   ${chalk.cyan('- Stack Trace')}: ${error.stack}`);
    console.log(chalk.cyan('╰───────────────────────────────────────╯'))
}