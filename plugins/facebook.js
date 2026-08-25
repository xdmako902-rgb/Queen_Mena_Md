const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

cmd({
    pattern: "facebook",  
    alias: ["fb", "fbdl", "facebookdl"],
    react: '📥',
    desc: "Download Facebook videos",
    category: "download",
    use: '.facebook < facebook url >',
    filename: __filename
},
async(conn, mek, m, {from, prefix, q, pushname, reply}) => {
    try {
        if (!q) return await reply('🔎 *𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌 𝑼𝑹𝑳!*');
        if (!q.includes('facebook') && !q.includes('fb.watch')) return await reply('❌ *𝑰𝒏𝒗𝒂ลิ𝒅 𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌 𝑼𝑹𝑳!*');

        await reply("⏳ *Downloading Facebook video, please wait...*");

        // ඔබ දුන් Azbry API එක සම්බන්ධ කිරීම
        const apiUrl = `https://api.azbry.com/api/download/facebook?url=${encodeURIComponent(q)}`;
        const resData = await fetchJson(apiUrl);
        
        const data = resData.result || resData.data || resData;

        if (!data) return await reply('❌ *𝑪𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒇𝒆𝒕𝒄𝒉 𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌 𝒅𝒂𝒕𝒂!*');

        // වීඩියෝ ලින්ක්ස් ලබා ගැනීම (HD හෝ SD)
        const videoUrl = data.hd || data.sd || data.video || data.url || '';

        if (!videoUrl) return await reply('❌ *Video download link not found!*');

        let caption = `╭━━━〔 *𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫* 〕━━━┈⊷
┃ 📥 *𝑭𝑨𝑪𝑬𝑩𝑶𝑶𝑲 𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫𝑬𝑹*
╰━━━━━━━━━━━━━━━┈⊷

*┌────────────────────┐*
*├ \`🎬 𝑻𝒊𝒕𝒍𝒆\` :* ${data.title || data.caption || 'Facebook Video'}
*├ \`⏱️ 𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏\` :* ${data.duration || 'Unknown'}
*├ \`📎 𝑼𝑹𝑳\` :* ${q}
*└────────────────────┘*

> © 𝑸𝑼𝑬𝑬𝑵 𝑴𝑬𝑵𝑨 𝑴𝑫 👤💕`;

        // වීඩියෝ එක ඩවුන්ලෝඩ් කර සෙන්ඩ් කිරීම
        const buffer = await (await fetch(videoUrl)).arrayBuffer();

        await conn.sendMessage(
            from, 
            { 
                video: Buffer.from(buffer), 
                mimetype: "video/mp4", 
                caption: caption 
            }, 
            { quoted: mek }
        );
        
        await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } });

    } catch (e) {
        console.log("FB_ERROR:", e);
        reply(`*❌ Error downloading Facebook video!*\n\n${e.message || e}`);
    }
});
