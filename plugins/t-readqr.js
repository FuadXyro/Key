import uploadImage from '../lib/uploadImage.js' 
 import fetch from 'node-fetch' 
 let handler = async (m, { conn, text, usedPrefix, command }) => { 
 let q = m.quoted ? m.quoted : m 
 let mime = (q.msg || q).mimetype || '' 
 if (!mime) throw '*Reply QR Code*' 
 let img = await q.download?.() 
 let url = await uploadImage(img) 
 let anu = await fetch(`https://api.lolhuman.xyz/api/read-qr?apikey=e1a815979e6adfc071b7eafc&img=${url}`) 
 let json = await anu.json() 
 await m.reply(`*Teks Kode QR Adalah:* ${json.result}`)} 
 handler.command = /^(readqr|bacaqr)$/i 
 export default handler