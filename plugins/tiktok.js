const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

cmd({
    pattern: "tiktok",  
    alias: ["tt", "ttdl", "tiktokdl"],
    react: '🎩',
    desc: "Download tiktok videos",
    category: "download",
    use: '.tiktok < tiktok url >',
    filename: __filename
},
async(conn, mek, m, {from, prefix, q, pushname, reply}) => {
    try {
        if (!q) return await reply('🔎 *𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝑻𝒊𝒌𝑻𝒐𝒌 𝑼𝑹𝑳!*');
        if (!q.includes('tiktok')) return await reply('❌ *𝑰𝒏𝒗𝒂𝒍𝒊𝒅 𝑻𝒊𝒌𝑻𝒐𝒌 𝑼𝑹𝑳!*');

        // ස්ථාවරව සහ නිවැරදිව වැඩ කරන Official/Public TikTok Download API එක
        const apiUrl = `https://apis.davidcyriltech.my.id/tiktok?url=${encodeURIComponent(q)}`;
        const resData = await fetchJson(apiUrl);
        
        const data = resData.result || resData.data || resData;

        if (!data) return await reply('❌ *𝑪𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒇𝒆𝒕𝒄𝒉 𝑻𝒊𝒌𝑻𝒐𝒌 𝒅𝒂𝒕𝒂!*');

        const noWatermark = data.hd || data.nowm || data.no_watermark || data.video || '';
        const watermark = data.wm || data.watermark || '';
        const music = data.audio || data.music || '';

        let caption = `╭━━━〔 *𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅* 〕━━━┈⊷
┃ 🎩 *𝑻𝑰𝑲𝑻𝑶𝑲 𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫𝑬𝑹*
╰━━━━━━━━━━━━━━━┈⊷

*┌────────────────────┐*
*├ \`🎬 𝑻𝒊𝒕𝒍𝒆\` :* ${data.title || data.desc || 'Tiktok Video'}
*├ \`🌍 𝑹𝒆𝒈𝒊𝒐𝒏\` :* ${data.region || 'Unknown'}
*├ \`⏰ 𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏\` :* ${data.duration || 'Unknown'}
*├ \`📎 𝑼𝑹𝑳\` :* ${q}
*└────────────────────┘*

╭━━━〔 *𝑹𝑬𝑷𝑳𝒀 𝑵𝑼𝑴𝑩𝑬𝑹* 〕━━━┈⊷
┃ 1️⃣ | 𝑽𝒊𝒅𝒆𝒐 (𝑵𝒐 𝑾𝒂𝒕𝒆𝒓𝒎𝒂𝗿𝒌) 📼
┃ 2️⃣ | 𝑽𝒊𝒅𝒆𝒐 (𝑾𝒊𝒕𝒉 𝑾𝒂𝒕𝒆𝒓𝒎𝒂𝒓𝒌) 🎥
┃ 3️⃣ | 𝑨𝒖𝒅𝒊𝒐 𝑶𝒏𝒍𝒚 🎶
╰━━━━━━━━━━━━━━━┈⊷

_🔢 𝑹𝒆𝒑𝒍𝒚 𝒘𝒊𝒕𝒉 𝒕𝒉𝒆 𝒄𝒐𝒓𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒊𝒏𝒈 𝒏𝒖𝒎𝒃𝒆ր._`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail || data.cover || 'https://i.imgur.com/Ow8885n.jpg' },
            caption: caption
        }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore = global.numberStore || {};
        global.numberStore[msgId] = {
            "1": `ttdl1 ${noWatermark}`,
            "2": `ttdl2 ${watermark || noWatermark}`,
            "3": `ttdl3 ${music}`
        };

    } catch (e) {
        console.log("TIKTOK_ERROR:", e);
        reply(`*❌ Error downloading TikTok video!*\n\n${e.message || e}`);
    }
});

cmd({
    pattern: "ttdl1",
    react: '⬇️',
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, {from, q, reply}) => {
    try {
        if (!q) return reply("❌ *Download link not found!*");
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });    
        
        const buffer = await (await fetch(q)).arrayBuffer();

        await conn.sendMessage(
            from, 
            { video: Buffer.from(buffer), mimetype: "video/mp4", caption: "> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅" }, 
            { quoted: mek }
        );
        
        await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } });
    } catch (e) {
        console.log("TTDL1_ERROR:", e);
        reply(`*❌ Error !!*\n\n${e}`);
    }
});

cmd({
    pattern: "ttdl2",
    react: '⬇️',
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, {from, q, reply}) => {
    try {
        if (!q) return reply("❌ *Download link not found!*");
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });    
        
        const buffer = await (await fetch(q)).arrayBuffer();

        await conn.sendMessage(
            from, 
            { video: Buffer.from(buffer), mimetype: "video/mp4", caption: "> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅" }, 
            { quoted: mek }
        );
        
        await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } });
    } catch (e) {
        console.log("TTDL2_ERROR:", e);
        reply(`*❌ Error !!*\n\n${e}`);
    }
});

cmd({
    pattern: "ttdl3",
    react: '⬇️',
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, {from, q, reply}) => {
    try {
        if (!q) return reply("❌ *Download link not found!*");
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
        
        const buffer = await (await fetch(q)).arrayBuffer();

        await conn.sendMessage(
            from, 
            { audio: Buffer.from(buffer), mimetype: "audio/mpeg" }, 
            { quoted: mek }
        );
        
        await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } });
    } catch (e) {
        console.log("TTDL3_ERROR:", e);
        reply(`*❌ Error !!*\n\n${e}`);
    }
});
