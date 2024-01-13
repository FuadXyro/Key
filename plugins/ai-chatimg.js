import fetch from "node-fetch"
import uploadImage from "../lib/uploadImage.js"
import {
    FormData,
    Blob
} from 'formdata-node';
import translate from '@vitalets/google-translate-api'

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    try {
        let text
        if (args.length >= 1) {
            text = args.slice(0).join(" ")
        } else if (m.quoted && m.quoted.text) {
            text = m.quoted.text
        } else return m.reply("Input Teks")
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ""
        await m.reply(wait)
        if (!mime) return m.reply("Input Foto")
        let media = await q.download()
        let isTele = /image\/(png|jpe?g)/.test(mime)
        let link = await uploadImage(media)
        const prompt = (text.trim());
        let res = await translate(prompt, {
            to: "id",
            autoCorrect: true
        }).catch(_ => null)
        let result = await WhatImage(link, res.text)
        if (!result) {
            throw 'Terjadi kesalahan saat mengonversi gambar ke zombie.';
        }
        await m.reply(result.output);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
handler.help = ["chatimg"].map(v => v + " (Balas foto)");
handler.tags = ["ai"];
handler.command = /^(chatimg)$/i;
handler.limit = true;
export default handler;

async function WhatImage(image, prompt) {
    try {
        let form = new FormData();
        form.append('prompt', encodeURIComponent(prompt));
        form.append('image', encodeURIComponent(image));
        const response = await fetch("https://boredhumans.com/api_image_chat.php", {
            method: 'POST',
            body: form,
        });
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        const base64Data = await response.text();
        return JSON.parse(base64Data);
    } catch (error) {
        return null;
    }
}