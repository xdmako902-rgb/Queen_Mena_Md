const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

cmd({
    pattern: "tourl",
    alias: ["img2url", "upload", "imgurl"],
    desc: "Upload image to ImgBB and get a direct URL.",
    category: "other",
    react: "🔗",
    filename: __filename
},
async (conn, mek, m, { from, reply, pushname }) => {
    try {
        const isQuotedImage = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
        const isImage = mek.message?.imageMessage;

        if (!isImage && !isQuotedImage) {
            return reply("⚠️ *𝑷𝒍𝒆𝒂𝒔𝒆 𝒓𝒆𝒑𝒍𝒚 𝒕𝒐 𝒂𝒏 𝒊𝒎𝒂𝒈𝒆!*\n\n*𝑬𝑿:* Reply to an image and type .tourl");
        }

        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        const mediaMessage = isQuotedImage ? mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : mek.message.imageMessage;
        
        const stream = await downloadContentFromMessage(mediaMessage, 'image');
        let buffer = Buffer.from([]);
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const form = new FormData();
        form.append('image', buffer.toString('base64'));

        const apiKey = "53acd9031dbc65e69bafff8d293e22a4";
        const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        const response = await axios.post(apiUrl, form, {
            headers: form.getHeaders()
        });

        if (!response.data || !response.data.data || !response.data.data.url) {
            return reply("❌ *𝑭𝒂𝒊𝒍𝒆𝒅 𝒕𝒐 𝒖𝒑𝒍𝒐𝒂𝒅 𝒊𝒎𝒂𝒈𝒆. 𝑻𝒓𝒚 𝒂𝒈𝒂𝒊𝒏!*");
        }

        const imgUrl = response.data.data.url;

        let caption = `╭─── « 🔗 *𝑰𝑴𝑨𝑮𝑬 𝑻𝑶 𝑼𝑹𝑳* » ───⟡
│ ⊳ *𝑯𝒊 ${pushname},*
│ ⊳ *𝑺𝒕𝒂𝒕𝒖𝒔:* 𝑺𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 𝑼𝒑𝒍𝒐𝒂𝒅𝒆𝒅! ✅
│ ⊳ *𝑳𝒊𝒏𝒌:* ${imgUrl}
╰───────────────⟡

> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅`;

        await reply(caption);
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.error("IMG2URL_ERROR:", e);
        reply(`❌ *𝑬𝒓𝒓𝒐𝒓:* ${e.message}`);
    }
});
