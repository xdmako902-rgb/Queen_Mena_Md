const { cmd } = require('../command');

cmd({
    pattern: "ssweb",
    alias: ["ss", "screenshot", "webss"],
    desc: "Take a screenshot of any website with size options.",
    category: "other",
    react: "📸",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, pushname }) => {
    try {
        if (!q) return reply("⚠️ *𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒗𝒂𝒍𝒊𝒅 𝑼𝑹𝑳!*\n\n*𝑬𝑿:* .ss google.com");

        let targetUrl = q.startsWith("http") ? q : "https://" + q;

        let menuTxt = `╭─── « 📸 *𝑾𝑬𝑩 𝑺𝑪𝑹𝑬𝑬𝑵𝑺𝑯𝑶𝑻* » ───⟡
│
│ ⊳ *𝑯𝒊 ${pushname},*
│ ⊳ *𝑻𝒂𝒓𝒈𝒆𝒕:* ${targetUrl}
│
│ [ 𝟭 ] 💻 𝑷𝑪 (𝑭𝒖𝒍𝒍 𝑷𝒂𝒈𝒆)
│ [ 𝟐 ] 💻 𝑷𝑪 (𝑽𝒊𝒆𝒘𝒑𝒐𝒓𝒕)
│ [ 𝟑 ] 📱 𝑴𝒐𝒃𝒊𝒍𝒆 (𝑭𝒖𝒍𝒍 𝑷𝒂𝒈𝒆)
│ [ 𝟒 ] 📱 𝑴𝒐𝒃𝒊𝒍𝒆 (𝑽𝒊𝒆𝒘𝒑𝒐𝒓𝒕)
│ [ 𝟓 ] 💊 𝑻𝒂𝒃𝒍𝒆𝒕 (𝑭𝒖𝒍𝒍 𝑷𝒂𝒈𝒆)
│
╰───────────────⟡

> _🔢 𝑹𝒆𝒑𝒍𝒚 𝒘𝒊𝒕𝒉 𝒂 𝒏𝒖𝒎𝒃𝒆𝒓 𝒕𝒐 𝒄𝒂𝒑𝒕𝒖𝒓𝒆._`;

        const sentMsg = await conn.sendMessage(from, { text: menuTxt }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore = global.numberStore || {};
        global.numberStore[msgId] = {
            "1": `ssdl 1920&1080&true&PC (Full Page)&${targetUrl}`,
            "2": `ssdl 1920&1080&false&PC (Viewport)&${targetUrl}`,
            "3": `ssdl 375&812&true&Mobile (Full Page)&${targetUrl}`,
            "4": `ssdl 375&812&false&Mobile (Viewport)&${targetUrl}`,
            "5": `ssdl 768&1024&true&Tablet (Full Page)&${targetUrl}`
        };

    } catch (e) {
        console.error("SSWEB_MENU_ERROR:", e);
        reply("❌ *𝑬𝒓𝒓𝒐𝒓:* Failed to generate screenshot menu.");
    }
});

cmd({
    pattern: "ssdl",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return;

        const [width, height, fullPage, device, url] = q.split('&');

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        const apiUrl = `https://www.movanest.xyz/v2/ssweb?url=${encodeURIComponent(url)}&width=${width}&height=${height}&full_page=${fullPage}`;

        let caption = `╭─── « 📸 *𝑺𝑪𝑹𝑬𝑬𝑵𝑺𝑯𝑶𝑻 𝑹𝑬𝑨𝑫𝒀* » ───⟡
│
│ ⊳ *𝑫𝒆𝒗𝒊𝒄𝒆:* ${device}
│ ⊳ *𝑳𝒊𝒏𝒌:* ${url}
│
╰───────────────⟡

> © 𝑪𝒂𝒎𝒑𝒆𝒆𝒍𝒕 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝒎𝒅 🧃🎀`;

        await conn.sendMessage(from, {
            image: { url: apiUrl },
            caption: caption
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.error("SSDL_ERROR:", e);
        reply("❌ *𝑬𝒓𝒓𝒐𝒓:* Failed to capture screenshot. The site might be offline or blocked.");
    }
});
