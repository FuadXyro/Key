import fetch from 'node-fetch';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*_Masukkan Judul Video Yang Ingin Kamu Cari!_*\nExample:\n${usedPrefix + command} Naruto Squad Reaction\n`;

  const videoUrl = `https://wb.fuadxy99.repl.co/vid?name=${encodeURIComponent(text)}`;

  const user_input_start = 0;
  const user_input_end = 51;

  try {
    const response = await fetch(videoUrl);
    if (!response.ok) throw 'Failed to fetch the video data.';
    const data = await response.json();
    const videoData = data.result;

    if (!videoData || videoData.length === 0) {
      await m.reply('No video data found.');
      return;
    }

    const start = Math.max(0, user_input_start);
    const end = Math.min(videoData.length - 1, user_input_end);

    let replyText = '';
    for (let i = start; i <= end; i++) {
      const videoInfo = videoData[i];

      try {
        if (videoInfo && videoInfo.channel) {
          const name = videoInfo.channel.name;
          const link = videoInfo.channel.link;

          replyText += `Video ${i + 1}:\n`;
          replyText += `name: ${name}\n` +
            `link: ${link}\n`;
        } else {
          replyText += `Video ${i + 1}: Channel information not available\n`;
        }

        const title = videoInfo.title;
        const type = videoInfo.type;
        const link_Video = videoInfo.link;
        const duration = videoInfo.accessibility.duration;
        const views = videoInfo.viewCount.text;

        replyText += `duration: ${duration}\n` +
          `title: ${title}\n` +
          `type: ${type}\n` +
          `link_Video: ${link_Video}\n` +
          `views: ${views}\n`;
        replyText += '-'.repeat(30) + '\n';
      } catch (error) {
        console.error(`Error processing Video ${i + 1}: ${error}`);
        replyText += `Error processing Video ${i + 1}\n`;
      }
    }

    await m.reply(replyText);
  } catch (error) {
    console.error(error);
    await m.reply('Failed to fetch the video data.');
  }
};

handler.command = /^yts(earch)?$/i;
handler.tags = ['youtube'];
handler.help = ['video <nama_video>'];

export default handler;