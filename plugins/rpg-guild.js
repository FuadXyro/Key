const showUserProfile = async (m, data) => {
    const { chat, sender } = m, { exp = 0, money = 0 } = data?.[chat]?.members?.[sender] || {}
    return m.reply(`
    *Profile dan Inventaris Anda:*
    Level: 1\nExp: ${exp}\nMoney: ${money}\n\n*Inventaris:*\n1. Potion x3\n2. Dagger x1\n3. Shield x1`)
}

const randomUrl = getRandom(
  'https://telegra.ph/file/7060e8069ffce67d0739f.jpg',
  'https://telegra.ph/file/05c4fe775397745e8157d.jpg'
)
const showGuildMenu = `
1. *.guild create*
2. *.guild join <ID>*
3. *.guild craft <list>*
4. *.guild levelup*
5. *.guild misi*
6. *.guild cekmisi*
7. *.guild claim <ID Misi>*
8. *.guild profile*
9. *.guild leaderboard*
`

const handleLeaderboard = async (m, data) => {
    const { chat } = m, members = data?.[chat]?.members
    return members ? m.reply('*Leaderboard Guild*\n\n' + Object.entries(members).sort(([, a], [, b]) => (b.level || 0) - (a.level || 0)).map(([member, { level = 0 }]) => `ID: ${member}\nLevel: ${level}`).join('\n\n')) : m.reply('Guild tidak ditemukan. Silakan buat atau bergabung dengan guild terlebih dahulu.')
}

const generateUniqueGuildID = (guildData) => {
    const existingGuildIDs = Object.values(guildData).map(guild => guild.guildID)
    let newGuildID

    do {
        newGuildID = Math.floor(10000 + Math.random() * 90000)
    } while (existingGuildIDs.includes(newGuildID))

    return newGuildID
}

const joinGuild = async (m, guildData, guildID) => {
    const { sender } = m
    const userGuildData = guildData?.[guildID]

    if (userGuildData) {
        if (!userGuildData.members?.[sender]) {
            userGuildData.members[sender] = {
                exp: 0,
                money: 0,
                missions: [],
                craftingCompleted: false,
                isGuildLeader: false
            }
            return m.reply(`Selamat! Anda berhasil bergabung dengan guild ID ${guildID}.`)
        } else {
            return m.reply('Anda sudah menjadi anggota guild tersebut.')
        }
    } else {
        return m.reply('Guild dengan ID tersebut tidak ditemukan. Silakan cek kembali ID Guild.')
    }
}

const createGuild = async (m, guildData) => {
    const { chat, sender } = m
    const existingGuild = findUserGuild(guildData, sender)

    if (!existingGuild) {
        const guildID = generateUniqueGuildID(guildData)

        guildData[chat] = {
            guildID,
            members: {
                [sender]: {
                    exp: 0,
                    money: 0,
                    missions: [],
                    craftingCompleted: false,
                    isGuildLeader: true
                }
            }
        }

        return m.reply(`Selamat! Anda berhasil membuat guild dengan ID ${guildID}. Anda menjadi ketua guild.`)
    } else {
        return m.reply('Anda sudah menjadi anggota atau ketua guild. Tidak dapat membuat guild baru.')
    }
}

const findUserGuild = (guildData, user) => {
    for (const chat in guildData) {
        if (guildData[chat].members?.[user]) {
            return guildData[chat]
        }
    }
    return null
}

const showGuildAndUserProfile = async (m, guildData) => {
    const { chat, sender } = m
    const userGuildData = guildData?.[chat]?.members?.[sender]
    const userExp = userGuildData?.exp || 0
    const userMoney = userGuildData?.money || 0
    const guildID = guildData?.[chat]?.guildID || 'Belum Bergabung ke Guild'
    const guildLeader = findGuildLeader(guildData?.[chat]?.members) || 'Tidak ada Ketua'
    const totalGuildMembers = Object.keys(guildData?.[chat]?.members || {}).length

    return m.reply(`*Profil Guild*\nID Guild: ${guildID}\nKetua Guild: ${guildLeader}\nTotal Anggota: ${totalGuildMembers}\n\n*Profile dan Inventaris Anda:*\nLevel: 1\nExp: ${userExp}\nMoney: ${userMoney}\n\n*Inventaris:*\n1. Potion x3\n2. Dagger x1\n3. Shield x1`)
}

const findGuildLeader = (members) => {
    for (const member in members) {
        if (members[member]?.isGuildLeader) {
            return member
        }
    }
    return null
}

const handleCrafting = async (m, guildData, list) => {
    const { chat, sender } = m
    const userGuildData = guildData?.[chat

]?.members?.[sender]

    if (userGuildData && !userGuildData.craftingCompleted) {
        userGuildData.craftingCompleted = true
        return m.reply(`*List Crafting*\n${list.join('\n')}`)
    } else {
        return m.reply('Anda sudah menggunakan .guild craft sebelumnya.')
    }
}

const handleLevelUp = async (m, guildData) => {
    const { chat, sender } = m
    const userGuildData = guildData?.[chat]?.members?.[sender]
    const userExp = userGuildData?.exp || 0
    const nextLevelExp = 200
    const userLevel = userGuildData?.level || 0

    if (userExp >= nextLevelExp) {
        userGuildData.exp = userExp - nextLevelExp
        userGuildData.level = (userGuildData.level || 0) + 1

        return m.reply(`Selamat! Anda berhasil naik level! Level sekarang: ${userLevel + 1}`)
    } else {
        return m.reply(`Anda belum memiliki cukup exp untuk naik level. Exp saat ini: ${userExp}/${nextLevelExp}`)
    }
}

