let handler = async m => {
  let user = global.db.data.users[m.sender]
  let level = user.level
  let role =
    (level <= 2) ? 'Newbie ㋡' :
    (level <= 4) ? 'Beginner Grade 1 ⚊¹' :
    (level <= 6) ? 'Beginner Grade 2 ⚊²' :
    (level <= 8) ? 'Beginner Grade 3 ⚊³' :
    (level <= 10) ? 'Beginner Grade 4 ⚊⁴' :
    (level <= 20) ? 'Private Grade 1 ⚌¹' :
    (level <= 30) ? 'Private Grade 2 ⚌²' :
    (level <= 40) ? 'Private Grade 3 ⚌³' :
    (level <= 50) ? 'Private Grade 4 ⚌⁴' :
    (level <= 60) ? 'Private Grade 5 ⚌⁵' :
    (level <= 70) ? 'Corporal Grade 1 ☰¹' :
    (level <= 80) ? 'Corporal Grade 2 ☰²' :
    (level <= 90) ? 'Corporal Grade 3 ☰³' :
    (level <= 100) ? 'Corporal Grade 4 ☰⁴' :
    (level <= 110) ? 'Corporal Grade 5 ☰⁵' :
    (level <= 120) ? 'Legend 숒' :
    (level <= 130) ? 'Mythical Honor 숒' :
    (level <= 1900) ? 'Mythical Glory 숒' :
    (level <= 2900) ? 'Grandmaster 숒 × Mythical 숒' :
    (level <= 3900) ? 'Immortal 숒' :
    'Supreme 숒 × Immortal 숒'

  await conn.reply(m.chat, `Your Role: ${role}`, m)
  user.role = role
  return true
}

export default handler
handler.help = ['role']
handler.tags = ['rpg']
handler.command = /^(role|levelrole)$/i
handler.register = true