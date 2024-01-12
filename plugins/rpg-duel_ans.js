export async function before(m) {
    this.duel = this.duel ? this.duel : {};
    if (m.isGroup && m.chat in this.duel) {
        if (
            m.sender == this.duel[m.chat].player_2 &&
            /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(
                m.text
            )
        ) {
            if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
                this.sendMessage(
                    m.chat, {
                        text: `@${
              player_2.split`@`[0]
            } menolak bermain duel, duel dibatalkan`,
                        mentions: [player_2],
                    }, {
                        quoted: m
                    }
                );
                delete this.duel[m.chat];
                return !0;
            }
            global.db.data.users[this.duel[m.chat].player_1].money -=
                this.duel[m.chat].count * 1;
            global.db.data.users[this.duel[m.chat].player_2].money -=
                this.duel[m.chat].count * 1;
            let randomplayer_1 = `${Math.floor(Math.random() * 10)}`.trim() * 1;
            let randomplayer_2 = `${Math.floor(Math.random() * 10)}`.trim() * 1;
            let sya = await conn.getName(this.duel[m.chat].player_1);
            let lwn = await conn.getName(this.duel[m.chat].player_2);
            if (randomplayer_1 > randomplayer_2) {
                let caption = `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${
          this.duel[m.chat].player_1.split("@")[0]
        } - [${sya}]\n┗┅⭑ ${randomplayer_1} Point\n${htjava} @${
          this.duel[m.chat].player_2.split("@")[0]
        } - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\n@${
          this.duel[m.chat].player_1.split("@")[0]
        } WIN \nKamu menang dan mendapatkan ${
          this.du[m.chat].count * 2
        } Money`.trim();
                this.reply(m.chat, caption, m, {
                    mentions: this.parseMention(caption),
                });
                global.db.data.users[this.duel[m.chat].player_1].money +=
                    this.duel[m.chat].count * 2;
                delete this.duel[m.chat];
            } else if (randomplayer_1 < randomplayer_2) {
                let caption = `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${
          this.duel[m.chat].player_1.split("@")[0]
        } - [${sya}]\n┗┅⭑ ${randomplayer_1} Point\n${htjava} @${
          this.duel[m.chat].player_2.split("@")[0]
        } - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\n@${
          this.duel[m.chat].player_2.split("@")[0]
        } WIN \nKamu menang dan mendapatkan ${
          this.duel[m.chat].count * 2
        } Money`.trim();
                this.reply(m.chat, caption, m, {
                    mentions: this.parseMention(caption),
                });
                global.db.data.users[this.duel[m.chat].player_2].money +=
                    this.duel[m.chat].count * 2;
                delete this.duel[m.chat];
            } else {
                let caption = `💰 *C A S I N O - D U E L* 💰\n\n${htjava} @${
          this.duel[m.chat].player_1.split("@")[0]
        } - [${sya}]\n┗┅⭑ \n${randomplayer_1} Point\n${htjava} @${
          this.duel[m.chat].player_2.split("@")[0]
        } - [${lwn}]\n┗┅⭑ ${randomplayer_2} Point\n\nKalian berdua seri dan ${
          this.duel[m.chat].count
        } Money dikembalikan`.trim();
                this.reply(m.chat, caption, m, {
                    mentions: this.parseMention(caption),
                });
                global.db.data.users[this.duel[m.chat].player_1].money >=
                    this.duel[m.chat].count * 1;
                global.db.data.users[this.duel[m.chat].player_2].money >=
                    this.duel[m.chat].count * 1;
                delete this.duel[m.chat];
            }
        }
    }
}