const handleTakeMission = async (m, guildData) => {
    const { chat, sender } = m
    const userGuildData = guildData?.[chat]?.members?.[sender]

    if (userGuildData) {
        if (!userGuildData.craftingCompleted) {
            return m.reply('Silakan crafting terlebih dahulu sebelum mengambil misi.')
        }

        let missionList = [
            'Bantulah warga desa membersihkan ladang.',
            'Selamatkan peternakan dari serangan monster.',
            'Kumpulkan 10 bahan untuk membuat ramuan ajaib.',
            'Jelajahi dungeon yang tersembunyi di hutan.',
            'Bantu pedagang mengumpulkan barang dagangan.'
        ]

        if (!userGuildData.missions || userGuildData.missions.length === 0) {
            userGuildData.missions = [...missionList]
            return m.reply('Selamat! Anda telah mengambil misi. Gunakan .guild cekmisi untuk melihat progres misi Anda.')
        } else {
            return m.reply('Anda sudah memiliki misi aktif. Selesaikan misi tersebut terlebih dahulu sebelum mengambil yang baru.')
        }
    } else {
        return m.reply('Anda belum bergabung ke dalam guild. Gunakan .guild join <ID> untuk bergabung ke guild.')
    }
}

const showUserMissionsProgress = async (m, guildData) => {
    const { chat, sender } = m
    const userMissions = guildData?.[chat]?.members?.[sender]?.missions || []

    if (userMissions.length > 0) {
        const progressList = userMissions.map((mission, index) => {
            const progress = mission ? 'Belum Selesai' : 'Selesai'
            const expRequirement = 200 * (index + 1)
            return `${index + 1}. ${mission} - ${progress} (Exp Requirement: ${expRequirement})`
        })
        return m.reply(`*Progres Misi Anda:*\n${progressList.join('\n')}`)
    } else {
        return m.reply('Anda belum mengambil misi apapun.')
    }
}

const handleClaimMissionReward = async (m, guildData, missionID) => {
    const { chat, sender } = m
    const userGuildData = guildData?.[chat]?.members?.[sender]
    const userExp = userGuildData?.exp || 0
    const userMoney = userGuildData?.money || 0

    if (userGuildData) {
        const userMissions = userGuildData.missions || []
        const remainingMissions = userMissions.filter(mission => mission !== null)

        if (remainingMissions.length > 0) {
            return m.reply('Anda belum menyelesaikan semua misi yang diambil. Silakan selesaikan semua misi terlebih dahulu.')
        }

        const rewardExp = Math.max(200 * userMissions.length, 200) // Minimum 200 exp
        const rewardMoney = 50 * userMissions.length

        userGuildData.exp = userExp + rewardExp
        userGuildData.money = userMoney + rewardMoney
        userGuildData.missions = null

        return m.reply(`Selamat! Anda berhasil mengklaim hadiah dari semua misi. Exp: +${rewardExp}, Money: +${rewardMoney}`)
    } else {
        return m.reply('Anda belum bergabung ke dalam guild. Gunakan .guild join <ID> untuk bergabung ke guild.')
    }
}

const handler = async (m, { conn, args, usedPrefix }) => {
    conn.guildData = conn.guildData || {}
    const [cmd, arg1, arg2] = args
    
    if (cmd === 'create') {
    await createGuild(m, conn.guildData)
} else if (cmd === 'join') {
    arg1 ? await joinGuild(m, conn.guildData, arg1) : m.reply('Silakan masukkan ID Guild untuk bergabung.\nContoh: *.guild join 12345*')
} else if (cmd === 'profile') {
    await showGuildAndUserProfile(m, conn.guildData)
} else if (cmd === 'craft') {
    arg1 ? await handleCrafting(m, conn.guildData, arg2) : m.reply('Silakan masukkan list crafting.\nContoh: *.guild craft Potion Dagger Shield*')
} else if (cmd === 'levelup') {
    await handleLevelUp(m, conn.guildData)
} else if (cmd === 'misi') {
    await handleTakeMission(m, conn.guildData)
} else if (cmd === 'cekmisi') {
    await showUserMissionsProgress(m, conn.guildData)
} else if (cmd === 'claim') {
    arg1 ? await handleClaimMissionReward(m, conn.guildData, arg1) : m.reply('Silakan masukkan ID Misi untuk klaim.\nContoh: *.guild claim 1*')
} else if (cmd === 'profileuser') {
    await showUserProfile(m, conn.guildData)
} else if (cmd === 'leaderboard') {
    await handleLeaderboard(m, conn.guildData)
} else {
    await conn.reply(m.chat, showGuildMenu, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: randomUrl, title: '⌂ G U I L D', body: '🌱┊ RPG WhatsApp Bot', thumbnail: { url: randomUrl }, thumbnailUrl: randomUrl, sourceUrl: false, renderLargerThumbnail: true }}})
}

}

handler.help = ['guild']
handler.tags = ['rpg']
handler.command = /^(guild)$/i
handler.rowner = true

export default handler

function getRandom(...urls) {
  const randomIndex = Math.floor(Math.random() * urls.length)
  return urls[randomIndex]
}