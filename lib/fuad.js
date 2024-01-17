import axios from "axios"

const _api = "https://api2.musical.ly/aweme/v1/feed/?"
let datas_temp = {}
let extemp = {}

function randomChar(str, length) {
  var result = ""
  for (var i = length; i > 0; --i)
    result += str[Math.round(Math.random() * (str.length - 1))]
  return result
}

function getVideoID(tiktok_url) {
  if (!tiktok_url || tiktok_url == "" || !/\d{17,21}/g.test(tiktok_url))
    throw { status: 404, message: `Video not found / link invalid!` }
  var video_id = tiktok_url.match(/\d{17,21}/g)[0]
  return video_id
}

async function expandUrl(tiktok_url) {
  if (extemp[tiktok_url]) return extemp[tiktok_url]
  return fetch(tiktok_url, { method: "HEAD" })
    .then((res) => {
      extemp[tiktok_url] = res.url
      return res.url
    })
    .catch((err) => {
      console.error(err)
      throw { status: 404, message: `Video not found / link invalid!` }
    })
}

const buildHead = (id) => {
  return {
    headers: {
      "User-Agent":
        "com.ss.android.ugc.trill/260103 (Linux; U; Android 10; en_US; Pixel 4; Build/QQ3A.200805.001; Cronet/58.0.2991.0)",
      Accept: "application/json",
    },
    params: {
      aweme_id: id,
    },
  }
}

const buildUrl = (id) => {
  return _api + new URLSearchParams(buildHead(id).params)
}

function getMeta(tiktok_url) {
  return new Promise(async function (resolve, reject) {
    expandUrl(tiktok_url)
      .then(async (res) => {
        let headers = buildHead(getVideoID(res))
        let video_id = getVideoID(res)
        let vt_id = "vtid:" + video_id
        const value = datas_temp[vt_id]
        if (value) return resolve(value)
        res2 = await axios.get(buildUrl(getVideoID(res)), {
          headers: headers,
        })
        if (!res2.data.aweme_list)
          throw new Error(`Can't get video metadata, Please try again!`)
        if (res2.data.aweme_list.length == 0)
          throw { status: 404, message: `Video not found` }
        datas = res2.data.aweme_list.find(
          (x) => x && x.aweme_id && x.aweme_id == video_id
        )
        if (!datas)
          throw { status: 404, message: `Video not found!`, vt_id }
        if (datas) {
          datas_temp[vt_id] = { originURL: res, ...datas }
          if (!value)
            setTimeout(() => {
              delete datas_temp[vt_id]
            }, 60 * 1000)
        }
        return resolve({ originURL: res, ...datas })
      })
      .catch(reject)
  })
}

export { getMeta }