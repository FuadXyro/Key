/* Buatan FuadXyro */
export async function before(m, { isOwner }) {
  let chat = global.db.data.chats[m.chat]
  if (!('owneronly' in chat)) chat.owneronly = false 
  if (chat.owneronly && !isOwner) {
    throw new Error("Hanya pemilik yang diizinkan akses.")
  }
}