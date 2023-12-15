import axios from 'axios';

var handler = async (m, { args }) => {
    if (!args[0]) {
        throw 'Input *URL*';
    }
    
    try {
        const url = args[0];
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const reqOptions = {
            url: `https://apikey.fuadxy99.repl.co/fb?u=${url}`,
            method: "GET",
            headers: headersList,
        };

        const response = await axios.request(reqOptions);
        const firstUrls = response.data.map(item => item.split(','));

        const hdMedia = firstUrls[0][0];
        const sdMedia = firstUrls[1][0];
        
        const hdCaption = `Video Kualitas HD\nLink HD: ${hdMedia}`;
        const sdCaption = `Video Kualitas SD\nLink SD: ${sdMedia}`;
        
        m.reply('wait'); // Assuming wait is defined somewhere

        try {
            // Send HD video
            const hdFile = await axios.get(hdMedia, { responseType: 'arraybuffer' });
            conn.sendFile(m.chat, hdFile.data, 'video_hd.mp4', hdCaption, m);

            try {
                // Send SD video
                const sdFile = await axios.get(sdMedia, { responseType: 'arraybuffer' });
                // conn.sendFile(m.chat, sdFile.data, 'video_sd.mp4', sdCaption, m);
            } catch {
                // If SD video sending fails, no further action needed
            }
        } catch {
            try {
                // Send SD video
                const sdFile = await axios.get(sdMedia, { responseType: 'arraybuffer' });
                // conn.sendFile(m.chat, sdFile.data, 'video_sd.mp4', sdCaption, m);
            } catch {
                // If both HD and SD videos don't exist, send an error message
                const cap = 'Gagal mengunduh video FB';
                conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
            }
        }
    } catch {
        // Jika terjadi kesalahan pada tahap lainnya, kirim pesan kesalahan
        const cap = 'Gagal mengunduh video FB';
        conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
    }
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.register = true

handler.command = /^(fb(dl)?)$/i

export default handler;