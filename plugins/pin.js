const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "pin",
    alias: ["pinterest", "pindown"],
    desc: "Download videos or images from Pinterest using Azbry API.",
    category: "download",
    react: "📌",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || (!q.includes("pinterest.com") && !q.includes("pin.it"))) {
            return reply(`*❌ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒗𝒂𝒍𝒊𝒅 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕 𝒖𝒓𝒍!* 📌\n\n*𝑬𝔁𝒂𝒎𝒑𝒍𝒆:* .pin https://pin.it/xxxxxx`);
        }

        await reply("*📌 𝘿𝙤𝒘𝙣𝙡𝒐𝙖𝙙𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕 𝙢𝙚𝙙𝙞𝙖, 𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩...* ⏳");

        // Azbry API එක සම්බන්ධ කිරීම
        const apiUrl = `https://api.azbry.com/api/download/pinterest?url=${encodeURIComponent(q)}`;
        const resData = await fetchJson(apiUrl);
        
        const data = resData.result || resData.data || resData;

        if (!data) {
            return reply(`*❌ 𝘾𝙤𝙪𝙡𝙙 𝙣𝙤𝙩 𝙛𝙚𝙩𝙘𝙝 𝙩𝙝𝙚 𝙢𝙚𝒅𝙞𝙖. 𝑷𝒍𝒆𝒂𝒔𝒆 𝒄𝒉𝒆𝒄𝒌 𝒕𝒉𝒆 𝒍𝒊𝒏𝒌!*`);
        }

        // වීඩියෝ හෝ ඉමේජ් ලින්ක් එක ලබා ගැනීම
        const mediaUrl = data.url || data.video || data.image || data.hd || data.sd || '';

        if (!mediaUrl) {
            return reply(`*❌ Media download link not found in API response!*`);
        }

        let caption = `*⋆.˚🦋༘⋆ 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏ա 𝑴𝒅 — 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕 𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒆𝒓 ⋆.˚🦋༘⋆*\n\n*┌────────────────────┐*\n*├ \`📌 𝑻𝒊𝒕𝒍𝒆\` :* ${data.title || data.caption || 'Pinterest Media'}\n*└────────────────────┘*\n\n> 📢 *𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝒅*`;

        // ලින්ක් එක වීඩියෝ එකක්ද නැතහොත් පින්තූරයක්ද යන්න පරීක්ෂා කර යැවීම
        if (mediaUrl.includes('.mp4') || data.type === 'video' || mediaUrl.includes('video')) {
            await conn.sendMessage(from, {
                video: { url: mediaUrl },
                caption: caption,
                mimetype: "video/mp4"
            }, { quoted: mek });
        } else {
            await conn.sendMessage(from, {
                image: { url: mediaUrl },
                caption: caption
            }, { quoted: mek });
        }

        await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } });

    } catch (e) {
        console.error("PIN_ERROR:", e);
        reply(`*❌ 𝑺𝒚𝒔𝒕𝒆𝒎 𝑬𝒓𝒓𝒐𝒓:* ${e.message || e}`);
    }
});
