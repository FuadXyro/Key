import fetch from "node-fetch"

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* s.id`

  if (text.includes("https://") || text.includes("http://")) throw `Tolong masukkan domain/sub domain secara lengkap. Contoh: s.id`
await m.reply(wait)
  try {
    let output = await convertRecords(text)
        await conn.reply(m.chat, output, fkontak)
  } catch (error) {
    console.log(error)
    await m.reply(eror)
  }
}

handler.command = ["dnslookup", "hackertarget", "lookup","dns"]
handler.help = ["dnslookup", "hackertarget", "lookup","dns"]
handler.tags = ["internet"]
handler.premium = false
export default handler

const api_key = "E4/gdcfciJHSQdy4+9+Ryw==JHciNFemGqOVIbyv"

async function fetchDNSRecords(apiKey, domain) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${domain}`, {
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json"
    })
    const records = await response.json()
    return records
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch DNS records")
  }
}

async function fetchDNSRecordsFromHackertarget(domain) {
  try {
    const response = await fetch(`https://api.hackertarget.com/dnslookup/?q=${domain}`)
    return await response.text()
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch DNS records from hackertarget")
  }
}

async function convertRecords(domain) {
  try {
    const records = await fetchDNSRecords(api_key, domain)
    return records.map((record, index) => {
      return `*[${index + 1} ]*\n${Object.entries(record).map(([key, value]) => {
      const input = key
const output = input.charAt(0).toUpperCase() + input.slice(1).replace(/_/g, " ")
        return `*${output}:* ${typeof value === 'string' ? value.replace(/\.$/, '') : value}`
      }).join('\n')}\n`
    }).join('\n')
  } catch (error) {
    console.log(error)
    return await fetchDNSRecordsFromHackertarget(domain)
  }
}