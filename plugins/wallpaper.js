const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

// Global number store for interactive list responses
global.numberStore = global.numberStore || {};

// 1. Wallpaper Search Command
cmd({
    pattern: "wallpaper",
    alias: ["wp", "wall"],
    use: '.wp <query>',
    react: "🖼️",
    desc: "Search for high-quality wallpapers.",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, pushname }) => {
    try {
        if (!q) return await reply('🔎 *𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝗮 𝘁𝗲𝗿𝗺 𝘁𝗼 𝘀𝗲𝗮𝗿𝗰𝗵!* \n\n*𝗘𝘅:* .wp cyber car');

        await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });

        const apikey = "chama_4c00cc4d79447b4994bc2e5fc6b6f9c3";
        const apiUrl = `https://chama-api-hub.vercel.app/api/search/wallpaper?apikey=${apikey}&q=${encodeURIComponent(q)}`;
        const data = await fetchJson(apiUrl);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("❌ *𝗡𝗼 𝘄𝗮𝗹𝗹𝗽𝗮𝗽𝗲𝗿𝘀 𝗳𝗼𝘂𝗻𝗱 𝗳𝗼𝗿:* " + q);
        }

        let caption = `╭─── « 🖼️ *𝑾𝑨𝑳𝑳𝑷𝑨𝑷𝑬𝑹 𝑺𝑬𝑨𝑹𝑪𝑯* » ───
│ 💡 *𝑯𝒊 ${pushname},*
│ 🔎 *𝑸𝒖𝒆𝒓𝒚:* ${q}
╰───────────────⟡

╭─── « 𝑺𝑬𝑳𝑬𝑪𝑻 𝑨 𝑷𝑰𝑪𝑻𝑼𝑹𝑬 » ───
`;

        let storeData = {};
        for (let i = 0; i < Math.min(data.result.length, 10); i++) {
            const res = data.result[i];
            caption += `│ ${i + 1} | ${res.title}\n`;
            storeData[(i + 1).toString()] = res.image;
        }

        caption += `╰───────────────⟡

_🔢 Reply with a number to download HD._
*© 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅*`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.result[0].image }, 
            caption: caption
        }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore[msgId] = storeData;

    } catch (e) {
        console.error("WP_SEARCH_ERROR:", e);
        reply("❌ *𝑺𝒆𝒂𝒓𝒄𝒉 𝑭𝒂𝒊𝒍𝒆𝒅!*");
    }
});


// 2. Wallpaper Direct Download Command
cmd({
    pattern: "wpdown",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return;

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        await conn.sendMessage(from, { 
            image: { url: q }, 
            caption: `✅ *𝑯𝑫 𝑾𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓 𝑫𝒆𝒍𝒊𝒗𝒆𝒓𝒆𝒅!* \n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅` 
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "🖼️", key: mek.key } });

    } catch (e) {
        console.error("WP_DL_ERROR:", e);
        reply("❌ *𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝑭𝒂𝒊𝒍𝒆𝒅!*");
    }
});
