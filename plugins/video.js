const { cmd } = require('../command');
const { ytmp4 } = require('sadaslk-dlcore');
const yts = require('yt-search');

cmd({
    pattern: "video",
    alias: ["ytvideo", "watch"],
    use: '.video <query or url>',
    react: "📽️",
    desc: "Download videos from YouTube using dlcore",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
    try {            
        if (!q) return await reply('🔎 *𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒂 𝒗𝒊𝒅𝒆𝒐 𝒏𝒂𝒎𝒆 𝒐𝒓 𝑼𝑹𝑳!*');
        
        const url = q.replace(/\?si=[^&]*/, '');
        const results = await yts(url);
        const result = results.videos[0];

        if (!result) return reply("❌ *𝑽𝒊𝒅𝒆𝒐 𝒏𝒐𝒕 𝒇𝒐𝒖𝒏𝒅!*");

        let caption = `╭━━━〔 *𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅* 〕━━━┈⊷
┃ 📹 *𝑽𝑰𝑫𝑬𝑶 𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫𝑬𝑹*
╰━━━━━━━━━━━━━━━┈⊷

*┌────────────────────┐*
*├ \`🎬 𝑻𝒊𝒕𝒍𝒆\` :* ${result.title} 
*├ \`🐼 𝑽𝒊𝒆𝒘𝒔\` :* ${result.views}
*├ \`⌛ 𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏\` :* ${result.duration}
*├ \`📎 𝑼𝑹𝑳\` :* ${result.url}
*└────────────────────┘*

╭━━━〔 *𝑺𝑬𝑳𝑬𝑪𝑻 𝑸𝑼𝑨𝑳𝑰𝑻𝒀* 〕━━━┈⊷
┃ *🎬 𝑵𝑶𝑹𝑴𝑨𝑳 𝑽𝑰𝑫𝑬𝑶*
┃ 1️⃣ | 144𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 2️⃣ | 240𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 3️⃣ | 360𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 4️⃣ | 480𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 5️⃣ | 720𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 6️⃣ | 1080𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃
┃ *📂 𝑫𝑶𝑪𝑼𝑴𝑬𝑵𝑻 𝑽𝑰𝑫𝑬𝑶*
┃ 7️⃣ | 144𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 8️⃣ | 240𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 9️⃣ | 360𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 🔟 | 480𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 1️⃣1️⃣ | 720𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
┃ 1️⃣2️⃣ | 1080𝒑 𝑸𝒖𝒂𝒍𝒊𝒕𝒚
╰━━━━━━━━━━━━━━━┈⊷

_🔢 𝑹𝒆𝒑𝒍𝒚 𝒘𝒊𝒕𝒉 𝒕𝒉𝒆 𝒄𝒐𝒓𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒊𝒏𝒈 𝒏𝒖𝒎𝒃𝒆𝒓._`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: result.thumbnail },
            caption: caption
        }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore = global.numberStore || {};
        global.numberStore[msgId] = {
            "1": `videodl 144&${result.url}`,
            "2": `videodl 240&${result.url}`,
            "3": `videodl 360&${result.url}`,
            "4": `videodl 480&${result.url}`,
            "5": `videodl 720&${result.url}`,
            "6": `videodl 1080&${result.url}`,
            
            "7": `docdl 144&${result.url}&${result.title}`,
            "8": `docdl 240&${result.url}&${result.title}`,
            "9": `docdl 360&${result.url}&${result.title}`,
            "10": `docdl 480&${result.url}&${result.title}`,
            "11": `docdl 720&${result.url}&${result.title}`,
            "12": `docdl 1080&${result.url}&${result.title}`
        };

    } catch (e) {
        reply('❌ *𝑬𝒓𝒓𝒐𝒓 𝑶𝒄𝒄𝒖𝒓𝒓𝒆𝒅 !!*');
        console.log("VIDEO_CMD_ERROR:", e);
    }
});

cmd({
    pattern: "videodl",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return;
        const [quality, url] = q.split('&');
        
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const data = await ytmp4(url, {
            format: "mp4",
            videoQuality: quality
        });

        const dlUrl = data?.downloadLink || data?.dl_url || data?.url || data?.link || (data?.result && (data.result.downloadLink || data.result.url || data.result.dl));
        
        if (!dlUrl) return reply(`❌ *𝑪𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒈𝒆𝒕 ${quality}𝒑 𝒍𝒊𝒏𝒌.*`);

        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        const buffer = await (await fetch(dlUrl)).arrayBuffer();

        await conn.sendMessage(from, {
            video: Buffer.from(buffer),
            caption: `🎬 *𝑸𝒖𝒂𝒍𝒊𝒕𝒚:* ${quality}𝒑\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });

    } catch (e) {
        reply('❌ *𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝑭𝒂𝒊𝒍𝒆𝒅!*');
        console.log("VIDEODL_ERROR:", e);
    }
});

cmd({
    pattern: "docdl",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return;
        const [quality, url, title] = q.split('&');

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        const data = await ytmp4(url, {
            format: "mp4",
            videoQuality: quality
        });

        const dlUrl = data?.downloadLink || data?.dl_url || data?.url || data?.link || (data?.result && (data.result.downloadLink || data.result.url || data.result.dl));
        
        if (!dlUrl) return reply(`❌ *𝑪𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒈𝒆𝒕 ${quality}𝒑 𝒅𝒐𝒄𝒖𝒎𝒆𝒏𝒕 𝒍𝒊𝒏𝒌.*`);

        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        const buffer = await (await fetch(dlUrl)).arrayBuffer();
        const safeTitle = (title || 'video').replace(/[/\\?%*:|"<>]/g, '');

        await conn.sendMessage(from, {
            document: Buffer.from(buffer),
            mimetype: 'video/mp4',
            fileName: `${safeTitle}.mp4`,
            caption: `📂 *𝑭𝒊𝒍𝒆:* ${title}\n🎬 *𝑸𝒖𝒂𝒍𝒊𝒕𝒚:* ${quality}𝒑\n\n> © 𝑸𝒖𝒆𝒆𝒏 𝑴𝒆𝒏𝒂 𝑴𝒅`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });

    } catch (e) {
        reply('❌ *𝑫𝒐𝒄𝒖𝒎𝒆𝒏𝒕 𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅 𝑭𝒂𝒊𝒍𝒆𝒅!*');
        console.log("DOCDL_ERROR:", e);
    }
});
