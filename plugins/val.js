const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "val",
    alias: ["vdown", "videodownload"],
    desc: "Download videos using Arslan API.",
    category: "download",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply(`*❌ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒗𝒊𝒅𝒆𝒐 𝒖𝒓𝒍!* 📌\n\n*𝑬𝔁𝒂𝒎𝒑𝒍𝒆:* .val https://youtube.com/watch?v=xxxxxx`);
        }

        await reply("*📥 𝘿𝙤𝒘𝙣𝙡𝒐𝙖𝙙𝙞𝙣𝒈 𝙮𝙤𝙪𝙧 𝙫𝙞𝙙𝙚𝙤, 𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩...* ⏳");

        const apiUrl = `https://arslan-apis-v2.vercel.app/api/video?url=${encodeURIComponent(q)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        const videoUrl = data.result?.url || data.url || data.downloadUrl;

        if (!videoUrl) {
            return reply(`*❌ 𝘾𝙤𝙪𝙡𝙙 𝙣𝙤𝙩 𝙛𝙚𝙩𝙘𝙝 𝙩𝙝𝙚 𝙫𝙞ْد𝙚𝙤. 𝙋𝙡𝙚𝙖𝙨𝙚 𝙘𝙝𝙚𝙘𝙠 𝙮𝙤𝙪𝙧 𝙪𝙧𝙡!*`);
        }

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: `*⋆.˚🦋༘⋆ 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅 — 𝑽𝒊𝒅𝒆𝒐 𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒆𝒓 ⋆.˚🦋༘⋆*\n\n> 📢 *𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝒅*`,
            mimetype: "video/mp4"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*❌ 𝑺𝒚𝒔𝒕𝒆𝒎 𝑬𝒓𝒓𝒐𝒓:* ${e.message || e}`);
    }
});
